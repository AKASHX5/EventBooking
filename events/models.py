from django.db import models
from django.contrib.auth import get_user_model
# Create your models here.


class Event(models.Model):
    name = models.CharField(max_length=255)
    start_time = models.DateTimeField(auto_now=False)
    end_time = models.DateTimeField(auto_now=False)
    created_by = models.ForeignKey(get_user_model(),on_delete=models.CASCADE,null=True,blank=True)
    booking_status = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class Booking(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE,null=True,blank=True)
    booked_by = models.ForeignKey(get_user_model(), on_delete=models.CASCADE,null=True,blank=True,related_name="booked")

    def __str__(self):
        return self.booked_by
