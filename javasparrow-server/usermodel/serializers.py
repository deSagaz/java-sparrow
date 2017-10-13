from rest_framework import serializers

from usermodel.models import Experience


class ExperienceSerializer(serializers.HyperlinkedModelSerializer):
    """
    Generates list of all stories.
    """

    class Meta:
        model = Experience
        fields = ('id', 'user', 'verb', 'sequence')