from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from django.conf.urls.static import static
from django.conf import settings


from core import views

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'stories', views.StoryViewSet)
router.register(r'scenes', views.SceneViewSet)
router.register(r'scores', views.ScoreViewSet)
#router.register(r'sequences', views.SequenceViewSet)
'''
router.register(r'videos', views.VideoViewSet)
router.register(r'animtexts', views.AnimTextViewSet)
router.register(r'exercises', views.ExerciseViewSet)
router.register(r'questions', views.QuestionViewSet)
router.register(r'answers', views.AnswerViewSet)
router.register(r'multchoices', views.MultChoiceViewSet)
router.register(r'fillblanks', views.FillBlankViewSet)
'''

urlpatterns = [
    url(r'', include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
