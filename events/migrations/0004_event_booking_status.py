# Generated by Django 3.0.7 on 2020-06-14 19:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0003_booking'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='booking_status',
            field=models.BooleanField(default=False),
        ),
    ]
