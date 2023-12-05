import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Message
from .serializers import MessageSerializer
from channels.db import database_sync_to_async

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        await self.send_recent_messages()

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        message = json.loads(text_data)
        await self.save_message(text_data)

    async def send_message(self, message):
        await self.send(text_data=json.dumps(message))

    async def send_recent_messages(self):
        recent_messages = await self.get_recent_messages()
        for message in recent_messages:
            await self.send_message(message)

    @database_sync_to_async
    def get_recent_messages(self):
        recent_messages = Message.objects.all().order_by('timestamp')
        recent_messages = recent_messages[len(recent_messages)-10:]
        message_serializer = MessageSerializer(recent_messages, many=True)
        serialized_messages = message_serializer.data
        return serialized_messages

    @database_sync_to_async
    def save_message(self, message):
        message = json.loads(message)
        Message.objects.create(author=message['author'], content=message['text'])

        # Implement logic to save the message to the database
        # You can use your MessageSerializer to deserialize the message
        # Ensure to call message.is_valid() and message.save() appropriately
