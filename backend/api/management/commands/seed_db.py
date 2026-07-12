from django.core.management.base import BaseCommand
from api.models import Asset, ResourceBooking, AllocationTransfer, AuditChecklist, Notification

class Command(BaseCommand):
    help = 'Seeds the database with initial wireframe dashboard data'

    def handle(self, *args, **options):
        self.stdout.write('Seeding initial data...')

        # Clear existing
        Asset.objects.all().delete()
        ResourceBooking.objects.all().delete()
        AllocationTransfer.objects.all().delete()
        AuditChecklist.objects.all().delete()
        Notification.objects.all().delete()

        # 1. Seed Assets
        assets = [
            Asset(tag='AF-0012', name='Dell Laptop', category='Electronics', status='Allocated', location='bengaluru', dept='Engineering'),
            Asset(tag='AF-0062', name='Projector', category='Electronics', status='Maintenance', location='HQ floor 2', dept='Facilities'),
            Asset(tag='AF-0201', name='Office chair', category='Furniture', status='Available', location='Warehouse', dept='IT Operations'),
            Asset(tag='AF-0114', name='Dell laptop', category='Electronics', status='Allocated', location='HQ floor 1', dept='Engineering'),
            Asset(tag='AF-0088', name='iPad Pro', category='Electronics', status='Allocated', location='HQ floor 2', dept='Facilities'),
        ]
        Asset.objects.bulk_create(assets)
        self.stdout.write(f'Created {len(assets)} Assets.')

        # 2. Seed Resource Bookings
        bookings = [
            ResourceBooking(resource='Conference room B2 - Tue, 7 Jul', team='Procurement Team', start_time='9:00', end_time='10:00'),
            ResourceBooking(resource='Conference room B2 - Tue, 7 Jul', team='Engineering Team', start_time='9:30', end_time='10:30'),
        ]
        ResourceBooking.objects.bulk_create(bookings)
        self.stdout.write(f'Created {len(bookings)} Bookings.')

        # 3. Seed Audit Checklist
        audits = [
            AuditChecklist(asset_id='AF-003', asset_name='AF-003 Dell laptop', expected_location='Desk E12', verification='Verified'),
            AuditChecklist(asset_id='AF-9921', asset_name='AF-9921 Office chair', expected_location='Desk E14', verification='Missing'),
            AuditChecklist(asset_id='AF-9838', asset_name='AF-9838 Monitor', expected_location='Desk E15', verification='Damaged'),
        ]
        AuditChecklist.objects.bulk_create(audits)
        self.stdout.write(f'Created {len(audits)} Audit Items.')

        # 4. Seed Notifications
        notifications = [
            Notification(text='Laptop AF-0014 assigned to Priya shah', category='Bookings', color='#4472c4'),
            Notification(text='Maintenance request AF-0055 approved', category='Approvals', color='#70ad47'),
            Notification(text='Booking confirmed : Room B2 : 2:00 to 3:00 PM', category='Bookings', color='#4472c4'),
            Notification(text='Transfer approved : AF-0033 to facilities dept', category='Approvals', color='#70ad47'),
            Notification(text='Overdue return : AF-0021 was due 3 days ago', category='Alerts', color='#ed7d31'),
            Notification(text='audit discrepancy flagged : AF-0088 damaged', category='Alerts', color='#ff0000'),
        ]
        Notification.objects.bulk_create(notifications)
        self.stdout.write(f'Created {len(notifications)} Notifications.')

        self.stdout.write(self.style.SUCCESS('Database seeded successfully!'))
