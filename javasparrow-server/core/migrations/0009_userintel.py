# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-11-01 21:16
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0008_auto_20171018_0927'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserIntel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('intelmax', models.IntegerField(default=0)),
                ('userintel', models.IntegerField(default=0)),
                ('scene', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='userintels', to='core.Scene')),
            ],
        ),
    ]
