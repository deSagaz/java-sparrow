from django.shortcuts import render
from rest_framework import viewsets

# Create your views here.
from core.models import Story
from core.models import Scene
from core.models import Sequence
from core.serializers import StorySerializer
from core.serializers import SceneSerializer
from core.serializers import SequenceSerializer



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

class SceneViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Contains all scenes.
    Provides `list` and `detail` views.
    Read-only and public.
    """
    permission_classes = ()
    authentication_classes = ()

    queryset = Scene.objects.all()
    serializer_class = SceneSerializer

class SequenceViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Contains all sequences.
    Provides `list` and `detail` views.
    Read-only and public.
    """
    permission_classes = ()
    authentication_classes = ()

    queryset = Sequence.objects.all()
    serializer_class = SequenceSerializer
