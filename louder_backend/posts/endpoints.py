from django.conf.urls import include, url
from django.urls import path
from rest_framework import routers

# from posts.views import FileUploadView
from .api import PostViewSet, TrackFileViewSet, filter_files, filter_cover, \
    RegistrationAPI, LoginAPI, UserAPI, UserProfileChangeAPIView, StaffRegistrationAPI, UserListAPIView, StaffListAPIView, PostListAPI

router = routers.DefaultRouter()
router.register('posts', PostViewSet)
router.register('uploads', TrackFileViewSet)
# router.register('users', UserListAPIView)

urlpatterns = [
    # url(r'^upload/(?P<filename>[^/]+)$', FileUploadView.as_view()),
    url(r'^filter/$', filter_files),
    url(r'^filter/cover/$', filter_cover),
    path('auth/register/', RegistrationAPI.as_view()),
    path('auth/register/staff/', StaffRegistrationAPI.as_view()),
    path('auth/login/', LoginAPI.as_view()),
    path('auth/user/', UserAPI.as_view()),
    path('auth/user/list/', UserListAPIView.as_view()),
    path('auth/user/list/<int:pk>/', UserListAPIView.as_view()),
    path('auth/staff/list/', StaffListAPIView.as_view()),
    path('auth/staff/list/<int:pk>/', StaffListAPIView.as_view()),
    path('auth/user/profile/', UserProfileChangeAPIView.as_view()),
    path('list/', PostListAPI.as_view()),
    path('', include(router.urls)),
]