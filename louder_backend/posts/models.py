from django.db import models


# Create your models here.

class Post(models.Model):
    title = models.CharField(max_length=300, blank=False, null=False)
    song_names = models.CharField(max_length=1000, blank=False, null=False)
    artist_name = models.CharField(max_length=300, blank=False, null=False)
    album_cover = models.ImageField(upload_to='covers', blank=False, default='covers/no_image.png')
    album_track_file_names = models.CharField(max_length=1000, blank=False, null=False, default="no tracks")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class AlbumTrackFiles(models.Model):
    track_file = models.FileField(upload_to='tracks', blank=False, default='tracks/no_track.mp3')


