import os

from django.conf import settings
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.core.files.storage import FileSystemStorage
from django.core.validators import validate_email
from django.http import Http404
from knox.models import AuthToken
from rest_framework import viewsets, permissions, generics, status, mixins
from rest_framework.decorators import api_view, parser_classes, permission_classes
from rest_framework.generics import get_object_or_404
from rest_framework.mixins import UpdateModelMixin
from rest_framework.parsers import JSONParser, BaseParser, MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.utils import json
from rest_framework.views import APIView

from .models import Post, AlbumTrackFiles
from .serializers import PostSerializer, TrackFileSerializer, StandardResultsSetPagination, CreateUserSerializer, \
    UserSerializer, LoginUserSerializer, UserProfileSerializer, CreateStaffSerializer


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-created_at')
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = PostSerializer
    pagination_class = StandardResultsSetPagination

    def create(self, request, *args, **kwargs):
        if self.request.user.is_staff:
            serializer = PostSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            saved = serializer.save()
            print(saved)
            return Response({
                "id": saved.id,
                "title": saved.title,
                "artist_name": saved.artist_name,
                "song_names": saved.song_names,
                "album_cover": "http://localhost:8000/media/" + saved.album_cover.name,
                "album_track_file_names": saved.album_track_file_names,
                "created_at": saved.created_at
            }, status=200)
        else:
            return Response({
                "error": "UNAUTHORIZED"
            }, status=401)

    def delete(self, request, *args, **kwargs):
        if self.request.user.is_staff:
            return self.destroy(self, request, *args, **kwargs)
        else:
            return Response({"error": "UNAUTHORIZED"}, status=401)

    def patch(self, request, *args, **kwargs):
        if self.request.user.is_staff:
            return self.patch(self, request, *args, **kwargs)
        else:
            return Response({"error": "UNAUTHORIZED"}, status=401)



class TrackFileViewSet(viewsets.ModelViewSet):
    queryset = AlbumTrackFiles.objects.all()
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = TrackFileSerializer

    def create(self, request, *args, **kwargs):
        if self.request.user.is_staff:
            serializer = TrackFileSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            saved = serializer.save()
            print(saved.track_file.name)
            print(AlbumTrackFiles.objects.latest('id'))
            return Response({
                "id": saved.id,
                "track_file": "http://localhost:8000/media/" + saved.track_file.name
            }, status=200)
        else:
            return Response({
                "error": "UNAUTHORIZED"
            }, status=401)




@api_view(['POST'])
@parser_classes((JSONParser,))
def filter_files(request):
    if request.user.is_staff:
        data = request.data['will_delete_tracks']
        print(data)
        if len(data) != 1:
            # splitted_data = data.split(", ")
            for track in data:
                os.remove(os.getcwd() + "/media/tracks/{}".format(track))
        else:
            os.remove(os.getcwd() + "/media/tracks/{}".format(data[0]))

        return Response(status=204)
    else:
        return Response({
            "error": "UNAUTHORIZED"
        }, status=401)


@api_view(['POST'])
@parser_classes((JSONParser,))
def filter_cover(request):
    if request.user.is_staff:
        data = request.data['will_delete_cover']
        os.remove(os.getcwd() + "/media/covers/{}".format(data))
        return Response(status=204)
    else:
        return Response({
            "error": "UNAUTHORIZED"
        }, status=401)


class RegistrationAPI(generics.GenericAPIView):
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        count = User.objects.all().count()
        if count == 0:
            serializer = CreateStaffSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user = serializer.save()
            return Response({
                "user": UserSerializer(user, context=self.get_serializer_context()).data,
                "token": AuthToken.objects.create(user)
            })
        else:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user = serializer.save()
            return Response({
                "user": UserSerializer(user, context=self.get_serializer_context()).data,
                "token": AuthToken.objects.create(user)
            })


class StaffRegistrationAPI(generics.GenericAPIView):
    serializer_class = CreateStaffSerializer

    def post(self, request, *args, **kwargs):
        if self.request.user.is_staff:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user = serializer.save()
            return Response({
                "user": UserSerializer(user, context=self.get_serializer_context()).data,
                "token": AuthToken.objects.create(user)
            })
        else:
            return Response({
                "error": "NO PERMISSION"
            }, status=401)


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        registered_user = UserSerializer(user, context=self.get_serializer_context()).data
        registered_user['password'] = None

        return Response({
            "user": registered_user,
            "token": AuthToken.objects.create(user)
        })


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = UserSerializer

    def get_object(self):
        user = User.objects.get(username=self.request.user)
        user.password = None
        return user


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser, ]


class UserIsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.id == request.user.id


class UserListAPIView(generics.ListAPIView,
                      mixins.DestroyModelMixin):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserSerializer
    parser_classes = (JSONParser,)
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        if self.request.user.is_staff:
            return User.objects.filter(is_staff=False).order_by('-date_joined')
        return []

    def delete(self, request, *args, **kwargs):
        if self.request.user.is_staff:
            self.destroy(request, *args, **kwargs)
            return Response(status=204)
        else:
            return Response({
                "error": "NO PERMISSION"
            }, status=401)

class StaffListAPIView(generics.ListAPIView,
                    mixins.DestroyModelMixin):
    permission_classes = (permissions.IsAuthenticated, )
    serializer_class = UserSerializer
    parser_classes = (JSONParser, )
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        if self.request.user.is_staff:
            return User.objects.filter(is_staff=True)
        return []

    def delete(self, request, *args, **kwargs):
        if self.request.user.is_staff:
            self.destroy(request, *args, **kwargs)
            return Response(status=204)
        else:
            return Response({
                "error": "NO PERMISSION"
            }, status=401)




class UserProfileChangeAPIView(generics.RetrieveAPIView,
                               mixins.DestroyModelMixin,
                               mixins.UpdateModelMixin):
    permission_classes = (
        permissions.IsAuthenticated,
        UserIsOwnerOrReadOnly,
    )
    serializer_class = UserProfileSerializer
    parser_classes = (MultiPartParser, FormParser, JSONParser,)

    def get_object(self):
        # print(self.kwargs)
        # username = self.kwargs["username"]
        obj = get_object_or_404(User, username=self.request.user)
        # users = User.objects.all()
        return obj
        # return users

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        category = request.data['category']

        if category == "email":
            email = request.data['email']
            if email == "":
                return Response({
                    "error": "INVALID EMAIL"
                }, status=409)
            else:
                user = User.objects.get(username=self.request.user)

                try:
                    validate_email(email)
                    user.email = email
                    user.save()
                    changed_user = UserProfileSerializer(user, context=self.get_serializer_context()).data
                    changed_user['password'] = None
                    return Response({
                        "user": changed_user
                    }, status=200)
                except ValidationError:
                    return Response({
                        "error": "INVALID EMAIL"
                    }, status=409)

        if category == "password":
            password = request.data['password']
            password_check = request.data['passwordCheck']

            if password == "" or password_check == "":
                return Response({
                    "error": "INVALID PASSWORD"
                }, status=409)

            if password != password_check:
                return Response({
                    "error": "INVALID PASSWORD"
                }, status=409)

            user = User.objects.get(username=self.request.user)
            user.set_password(password_check)
            user.save()
            changed_user = UserProfileSerializer(user, context=self.get_serializer_context()).data
            changed_user['password'] = None
            return Response({
                "user": changed_user
            }, status=200)

class PostListAPI(generics.ListAPIView):
    permission_classes = [permissions.AllowAny, ]
    serializer_class = PostSerializer
    queryset = Post.objects.all().order_by('-created_at')
    pagination_class = StandardResultsSetPagination