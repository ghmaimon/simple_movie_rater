from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator,MaxValueValidator



# those validators will help us make the rating stars between 1 and 5.
class Movie(models.Model):
    title = models.CharField(max_length=30)
    description = models.CharField(max_length=360)
    def avrRating(self):
        ratings = Rating.objects.filter(movie=self)
        temp = 0
        for r in ratings:
            temp+=r.stars
        if len(ratings)==0:
            return 0
        else:
            return temp/len(ratings)
    def ratingsByUsers(self):
        ratings = Rating.objects.filter(movie = self)
        temp = {}
        for rating in ratings:
            temp[f'{rating.user.username}'] = rating.stars
        return temp
    def numberOfRatinfs(self):
        ratings = Rating.objects.filter(movie=self)
        return len(ratings)

class Rating(models.Model):
    movie = models.ForeignKey(Movie,on_delete=models.CASCADE,related_name='ratings')
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name='ratings')
    stars = models.IntegerField(validators=[MinValueValidator(1),MaxValueValidator(5)])
    class Meta:
        unique_together = (('user','movie'),)
        index_together = (('user','movie'),)
