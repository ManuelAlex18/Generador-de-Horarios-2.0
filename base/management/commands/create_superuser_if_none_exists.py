from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
import os


class Command(BaseCommand):
    help = 'Crea un superusuario automáticamente si no existe'

    def handle(self, *args, **options):
        username = os.environ.get('DJANGO_SUPERUSER_USERNAME', 'AlexMMM')
        email = os.environ.get('DJANGO_SUPERUSER_EMAIL', 'alexmanuelmonteromagarino18@gmail.com')
        password = os.environ.get('DJANGO_SUPERUSER_PASSWORD', 'Alex150610')

        if not User.objects.filter(username=username).exists():
            User.objects.create_superuser(
                username=username,
                email=email,
                password=password
            )
            self.stdout.write(
                self.style.SUCCESS(f'Superusuario "{username}" creado exitosamente')
            )
        else:
            self.stdout.write(
                self.style.WARNING(f'El superusuario "{username}" ya existe')
            )
