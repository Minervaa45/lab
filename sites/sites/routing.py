from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from your_app import consumers

websocket_urlpatterns = [
    path('ws/somepath/', consumers.YourConsumer.as_asgi()),
]

application = ProtocolTypeRouter({
    'websocket': URLRouter(websocket_urlpatterns),
    # ...
})
