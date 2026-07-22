from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    path('auth/login/', views.LoginView.as_view(), name='login'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('users/', views.UserListCreateView.as_view(), name='user-list-create'),
    path('records/', views.RecordListCreateView.as_view(), name='record-list-create'),
    path('records/<uuid:pk>/', views.RecordDetailView.as_view(), name='record-detail'),
]
