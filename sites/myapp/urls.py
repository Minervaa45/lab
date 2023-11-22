from django.urls import path
from . import views

urlpatterns = [
    path('objects/', views.object_list),
    path('objects/<int:pk>/', views.object_detail),
]