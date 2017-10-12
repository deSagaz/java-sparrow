from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from core import views

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'stories', views.StoryViewSet)

urlpatterns = [
    url(r'^api/', include(router.urls)),
]