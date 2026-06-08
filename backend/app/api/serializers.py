from rest_framework import serializers
from .models import Vehicle, ParkingAccess

class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = "__all__"


class ParkingAccessSerializer(serializers.ModelSerializer):
    vehicle_plate = serializers.CharField(source="vehicle.plate", read_only=True)

    class Meta:
        model = ParkingAccess
        fields = [
            "id",
            "vehicle",
            "vehicle_plate",
            "entry_time",
            "exit_time",
            "created_by",
            "is_active",
        ]
        read_only_fields = ["entry_time", "is_active"]