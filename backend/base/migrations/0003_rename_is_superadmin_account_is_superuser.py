# Generated by Django 5.0 on 2023-12-19 13:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_alter_account_is_active'),
    ]

    operations = [
        migrations.RenameField(
            model_name='account',
            old_name='is_superadmin',
            new_name='is_superuser',
        ),
    ]
