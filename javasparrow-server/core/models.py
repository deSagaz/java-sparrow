from django.db import models

# Create your models here. Story, scene, sequence, sequence child classes

class Story(models.Model):
    """
    id          An IntegerField that holds the id with which it can be identified
    number      An IntegerField that indicates this story's number
    name        A CharField that indicates the name of the Story
    """
    name = models.CharField(max_length=64)
    description = models.CharField(max_length=512)

    class Meta:
        verbose_name_plural = "Stories"


class Scene(models.Model):
    """
    id          An IntegerField that holds the id with which it can be identified
    order       An IntegerField that indicates the index (placement) of this Scene in a Story
    story       A ManyToOne/ForeignKey that relates the Scene(s?) to a single Story?
    name        A CharField that indicates the name of the Scene
    """

class Sequence(models.Model):
    """
    id          An IntegerField that holds the id with which it can be identified
    order       An IntegerField that indicates the index (placement) of this Sequence in a Scene
    scene       A ManyToOne/ForeignKey that relates the Sequence(s?) to a single Scene?
    name        A CharField that indicates the name of the Scene
    """
    abstract = True  #Abstracted to be able to make child classes.

class Exercise(Sequence):
    """
    question    A TextField that holds the text for a question/assignment that will be posed to the player.
    answer      A TextField that holds the text for the right answer to a question/assignment.
    image       An ImageField that is to be displayed in the background during the exercise
    """

class Video(Sequence):
    """
    url         An URLField that is supposed to provide an URL to a video
    vidfile     A FileField that is supposed to ...? to be able to show the video.
    """

class AnimText(Sequence):
    """
    text        A TextField that contains the text to be shown
    image       An ImageField that contains the image to be animated
    """
