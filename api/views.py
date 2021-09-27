from django.shortcuts import render
from rest_framework import viewsets
from .models import Movie,Rating,User
from .serializers import UserSerializer,RatingSerializer,MovieSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
#from rest_framework.authentication import TokenAuthentication
#from rest_framework.permissions import IsAuthenticated
from django.db.models import Count

class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    #authentication_classes = [TokenAuthentication,]
    def update(self, request, *args, **kwargs):
        response = {'message': 'you cannot update like this'}
        return Response(response, status=status.HTTP_200_OK)
    def create(self, request, *args, **kwargs):
            response = {'message': 'you cannot create like this'}
            return Response(response, status=status.HTTP_200_OK)

# Create your views here.
class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    #authentication_classes = [TokenAuthentication,]
    #permission_classes = [IsAuthenticated,]
    @action(detail=True,methods=["POST"])
    def rate_movie(self,request,pk=None):
        if 'stars' in request.data:
            movie = Movie.objects.get(id = pk)
            stars = request.data["stars"]
            user = request.user
            try:
                rating = Rating.objects.get(movie = movie,user = user)
                rating.stars = stars
                rating.save()
                serializer = RatingSerializer(rating,many=False)
                response = {'message': 'rating updated!!', 'result': serializer.data}
                return Response(response, status=status.HTTP_200_OK)
            except:
                rating = Rating.objects.create(movie=movie, user=user,stars = stars)
                serializer = RatingSerializer(rating, many=False)
                response = {'message': 'rating created!!','result':serializer.data}
                return Response(response,status=status.HTTP_200_OK)
        else:
            return Response({"message":"error"},status=status.HTTP_404_NOT_FOUND)



class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer