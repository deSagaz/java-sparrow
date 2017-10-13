from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from usermodel import views

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'experiences', views.ExperienceViewSet)

urlpatterns = [
    url(r'', include(router.urls)),
]
