from django.urls import path

from .views import (
    LoginView,
    VehicleEntryView,
    VehicleExitView,
    HistoryView
)

urlpatterns = [
    path("login/", LoginView.as_view()),
    path("entrada/", VehicleEntryView.as_view()),
    path("saida/", VehicleExitView.as_view()),
    path("historico/", HistoryView.as_view()),
]