from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Vehicle, ParkingAccess
from django.utils import timezone
from .serializers import ParkingAccessSerializer


class LoginView(APIView):

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(
            username=username,
            password=password
        )

        if not user:
            return Response(
                {"error": "Credenciais inválidas"},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        return Response({
            "message": "Login realizado com sucesso",
            "user_id": user.id,
            "username": user.username
        })
    

class VehicleEntryView(APIView):

    def post(self, request):
        plate = request.data.get("plate")

        if not plate:
            return Response(
                {"error": "Placa obrigatória para registrar entrada!"},
                status=400
            )
        
        vehicle, _ = Vehicle.objects.get_or_create(
            plate=plate.upper()
        )

        access = ParkingAccess.objects.create(
            vehicle=vehicle
        )

        return Response({
            "message": "Entrada registrada",
            "access_id": access.id,
            "plate": vehicle.plate,
            "entry_time": access.entry_time
        })
    
class VehicleExitView(APIView):

    def post(self, request):
        plate = request.data.get("plate")

        access = ParkingAccess.objects.filter(
            vehicle_plate=plate.upper(),
            exit_time__isnull=True
        ).order_by("-entry_time").first()

        if not access:
            return Response(
                {"error": "Veículo não encontrado no estacionamento"},
                status=400
            )
        
        access.exit_time = timezone.now()
        access.save()

        return Response({
            "message": "Saída do veículo registrada",
            "plate": plate,
            "exit_time": access.exit_time
        })
    
class HistoryView(APIView):

    def get(self, request):
        accesses = ParkingAccess.objects.all().order_by("-entry_time")

        serializer = ParkingAccessSerializer(
            accesses,
            many=True
        )

        return Response(serializer.data)