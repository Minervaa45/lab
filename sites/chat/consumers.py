import asyncio
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Message
from .serializers import MessageSerializer
from channels.db import database_sync_to_async
from django.conf import settings

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add(
            settings.CHAT_GROUP_NAME,
            self.channel_name,
        )
        await self.accept()
        await self.send_recent_messages()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            settings.CHAT_GROUP_NAME,
            self.channel_name,
        )

    async def receive(self, text_data):
        message = json.loads(text_data)
        new_message = await self.save_message(message)
        await self.channel_layer.group_send(
            settings.CHAT_GROUP_NAME,
            {"type": "chat.message", "message": new_message},
        )

    async def chat_message(self, event):
        message = event['message']
        await self.send(text_data=json.dumps(message))

    async def send_recent_messages(self):
        recent_messages = await self.get_recent_messages()
        for message in recent_messages:
            await self.send_message(message)

    @database_sync_to_async
    def get_recent_messages(self):
        recent_messages = Message.objects.all().order_by('-timestamp')[:10]
        message_serializer = MessageSerializer(recent_messages, many=True)
        serialized_messages = message_serializer.data
        return serialized_messages

    @database_sync_to_async
    def save_message(self, message):
        new_message = Message.objects.create(author=message['author'], content=message['text'])
        message_serializer = MessageSerializer(new_message)
        serialized_message = message_serializer.data
        return serialized_message


    async def send_message(self, message):
        await self.send(text_data=json.dumps(message))
