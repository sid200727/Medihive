from django.core.management.base import BaseCommand
from records.models import User


class Command(BaseCommand):
    help = 'Creates demo admin/doctor/patient users for local testing'

    def handle(self, *args, **kwargs):
        demo_users = [
            dict(username='admin', email='admin@medihive.com', password='admin123',
                 first_name='Ananya', last_name='Rao', role='admin', is_staff=True, is_superuser=True),
            dict(username='doctor', email='doctor@medihive.com', password='doctor123',
                 first_name='Rahul', last_name='Verma', role='doctor'),
            dict(username='patient', email='patient@medihive.com', password='patient123',
                 first_name='Siddhi', last_name='Khandelwal', role='patient'),
        ]

        for data in demo_users:
            password = data.pop('password')
            user, created = User.objects.get_or_create(email=data['email'], defaults=data)
            user.set_password(password)
            user.save()
            status = 'Created' if created else 'Updated'
            self.stdout.write(self.style.SUCCESS(f'{status}: {user.email} ({user.role})'))
