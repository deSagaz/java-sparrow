from rest_framework import serializers
from rest_framework.exceptions import ParseError
# from django.utils import timezone
# import logging
# from rest_auth.serializers import UserModel
# from django.contrib.auth.models import User

from core.models import Story
from core.models import Scene
from core.models import Score


class SceneSerializer(serializers.ModelSerializer):
    """
    Generates list of all scenes.
    """
    scoreUser = serializers.SerializerMethodField()

    def get_scoreUser(self, scene):
        user = None
        request = self.context.get("request")

        if request and hasattr(request, "user"):  # If user exists
            user = request.user
            try:
                score = Score.objects.get(user=user.id, scene=scene.id).score
                return score
            except Score.DoesNotExist:
                return 0  # User has no score in this scene
        else:
            raise ParseError(detail={"errorCode": 0, "message": "Authentication error"}, code=400)

    class Meta:
        model = Scene
        fields = ('id', 'name', 'story', 'image', 'events', 'scoreMax', 'scoreReq', 'scoreUser')


class SceneSerializerMin(serializers.ModelSerializer):
    """
    Generates list of all scene IDs
    """
    scoreUser = serializers.SerializerMethodField()

    def get_scoreUser(self, scene):
        user = None
        request = self.context.get("request")

        if request and hasattr(request, "user"):  # If user exists
            user = request.user
            try:
                score = Score.objects.get(user=user.id, scene=scene.id).score
                return score
            except Score.DoesNotExist:
                return 0  # User has no score in this scene
        else:
            raise ParseError(detail={"errorCode": 0, "message": "Authentication error"}, code=400)

    class Meta:
        model = Scene
        fields = ('id', 'name', 'image', 'scoreMax', 'scoreReq', 'scoreUser')


class StoryListSerializer(serializers.ModelSerializer):
    """
    Generates list of all stories.
    """

    # userScore = serializers.SerializerMethodField()
    #
    # def get_userScore(self, scene):
    #     user = None
    #     request = self.context.get("request")
    #
    #     if request and hasattr(request, "user"):  # If user exists
    #         user = request.user
    #         return Score.objects.filter(user=user.id, scene=scene.id).aggregate(Sum('score'))
    #     else:
    #         return 0

    class Meta:
        model = Story
        fields = ('id', 'name', 'description', 'image')


class StoryDetailSerializer(serializers.ModelSerializer):
    """
    Generates list of all stories.
    """

    scenes = SceneSerializerMin(
        many=True,
        read_only=True
    )

    class Meta:
        model = Story
        fields = ('id', 'name', 'description', 'image', 'scenes')


class ScoreSerializer(serializers.ModelSerializer):
    """
    Generates list of all scores.
    On POST, checks if input is correct.
    See View class for error code overview.
    """

    def create(self, validated_data):

        # Check if given scene is valid
        if not validated_data.get('scene', None):
            raise ParseError(detail={"errorCode": 2, "message": "Invalid scene"}, code=400)
        else:
            scene = validated_data.get('scene', None)

            # Check if scene.scoreMax is valid for a POST
            if scene.scoreMax <= 0:
                raise ParseError(detail={"errorCode": 5,
                                         "message": "Scene does not allow for submitting score (max score = 0)"},
                                 code=400)

        # Check if given score is valid
        if not validated_data.get('score', None):
            raise ParseError(detail={"errorCode": 1, "message": "Invalid score"}, code=400)
        else:
            newscore = validated_data.get('score', None)

            # Cut off score if more than max score (rather than throw error)
            if newscore > scene.scoreMax:
                newscore = scene.scoreMax

        # Get currently logged-in user
        user = None
        request = self.context.get("request")

        if request and hasattr(request, "user"):  # If user exists
            user = request.user

            # Set default score attributes from user input
            defaults = {'scene': scene,
                        'user': user,
                        'score': newscore}

            try:
                prevscore = Score.objects.filter(user=user).get(scene=scene)  # If fine, Score exists

                # Check if prevscore is maxscore
                if prevscore.score == scene.scoreMax:
                    raise ParseError(detail={"errorCode": 4, "message": "Maximum score already reached"}, code=400)

                # Check if score is higher than previous result
                if prevscore.score < newscore:
                    score = prevscore
                    for key, value in defaults.items():
                        setattr(score, key, value)
                    score.save()
                else:
                    raise ParseError(detail={"errorCode": 3,
                                             "message": "No score improvement " + str(newscore) + " " +
                                                        str(prevscore.score)},
                                     code=400)

            except Score.DoesNotExist:
                # Check if score is valid
                if 0 <= newscore:
                    new_values = defaults
                    score = Score(**new_values)
                    score.save()
                else:
                    raise ParseError(detail={"errorCode": 1, "message": "Invalid score"}, code=400)
        else:
            raise ParseError(detail={"errorCode": 0, "message": "Authentication error"}, code=400)
        return score

    class Meta:
        model = Score
        fields = ('scene', 'score')
