from rest_framework import serializers
from.models import Rating,Movie
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = [
            'id',
            'title',
            'description',
            'ratingsByUsers',
            'avrRating',
            'numberOfRatinfs'
        ]


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = [
            'id',
            'stars',
            'user',
            'movie'
        ]
class UserSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        token = Token.objects.create(user = user)
        return user
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'password',
            'email',
        ]
        extra_kwargs = {'password': {'write_only': True, 'min_length': 8,'required':True}}



