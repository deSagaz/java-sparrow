from django.contrib.auth.models import User
from django.db import models

from core.models import Sequence


class Experience(models.Model):
    """
    id          An IntegerField that holds the id with which it can be identified
    user        A ForeignKey to the user with this experience
    sequence    A ForeignKey to the sequence where this experience occurred
    verb        A string to denote action involved in experience

    Inspiration taken from xAPI.
    """
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    verb = models.CharField(
        max_length=64,
        null=True,
        blank=True
    )
    sequence = models.ForeignKey(
        Sequence,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    def __str__(self):
        return self.user.username + " " + self.verb + " \"" + self.sequence.name + "\" (" + str(self.id) + ")"
