from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated

from .models import Message
from .serializers import MessageSerializer


class MessageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Message.objects.none()
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Message.objects.filter(to=self.request.user)

