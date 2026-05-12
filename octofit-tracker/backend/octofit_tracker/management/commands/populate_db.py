from django.core.management.base import BaseCommand
from django.conf import settings
from django.db import connections
from bson import ObjectId

from djongo import models

# Define models inline for demonstration (should be in models.py in production)
class User(models.Model):
    _id = models.ObjectIdField(primary_key=True, default=ObjectId, editable=False)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    team = models.CharField(max_length=50)
    class Meta:
        managed = False
        db_table = 'users'

class Team(models.Model):
    _id = models.ObjectIdField(primary_key=True, default=ObjectId, editable=False)
    name = models.CharField(max_length=50)
    class Meta:
        managed = False
        db_table = 'teams'

class Activity(models.Model):
    _id = models.ObjectIdField(primary_key=True, default=ObjectId, editable=False)
    user_email = models.EmailField()
    type = models.CharField(max_length=50)
    duration = models.IntegerField()
    class Meta:
        managed = False
        db_table = 'activities'

class Leaderboard(models.Model):
    _id = models.ObjectIdField(primary_key=True, default=ObjectId, editable=False)
    team = models.CharField(max_length=50)
    points = models.IntegerField()
    class Meta:
        managed = False
        db_table = 'leaderboard'

class Workout(models.Model):
    _id = models.ObjectIdField(primary_key=True, default=ObjectId, editable=False)
    name = models.CharField(max_length=100)
    difficulty = models.CharField(max_length=50)
    class Meta:
        managed = False
        db_table = 'workouts'

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        db = connections['default'].cursor().db_conn
        db.drop_collection('users')
        db.drop_collection('teams')
        db.drop_collection('activities')
        db.drop_collection('leaderboard')
        db.drop_collection('workouts')

        db.create_collection('users')
        db.create_collection('teams')
        db.create_collection('activities')
        db.create_collection('leaderboard')
        db.create_collection('workouts')

        db.users.create_index([('email', 1)], unique=True)

        users = [
            {'name': 'Superman', 'email': 'superman@dc.com', 'team': 'DC'},
            {'name': 'Batman', 'email': 'batman@dc.com', 'team': 'DC'},
            {'name': 'Wonder Woman', 'email': 'wonderwoman@dc.com', 'team': 'DC'},
            {'name': 'Iron Man', 'email': 'ironman@marvel.com', 'team': 'Marvel'},
            {'name': 'Captain America', 'email': 'cap@marvel.com', 'team': 'Marvel'},
            {'name': 'Black Widow', 'email': 'widow@marvel.com', 'team': 'Marvel'},
        ]
        db.users.insert_many(users)

        teams = [
            {'name': 'Marvel'},
            {'name': 'DC'},
        ]
        db.teams.insert_many(teams)

        activities = [
            {'user_email': 'superman@dc.com', 'type': 'flying', 'duration': 120},
            {'user_email': 'batman@dc.com', 'type': 'martial arts', 'duration': 90},
            {'user_email': 'ironman@marvel.com', 'type': 'engineering', 'duration': 100},
            {'user_email': 'cap@marvel.com', 'type': 'running', 'duration': 80},
        ]
        db.activities.insert_many(activities)

        leaderboard = [
            {'team': 'Marvel', 'points': 180},
            {'team': 'DC', 'points': 210},
        ]
        db.leaderboard.insert_many(leaderboard)

        workouts = [
            {'name': 'Push Ups', 'difficulty': 'Easy'},
            {'name': 'Flight Training', 'difficulty': 'Hard'},
        ]
        db.workouts.insert_many(workouts)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
