from rest_framework import serializers

from core.models import Story
from core.models import Scene
#from core.models import Sequence
from core.models import Exercise
from core.models import Video
from core.models import AnimText
from core.models import Question
from core.models import Answer


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
    exercises = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='exercise-detail'
    )
    videos = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='video-detail'
    )
    animtexts = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='animtext-detail'
    )


    class Meta:
        model = Scene
        fields = ('id', 'order', 'story', 'name', 'exercises', 'videos', 'animtexts')

#class SequenceSerializer(serializers.HyperlinkedModelSerializer):
    """
    Generates list of all sequences.
    """
    #questions = serializers.StringRelatedField(many=True)
    #exercises = serializers.HyperlinkedRelatedField(
    #    many=False,
    #    read_only=True,
    #    view_name='exercise-detail'
    #)

#    class Meta:
#        model = Sequence
        #fields = ('id', 'order', 'scene', 'name')
#        fields = ('id', 'order', 'name')

class ExerciseSerializer(serializers.HyperlinkedModelSerializer):
    """
    Generates list of all sequences.
    """
    #questions = serializers.StringRelatedField(many=True)
    questions = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='question-detail'
    )

    class Meta:
        model = Exercise
        fields = ('id', 'image', 'description', 'name', 'order', 'scene', 'questions')

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
        fields = ('id', 'url', 'scene', 'name', 'order', 'vidfile')

class AnimTextSerializer(serializers.HyperlinkedModelSerializer):
    """
    Generates list of all sequences.
    """

    class Meta:
        model = AnimText
        fields = ('id', 'text', 'scene', 'name', 'order', 'image')
