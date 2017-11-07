from rest_framework import serializers
from rest_framework.exceptions import ParseError
# from django.utils import timezone
# import logging
# from rest_auth.serializers import UserModel
# from django.contrib.auth.models import User

from core.models import Story
from core.models import Scene
from core.models import Score


class StorySerializer(serializers.HyperlinkedModelSerializer):
    """
    Generates list of all stories.
    """
    scenes = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='scene-detail'
    )

    class Meta:
        model = Story
        fields = ('id', 'name', 'description', 'image', 'scenes')


class SceneSerializer(serializers.HyperlinkedModelSerializer):
    """
    Generates list of all scenes.
    """

    scores = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='score-detail'
    )

    class Meta:
        model = Scene
        fields = ('id', 'order', 'story', 'name', 'events', 'scores', 'image', 'scoreMax', 'scoreReq')


class ScoreSerializer(serializers.ModelSerializer):
    """
    Generates list of all scores.
    """

    def create(self, validated_data):
        # Get currently logged-in user and designate as holder
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):  # If user exists
            user = request.user
            score, created = Score.objects.filter(user=user).update_or_create(
                scene=validated_data.get('scene', None),
                defaults={'scene': validated_data.get('scene', None),
                          'user': user,
                          'score': validated_data.get('score', None)})
        else:
            raise ParseError(detail="User name error", code=400)
        return score

    class Meta:
        model = Score
        fields = ('scene', 'score')
