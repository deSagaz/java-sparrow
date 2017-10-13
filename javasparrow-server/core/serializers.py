from rest_framework import serializers

from core.models import Story
from core.models import Scene
from core.models import Sequence


class StorySerializer(serializers.HyperlinkedModelSerializer):
    """
    Generates list of all stories.
    """

    class Meta:
        model = Story
        fields = ('id', 'name', 'description')

class SceneSerializer(serializers.HyperlinkedModelSerializer):
    """
    Generates list of all scenes.
    """

    class Meta:
        model = Scene
        fields = ('id', 'order', 'story', 'name')

class SequenceSerializer(serializers.HyperlinkedModelSerializer):
    """
    Generates list of all sequences.
    """

    class Meta:
        model = Sequence
        fields = ('id', 'order', 'scene', 'name')