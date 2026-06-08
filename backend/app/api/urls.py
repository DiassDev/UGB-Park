from django.urls import path

from .views import (
    LoginView,
    VehicleEntryView,
    VehicleExitView,
    HistoryView,
    PlateOCRView,
    RegisterView
)

urlpatterns = [
    path("cadastro/", RegisterView.as_view()),
    path("login/", LoginView.as_view()),
    path("entrada/", VehicleEntryView.as_view()),
    path("saida/", VehicleExitView.as_view()),
    path("historico/", HistoryView.as_view()),
    path("ocr/", PlateOCRView.as_view()),
]