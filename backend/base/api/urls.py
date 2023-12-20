from django.urls import path
from .views import MyTokenObtainPairView,LoginView,RegisterView,ProfileView,ProfileUpdateView
from rest_framework_simplejwt.views import TokenRefreshView



urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('login/', LoginView.as_view(), name="login"),
    path('register/', RegisterView.as_view(), name="Register"),
    path('profile/', ProfileView.as_view(), name="profile"),
    path('profile/update', ProfileUpdateView.as_view(), name="profile_update")
    
] 


