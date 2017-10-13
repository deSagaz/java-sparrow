from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from core import views

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'stories', views.StoryViewSet)
router.register(r'scenes', views.SceneViewSet)
router.register(r'sequence', views.SequenceViewSet)

urlpatterns = [
    url(r'^api/', include(router.urls)),
]