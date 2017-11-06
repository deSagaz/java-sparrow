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

urlpatterns = [
    url(r'', include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
