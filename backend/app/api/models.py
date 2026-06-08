from django.db import models
from django.contrib.auth.models import User


class Vehicle(models.Model):
    plate = models.CharField(max_length=8, unique=True)
    owner = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="vehicles"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.plate
    

class ParkingAcess(models.Model):
    vehicle = models.ForeignKey(
        Vehicle,
        on_delete=models.CASCADE,
        related_name="accesses"
    )

    entry_time = models.DateTimeField(auto_now_add=True)
    exit_time = models.DateTimeField(null=True, blank=True)

    created_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="parking_acesses"
    )

    def __str__(self):
        return f"{self.vehicle.plate} - {self.entry_time}"
    
    
    @property
    def is_active(self):
        return self.exit_time is None