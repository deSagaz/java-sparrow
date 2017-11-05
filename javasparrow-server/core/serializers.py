from rest_framework import serializers
from rest_framework.exceptions import ParseError
from django.utils import timezone
import logging
from rest_auth.serializers import UserModel
from django.contrib.auth.models import User

from core.models import Story
from core.models import Scene
from core.models import Score
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

    scores = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='score-detail'
    )

    class Meta:
        model = Scene
        fields = ('id', 'order', 'story', 'name', 'events', 'scores', 'image', 'scoreMax', 'scoreReq')

class ScoreSerializer(serializers.HyperlinkedModelSerializer):
    """
    Generates list of all scenes.
    """

    def getUser(self):
        '''
        self.user = User.authenticate(username='a', password='a')
        if self.user is None:
            self.user = User(username='a', password='a', email='a')

        request = self.context.get("request")
        user_id = request.session.get('user_id', None)
        #self.user = None
        if user_id is not None:
            request.session.delete('user_id')
            self.user = User.objects.get(id=user_id)
        else:
            self.user = User.objects.create(user=User.__init__(self))
        #user = Score.objects.create(user=user)
        if request and hasattr(request, "user"):  # If user exists
            self.user = request.user
        '''
        self.user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):  # If user exists
            self.user = request.user

    class Meta:
        model = Score
        fields = ('id', 'user', 'scene', 'score')
        #fields = ('id', 'scene', 'score')

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
