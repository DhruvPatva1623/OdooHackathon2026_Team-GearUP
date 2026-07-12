from rest_framework import viewsets
from .models import Asset, AllocationTransfer, ResourceBooking, AuditChecklist, Notification
from .serializers import (
    AssetSerializer,
    AllocationTransferSerializer,
    ResourceBookingSerializer,
    AuditChecklistSerializer,
    NotificationSerializer
)

class AssetViewSet(viewsets.ModelViewSet):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer

class AllocationTransferViewSet(viewsets.ModelViewSet):
    queryset = AllocationTransfer.objects.all()
    serializer_class = AllocationTransferSerializer

class ResourceBookingViewSet(viewsets.ModelViewSet):
    queryset = ResourceBooking.objects.all()
    serializer_class = ResourceBookingSerializer

class AuditChecklistViewSet(viewsets.ModelViewSet):
    queryset = AuditChecklist.objects.all()
    serializer_class = AuditChecklistSerializer

class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
