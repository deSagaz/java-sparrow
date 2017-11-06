from rest_framework import serializers

# from rest_framework.exceptions import ParseError
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
    # scenes = serializers.StringRelatedField(many=True)
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
        # fields = ('id', 'scene', 'score')
