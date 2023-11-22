from django.db import models
from django.conf import settings


class Message(models.Model):
    author = models.TextField()
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

