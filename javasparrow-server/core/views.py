from django.shortcuts import render
from rest_framework import viewsets

# Create your views here.
from core.models import Story
from core.models import Scene
#from core.models import Sequence
from core.models import Video
from core.models import Exercise
from core.models import AnimText
from core.models import Question
from core.models import Answer
from core.serializers import StorySerializer
from core.serializers import SceneSerializer
#from core.serializers import SequenceSerializer
from core.serializers import VideoSerializer
from core.serializers import ExerciseSerializer
from core.serializers import AnimTextSerializer
from core.serializers import QuestionSerializer
from core.serializers import AnswerSerializer



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


#class SequenceViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Contains all sequences.
    Provides `list` and `detail` views.
    Read-only and public.
    """
#    permission_classes = ()
#    authentication_classes = ()

#    queryset = Sequence.objects.all()
#    serializer_class = SequenceSerializer

class ExerciseViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Contains all sequences.
    Provides `list` and `detail` views.
    Read-only and public.
    """
    permission_classes = ()
    authentication_classes = ()

    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer

class VideoViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Contains all sequences.
    Provides `list` and `detail` views.
    Read-only and public.
    """
    permission_classes = ()
    authentication_classes = ()

    queryset = Video.objects.all()
    serializer_class = VideoSerializer

class AnimTextViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Contains all sequences.
    Provides `list` and `detail` views.
    Read-only and public.
    """
    permission_classes = ()
    authentication_classes = ()

    queryset = AnimText.objects.all()
    serializer_class = AnimTextSerializer

class QuestionViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Contains all sequences.
    Provides `list` and `detail` views.
    Read-only and public.
    """
    permission_classes = ()
    authentication_classes = ()

    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class AnswerViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Contains all sequences.
    Provides `list` and `detail` views.
    Read-only and public.
    """
    permission_classes = ()
    authentication_classes = ()

    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer