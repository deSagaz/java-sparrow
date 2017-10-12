from django.shortcuts import render
from rest_framework import viewsets

# Create your views here.
from core.models import Story
from core.serializers import StorySerializer


class StoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Contains all stories.
    Provides `list` and `detail` views.
    Read-only and public.
    """
    permission_classes = ()
    authentication_classes = ()

    queryset = Story.objects.all()
    serializer_class = StorySerializer