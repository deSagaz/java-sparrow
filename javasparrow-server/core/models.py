from django.db import models
from django.contrib.postgres.fields import JSONField
from django.contrib.auth.models import User


class Story(models.Model):
    """
    id          An IntegerField that holds the id with which it can be identified
    name        A CharField that indicates the name of the Story
    description A CharField offering a short description of the Story
    totalScore  Total score acquired by the user
    totScorMax  Max score achievable for this story
    """
    name = models.CharField(max_length=64)
    description = models.CharField(max_length=512)
    #totalScore = models.IntegerField(default=0)

    def __str__(self):
        return self.name + " (" + str(self.id) + ")"

    '''
    def calcTotalScore(self):
        number = Story.scoreTotal
        <ul>
        {% for scene in self.scenes %}
            #{{ forloop.counter0 }}

            {number = (number + (scene.scoreMax))}
        {% endfor %}
        </ul>
        return self.number
    '''

    class Meta:
        verbose_name_plural = "Stories"


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

class Score(models.Model):
    """
    id          An IntegerField that holds the id with which it can be identified
    user        The current logged-in user
    scene       ForeignKey with a Scene, as a scene has multiple exercises that all need an intel value
    score       The achieved score by the player for the current Scene
    """
    #user = models.OneToOneField(User, on_delete=models.CASCADE)
    scene = models.ForeignKey(Scene, on_delete=models.SET_NULL, related_name='scores', null=True, blank=True)
    score = models.IntegerField(default=0)

    #def __str__(self):
    #    return self.user + " (" + str(self.id) + "), Score: " + self.score + ", Scene: " + self.scene



'''
class Sequence(models.Model):
    """
    id          An IntegerField that holds the id with which it can be identified
    order       An IntegerField that indicates the index (placement) of this Sequence in a Scene
    scene       A ManyToOne/ForeignKey that relates the Sequence(s?) to a single Scene?
    name        A CharField that indicates the name of the Sequence
    """
    #abstract = True  # Abstracted to be able to make child classes.
    order = models.IntegerField(default=-1)
    scene = models.ForeignKey(Scene, on_delete=models.SET_NULL, related_name='sequences', null=True, blank=True)
    name = models.CharField(max_length=30)
    events = JSONField(default={})

    def __str__(self):
        return self.name + " (" + str(self.id) + ")"

    def __unicode__(self):
        return '%d: %s' % (self.order, self.name)

    class Meta:
        unique_together = ('scene', 'order')
        ordering = ['order']
'''
'''
class Exercise(Sequence):
    """
    image       An ImageField that is to be displayed in the background during the exercise
    description A CharField that offers a description of the current exercise
    """
    image = models.ImageField(null=True, blank=True)  # Can edit/set width_field and height_field if necessary
    description = models.CharField(max_length=512, blank=True)

class MultChoice(Sequence):
    """
    image       An ImageField that is to be displayed in the background during the exercise
    description A CharField that offers a description of the current exercise
    options     CharFields that contain the possible answers to the question
    answer      The correct answer
    """
    image = models.ImageField(null=True, blank=True)  # Can edit/set width_field and height_field if necessary
    description = models.CharField(max_length=512, blank=True)
    option1 = models.CharField(max_length=256, blank=True)
    option2 = models.CharField(max_length=256, blank=True)
    option3 = models.CharField(max_length=256, blank=True)
    option4 = models.CharField(max_length=256, blank=True)
    option5 = models.CharField(max_length=256, blank=True)
    option6 = models.CharField(max_length=256, blank=True)
    answer = models.CharField(max_length=256, blank=True)

class FillBlank(Sequence):
    """
    image       An ImageField that is to be displayed in the background during the exercise
    description A CharField that offers a description of the current exercise, contains the blank to be filled in
    multiline   Boolean that indicates whether the question should be multiline -> for front-end
    answers   Charfields containing possible solutions to the blank
    """
    image = models.ImageField(null=True, blank=True)  # Can edit/set width_field and height_field if necessary
    description = models.CharField(max_length=512, blank=True)
    multiline = models.BooleanField(default=False)
    answer1 = models.CharField(max_length=256, blank=True)
    answer2 = models.CharField(max_length=256, blank=True)
    answer3 = models.CharField(max_length=256, blank=True)


class Video(Sequence):
    """
    url         An URLField that is supposed to provide an URL to a video
    vidfile     A FileField that is supposed to ...? to be able to show the video.
    """
    url = models.URLField(null=True, blank=True)
    vidfile = models.FileField(null=True, blank=True)  # Add (upload_to = 'link to location') if we need to save it locally. I think.


class AnimText(Sequence):
    """
    text        A TextField that contains the text to be shown
    image       An ImageField that contains the image to be animated
    """
    text = models.TextField()
    image = models.ImageField(null=True, blank=True)  # Can edit/set width_field and height_field if necessary

class Question(models.Model):
    """
    id          An IntegerField that holds the id with which it can be identified
    qdescription A CharField that holds the text for the actual question
    exercise    A ForeignKey/ManyToOne to let an Exercise have multiple Questions
                This is to account for differently typed questions, such as a series of correct/incorrect sentences,
                multiple-choice questions (which would list all options in the description),
                fill in the blank (which usually consists of multiple blanks)
    """
    qdescription = models.CharField(max_length=512, blank=True)
    exercise = models.ForeignKey(Exercise, on_delete=models.SET_NULL, related_name='questions', null=True, blank=True)


class Answer(models.Model):
    """
    id          An IntegerField that holds the id with which it can be identified
    answer      A CharField containing a single answer to a Question
    question    A ForeignKey/ManyToOne to let a Question have different amounts of answers.
                Mostly used in the case of multiple correct answers, or to account for different coding styles and the like
                Also for questions that have multiple required answers, such as fill in the blank with multiple blanks
    """
    answer = models.CharField(max_length=256)
    question = models.ForeignKey(Question, on_delete=models.SET_NULL, related_name='answers', null=True, blank=True)
'''