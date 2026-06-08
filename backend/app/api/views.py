from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Vehicle, ParkingAccess
from django.utils import timezone
from .serializers import ParkingAccessSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.files.storage import default_storage
from .services.plate_ocr_service import PlateOCRService
from django.contrib.auth.models import User



class RegisterView(APIView):

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        email = request.data.get("email", "")

        if not username or not password:
            return Response(
                {"error": "Nome de usuário e senha são obrigatórios"},
                status=400
            )
        
        if User.objects.filter(username=username).exists():
            return Response(
                {"error": "Esse usuário já existe"},
                status=400
            )
        
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )

        return Response({
            "message": "Usuário cadastrado com sucesso",
            "user_id": user.id,
            "username": user.username
        },
        status=201
        )



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
    
class PlateOCRView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        image = request.FILES.get("image")

        if not image:
            return Response(
                {"error": "Imagem obrigatória"},
                status=400
            )

        image_path = default_storage.save(f"plates/{image.name}", image)
        full_image_path = default_storage.path(image_path)

        plate, _ = PlateOCRService.extract_plate(full_image_path)

        if plate is None:
            return Response(
                {"error": "Nenhuma placa brasileira identificada"},
                status=400
            )

        return Response({
            "plate": plate
        })