from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework.exceptions import ParseError,AuthenticationFailed
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework import status
from .serializer import UserRegisterSerializer

User = get_user_model()
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token["username"] = user.username

        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(["GET"])
def getRoutes(request):
    routes = ["api/token", "api/token/refresh"]
    return Response(routes)


# LoginView
class LoginView(APIView):
    def post(self, request):
        try:
            email = request.data['email']
            password =request.data['password']
            
        except KeyError:
            raise ParseError('All Fields Are Required')
        
        if not User.objects.filter(email=email).exists():
            raise AuthenticationFailed('Invalid Email Address')
        
        
        if not User.objects.filter(email=email,is_active=True).exists():
            raise AuthenticationFailed('You are blocked by admin ! Please contact admin')
        
        user = authenticate(username=email,password=password)
        if user is None:
            raise AuthenticationFailed('Invalid Password')
        
        refresh = RefreshToken.for_user(user)
        refresh["first_name"] = str(user.first_name)
        content = {
                     'refresh': str(refresh),
                     'access': str(refresh.access_token),
                     'isAdmin': user.is_superadmin,
                }
        
        return Response(content, status=status.HTTP_200_OK)


#registerView
class RegisterView(APIView):
    def post(self, request):
        serializer = UserRegisterSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()

        else:
            return Response(serializer.errors,status=status.HTTP_406_NOT_ACCEPTABLE)
        content = {'message' : "Accoutn created successfully!"}
        return Response(content)