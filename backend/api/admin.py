from django.contrib import admin
from .models import Asset, AllocationTransfer, ResourceBooking, AuditChecklist, Notification

@admin.register(Asset)
class AssetAdmin(admin.ModelAdmin):
    list_display = ('tag', 'name', 'category', 'status', 'location', 'dept')
    list_filter = ('category', 'status', 'dept')
    search_fields = ('tag', 'name', 'location')

@admin.register(AllocationTransfer)
class AllocationTransferAdmin(admin.ModelAdmin):
    list_display = ('asset', 'from_employee', 'to_employee', 'status', 'created_at')
    list_filter = ('status',)
    search_fields = ('asset__tag', 'from_employee', 'to_employee', 'reason')

@admin.register(ResourceBooking)
class ResourceBookingAdmin(admin.ModelAdmin):
    list_display = ('resource', 'team', 'start_time', 'end_time', 'created_at')
    list_filter = ('resource',)
    search_fields = ('resource', 'team')

@admin.register(AuditChecklist)
class AuditChecklistAdmin(admin.ModelAdmin):
    list_display = ('asset_id', 'asset_name', 'expected_location', 'verification')
    list_filter = ('verification',)
    search_fields = ('asset_id', 'asset_name', 'expected_location')

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('text', 'category', 'checked', 'created_at')
    list_filter = ('category', 'checked')
    search_fields = ('text',)
