from rest_framework import serializers
from rest_framework.exceptions import ParseError
from django.utils import timezone
import logging
from rest_auth.serializers import UserModel

from core.models import Story
from core.models import Scene
from core.models import UserIntel
#from core.models import Sequence

'''
from core.models import Exercise
from core.models import Video
from core.models import AnimText
from core.models import Question
from core.models import Answer
from core.models import MultChoice
from core.models import FillBlank
'''


class StorySerializer(serializers.HyperlinkedModelSerializer):
    """
    Generates list of all stories.
    """
    #scenes = serializers.StringRelatedField(many=True)
    scenes = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='scene-detail'
    )

    class Meta:
        model = Story
        fields = ('id', 'name', 'description', 'scenes')

class SceneSerializer(serializers.HyperlinkedModelSerializer):
    """
    Generates list of all scenes.
    """
    #sequences = serializers.StringRelatedField(many=True)
    #sequences = serializers.HyperlinkedRelatedField(
    #    many=True,
    #    read_only=True,
    #    view_name='sequence-detail'
    #)

    userintels = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='userintel-detail'
    )

    class Meta:
        model = Scene
        fields = ('id', 'order', 'story', 'name', 'events', 'userintels', 'image')

class UserIntelSerializer(serializers.HyperlinkedModelSerializer):
    """
    Generates list of all scenes.
    """

    #user = None
    #request = self.context.get("request")
    #if request and hasattr(request, "user"):  # If user exists
    #    user = request.user

    class Meta:
        model = UserIntel
        #fields = ('id', 'user', 'scene', 'intel')
        fields = ('id', 'scene', 'intelmax', 'userintel', 'eventnr')

'''
class SequenceSerializer(serializers.HyperlinkedModelSerializer):
    """
    Generates list of all sequences.
    """
    #questions = serializers.StringRelatedField(many=True)
    #questions = serializers.HyperlinkedRelatedField(
    #    many=True,
    #    read_only=True,
    #    view_name='question-detail'
    #)

    class Meta:
        model = Sequence
        fields = ('id', 'order', 'scene', 'name', 'events')
'''
'''
# Obsolete, use specific types of questions now
class ExerciseSerializer(serializers.HyperlinkedModelSerializer):
    """
    Generates list of all sequences.
    """
    questions = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='question-detail'
    )

    class Meta:
        model = Exercise
        fields = ('id', 'image', 'description', 'questions')

class QuestionSerializer(serializers.HyperlinkedModelSerializer):
    """
    Generates list of all sequences.
    """
    answers = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='answer-detail'
    )

    class Meta:
        model = Question
        fields = ('id', 'qdescription', 'answers')

class AnswerSerializer(serializers.HyperlinkedModelSerializer):
    """
    Generates list of all sequences.
    """

    class Meta:
        model = Answer
        fields = ('id', 'answer')

class VideoSerializer(serializers.HyperlinkedModelSerializer):
    """
    Generates list of all sequences.
    """

    class Meta:
        model = Video
        fields = ('id', 'url', 'vidfile')

class AnimTextSerializer(serializers.HyperlinkedModelSerializer):
    """
    Generates list of all sequences.
    """

    class Meta:
        model = AnimText
        fields = ('id', 'text', 'image')

class MultChoiceSerializer(serializers.HyperlinkedModelSerializer):
    """
    Generates list of all sequences.
    """

    class Meta:
        model = MultChoice
        #SequenceSerializer.Meta.fields.
        fields = ('id', 'image', 'description', 'option1', 'option2', 'option3', 'option4', 'option5', 'option6', 'answer')

class FillBlankSerializer(serializers.HyperlinkedModelSerializer):
    """
    Generates list of all sequences.
    """

    class Meta:
        model = FillBlank
        fields = ('id', 'image', 'description', 'multiline', 'answer1', 'answer2', 'answer3')
'''
