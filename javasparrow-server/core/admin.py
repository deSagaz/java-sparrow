from django.contrib import admin

# Register your models here.
from core.models import Story, Scene, Score


admin.site.register(Story)
admin.site.register(Scene)
admin.site.register(Score)
