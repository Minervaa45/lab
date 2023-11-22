from django.urls import path
from . import views

urlpatterns = [
    path('', views.object_list),
    path('<int:pk>/', views.object_detail),
]