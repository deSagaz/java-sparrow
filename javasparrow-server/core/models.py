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
    order = models.IntegerField
    story = models.ForeignKey(Story, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)



class Sequence(models.Model):
    """
    id          An IntegerField that holds the id with which it can be identified
    order       An IntegerField that indicates the index (placement) of this Sequence in a Scene
    scene       A ManyToOne/ForeignKey that relates the Sequence(s?) to a single Scene?
    name        A CharField that indicates the name of the Scene
    """
    abstract = True  #Abstracted to be able to make child classes.
    order = models.IntegerField
    scene = models.ForeignKey(Scene, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)

class Exercise(Sequence):
    """
    question    A TextField that holds the text for a question/assignment that will be posed to the player.
    answer      A TextField that holds the text for the right answer to a question/assignment.
    image       An ImageField that is to be displayed in the background during the exercise
    choices     A TextField with Field.choices that holds the varying answers for a question with multiple choices.
                Can be blank (if not a multiple-choice question)
                Couldn't really figure this one out, the 'choices' field suggests the variable would take on the value
                of 1 of the possible choices, so this isn't really suitable. Maybe Ionic has something for this?
    """
    question = models.TextField
    answer = models.TextField
    image = models.ImageField  # Can edit/set width_field and height_field if necessary

class Video(Sequence):
    """
    url         An URLField that is supposed to provide an URL to a video
    vidfile     A FileField that is supposed to ...? to be able to show the video.
    """
    url = models.URLField
    vidfile = models.FileField # Add (upload_to = 'link to location') if we need to save it locally. I think.

class AnimText(Sequence):
    """
    text        A TextField that contains the text to be shown
    image       An ImageField that contains the image to be animated
    """
    text = models.TextField
    image = models.ImageField # Can edit/set width_field and height_field if necessary
