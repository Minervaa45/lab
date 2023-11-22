from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import MyObject
from .serializers import MyObjectSerializer

@api_view(['GET', 'POST'])
def object_list(request):
    if request.method == 'GET':
        objects = MyObject.objects.all()
        serializer = MyObjectSerializer(objects, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = MyObjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def object_detail(request, pk):
    try:
        obj = MyObject.objects.get(pk=pk)
    except MyObject.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = MyObjectSerializer(obj)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = MyObjectSerializer(obj, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Create your views here.
