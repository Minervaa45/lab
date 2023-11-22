from rest_framework import serializers
from .models import MyObject

class MyObjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyObject
        fields = '__all__'