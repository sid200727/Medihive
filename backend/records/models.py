import uuid
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('doctor', 'Doctor'),
        ('patient', 'Patient'),
        ('family', 'Family'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='patient')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return f"{self.get_full_name() or self.username} ({self.role})"


class FamilyRelationship(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    family_member = models.ForeignKey(
        User, related_name='family_relationships', on_delete=models.CASCADE
    )
    patient = models.ForeignKey(
        User, related_name='patient_relationships', on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('family_member', 'patient')

    def __str__(self):
        return f"{self.family_member} -> {self.patient}"


class Record(models.Model):
    RECORD_TYPES = [
        ('blood_test', 'Blood Test'),
        ('xray', 'X-Ray'),
        ('mri', 'MRI Scan'),
        ('prescription', 'Prescription'),
        ('ecg', 'ECG Report'),
        ('other', 'Other'),
    ]
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('reviewed', 'Reviewed'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    patient = models.ForeignKey(User, related_name='records', on_delete=models.CASCADE)
    uploaded_by = models.ForeignKey(
        User, related_name='uploaded_records', on_delete=models.SET_NULL, null=True
    )
    record_type = models.CharField(max_length=20, choices=RECORD_TYPES, default='other')
    file = models.FileField(upload_to='records/%Y/%m/')
    notes = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.record_type} - {self.patient}"
