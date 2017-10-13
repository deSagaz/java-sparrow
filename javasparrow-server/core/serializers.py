from rest_framework import serializers

from core.models import Story
from core.models import Scene
from core.models import Sequence


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
    sequences = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='sequence-detail'
    )

    class Meta:
        model = Scene
        fields = ('id', 'order', 'story', 'name', 'sequences')

class SequenceSerializer(serializers.HyperlinkedModelSerializer):
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
        model = Sequence
        fields = ('id', 'order', 'scene', 'name', 'questions')
