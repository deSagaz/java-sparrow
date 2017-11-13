from __future__ import unicode_literals
from django.db import models
from django.contrib.postgres.fields import JSONField
from django.contrib.auth.models import User


'''
The 'Story' model, which functions as the basic building block to build content for the program.
Stories consist of multiple Scene and present a story/game to the player in a unique setting.
Each Story should focus on a specific theme for the player to work on,
so that the player can selectively choose according to his/her needs.
'''
class Story(models.Model):
    """
    id          An IntegerField that holds the id with which it can be identified
    name        A CharField that indicates the name of the Story
    description A CharField offering a short description of the Story
    """
    name = models.CharField(max_length=64)
    description = models.CharField(max_length=512)
    image = models.ImageField(null=True, blank=True)


    def __str__(self):
        return self.name + " (" + str(self.id) + ")"


    def calcTotalScoreMax(self):
        number = 0
        for scene in self.scenes:
            # {{ forloop.counter0 }}

            number = (number + scene.scoreMax)
        return number

    class Meta:
        verbose_name_plural = "Stories"


'''
The Scene class objects are the units that together create a Story.
A Scene can consist of many a thing; text used to tell a part of the story or provide explanation,
an exercise in the form of one of the types of questions, and more.
This flexibility is due to the 'events' JSONField, which is used to store various data in.
A Scene also has a Score attribute (see below) that is used to indicate, for the current user,
the maximum achievable score, the current score, and the score required to unlock this Scene.
'''
class Scene(models.Model):
    """
    id          An IntegerField that holds the id with which it can be identified
    order       An IntegerField that indicates the index (placement) of this Scene in a Story
    story       A ManyToOne/ForeignKey that relates the Scene(s?) to a single Story?
    name        A CharField that indicates the name of the Scene
    events      List of events for things such as questions
    scoreMax    Maximum achievable score for this Scene
    scoreReq    Required score to unlock this Scene
    """
    order = models.IntegerField(default=-1)
    story = models.ForeignKey(Story, on_delete=models.SET_NULL, related_name='scenes', null=True, blank=True)
    name = models.CharField(max_length=30)
    events = JSONField(default={})
    image = models.ImageField(null=True, blank=True)
    scoreMax = models.IntegerField(default=0)
    scoreReq = models.IntegerField(default=0)

    def __str__(self):
        return self.name + " (" + str(self.id) + ")"

    def __unicode__(self):
        return '%d: %s' % (self.order, self.name)

    def __get__(self, instance, owner):
        return [self.scoreMax, self.scoreReq]

    class Meta:
        unique_together = ('story', 'order')
        ordering = ['order']


'''
The Score model is used within a Scene instance.
It is used to keep track of the current user along with his/her achieved scores for all the Scenes.
'''
class Score(models.Model):
    """
    id          An IntegerField that holds the id with which it can be identified
    user        The current logged-in user
    scene       ForeignKey with a Scene, as a scene has multiple exercises that all need an intel value
    score       The achieved score by the player for the current Scene
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    scene = models.ForeignKey(Scene, on_delete=models.SET_NULL, related_name='scores', null=True, blank=True)
    score = models.IntegerField(default=0)

    class Meta:
        ordering = ['scene']

    def __str__(self):
        return str(self.id) + " | " + str(self.user) + " | " +\
            str(self.scene) + " of " + str(self.scene.story) + " | " + str(self.score)
