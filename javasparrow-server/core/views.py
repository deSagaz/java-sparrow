from rest_framework import viewsets

from core.models import Story
from core.models import Scene
from core.models import Score

from core.serializers import StoryListSerializer, StoryDetailSerializer
from core.serializers import SceneSerializer
from core.serializers import ScoreSerializer


class StoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Contains all stories.
    Provides `list` and `detail` views.

    List view provides generic information.
    Detail view provides scene list as well.

    Read-only and public.
    """
    permission_classes = ()
    authentication_classes = ()

    queryset = Story.objects.all()

    serializer_class = StoryListSerializer
    detail_serializer_class = StoryDetailSerializer

    def get_serializer_class(self):
        if self.action == 'retrieve':
            if hasattr(self, 'detail_serializer_class'):
                return self.detail_serializer_class

        return super(viewsets.ReadOnlyModelViewSet, self).get_serializer_class()


class SceneViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Contains all scenes.
    Provides `list` and `detail` views.
    Read-only and public.
    """
    permission_classes = ()
    authentication_classes = ()

    queryset = Scene.objects.all()
    serializer_class = SceneSerializer


class ScoreViewSet(viewsets.ModelViewSet):
    """
    Contains scores of currently authenticated user.
    Provides `list` and `detail` views.
    Read-and-write and private.

    **Error codes:**
    0 - Authentication error;
    1 - Invalid score;
    2 - Invalid scene;
    3 - No score improvement;
    4 - Maximum score already reached;
    5 - Scene does not allow for submitting score (max score = 0).
    """
    http_method_names = ['get', 'post', 'head']

    def get_queryset(self):
        user = self.request.user
        return Score.objects.filter(user=user)

    serializer_class = ScoreSerializer
