from django.shortcuts import render
from rest_framework import viewsets

from usermodel.models import Experience
from usermodel.serializers import ExperienceSerializer


class ExperienceViewSet(viewsets.ModelViewSet):
    """
    Contains all experiences.
    Provides `list` and `detail` views.
    Read-only and public.
    """
    permission_classes = ()
    authentication_classes = ()

    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer
