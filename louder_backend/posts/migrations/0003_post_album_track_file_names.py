# Generated by Django 2.0.5 on 2018-05-26 11:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0002_post_album_cover'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='album_track_file_names',
            field=models.CharField(default='no tracks', max_length=1000),
        ),
    ]