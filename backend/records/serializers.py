from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User, FamilyRelationship, Record


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'role']


class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'role', 'password']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(email=data['email'], password=data['password'])
        if not user:
            raise serializers.ValidationError('Invalid email or password')
        data['user'] = user
        return data


class FamilyRelationshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = FamilyRelationship
        fields = ['id', 'family_member', 'patient', 'created_at']
        read_only_fields = ['created_at']


class RecordSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(source='patient.get_full_name', read_only=True)
    uploaded_by_name = serializers.CharField(source='uploaded_by.get_full_name', read_only=True)

    class Meta:
        model = Record
        fields = [
            'id', 'patient', 'patient_name', 'uploaded_by', 'uploaded_by_name',
            'record_type', 'file', 'notes', 'status', 'created_at',
        ]
        read_only_fields = ['uploaded_by', 'created_at']
