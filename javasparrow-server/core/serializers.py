from rest_framework import serializers

from core.models import Story
from core.models import Scene
from core.models import Sequence


class StorySerializer(serializers.HyperlinkedModelSerializer):
    """
    Generates list of all stories.
    """
    scenes = serializers.StringRelatedField(many=True)

    class Meta:
        model = Story
        fields = ('id', 'name', 'description', 'scenes')

class SceneSerializer(serializers.HyperlinkedModelSerializer):
    """
    Generates list of all scenes.
    """
    sequences = serializers.StringRelatedField(many=True)

    class Meta:
        model = Scene
        fields = ('id', 'order', 'story', 'name', 'sequences')

class SequenceSerializer(serializers.HyperlinkedModelSerializer):
    """
    Generates list of all sequences.
    """
    questions = serializers.StringRelatedField(many=True)

    class Meta:
        model = Sequence
        fields = ('id', 'order', 'scene', 'name', 'questions')
