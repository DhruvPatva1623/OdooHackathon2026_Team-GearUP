from rest_framework import serializers
from .models import Asset, AllocationTransfer, ResourceBooking, AuditChecklist, Notification

class AssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asset
        fields = '__all__'

class AllocationTransferSerializer(serializers.ModelSerializer):
    class Meta:
        model = AllocationTransfer
        fields = '__all__'

class ResourceBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResourceBooking
        fields = '__all__'

class AuditChecklistSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuditChecklist
        fields = '__all__'

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'
