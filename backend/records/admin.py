from django.contrib import admin
from .models import User, FamilyRelationship, Record

admin.site.register(User)
admin.site.register(FamilyRelationship)
admin.site.register(Record)
