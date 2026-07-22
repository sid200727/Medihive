from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'admin')


class IsDoctor(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'doctor')


class IsAdminOrDoctor(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user and request.user.is_authenticated
            and request.user.role in ('admin', 'doctor')
        )


class CanAccessRecord(BasePermission):
    """
    Admins and doctors can access any record.
    Patients can only access their own records.
    Family members can only access records of patients they're linked to.
    """
    def has_object_permission(self, request, view, obj):
        user = request.user
        if user.role in ('admin', 'doctor'):
            return True
        if user.role == 'patient':
            return obj.patient_id == user.id
        if user.role == 'family':
            return obj.patient.patient_relationships.filter(family_member=user).exists()
        return False
