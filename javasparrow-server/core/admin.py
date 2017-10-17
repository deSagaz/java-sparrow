from django.contrib import admin

# Register your models here.
from core.models import Story, Scene, Sequence #Exercise, Question, Answer, AnimText, Video, MultChoice, FillBlank

admin.site.register(Story)
admin.site.register(Scene)
admin.site.register(Sequence)
'''
admin.site.register(Exercise)
admin.site.register(Video)
admin.site.register(AnimText)
admin.site.register(Question)
admin.site.register(Answer)
admin.site.register(MultChoice)
admin.site.register(FillBlank)
'''