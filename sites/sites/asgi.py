import os

from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
from django.urls import path
from chat import consumers

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'sites.settings')
django_asgi_app = get_asgi_application()

application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket": URLRouter([
        path("ws", consumers.ChatConsumer.as_asgi()),
    ]),
})