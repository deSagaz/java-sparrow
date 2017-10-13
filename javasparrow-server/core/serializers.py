from rest_framework import serializers

from core.models import Story


class StorySerializer(serializers.HyperlinkedModelSerializer):
    """
    Generates list of all stories.
    """

    class Meta:
        model = Story
        fields = ('id', 'name', 'description')