from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User, Record
from .serializers import (
    UserSerializer, UserCreateSerializer, LoginSerializer, RecordSerializer,
)
from .permissions import IsAdmin, IsAdminOrDoctor, CanAccessRecord


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        refresh = RefreshToken.for_user(user)
        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'user': UserSerializer(user).data,
        })


class UserListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all().order_by('-date_joined')
    permission_classes = [IsAdmin]

    def get_serializer_class(self):
        return UserCreateSerializer if self.request.method == 'POST' else UserSerializer


class RecordListCreateView(generics.ListCreateAPIView):
    serializer_class = RecordSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        qs = Record.objects.all()
        if user.role == 'admin' or user.role == 'doctor':
            return qs
        if user.role == 'patient':
            return qs.filter(patient=user)
        if user.role == 'family':
            return qs.filter(patient__patient_relationships__family_member=user)
        return qs.none()

    def perform_create(self, serializer):
        # Only admins/doctors can upload; patient is passed in the request body.
        serializer.save(uploaded_by=self.request.user)


class RecordDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Record.objects.all()
    serializer_class = RecordSerializer
    permission_classes = [permissions.IsAuthenticated, CanAccessRecord]
