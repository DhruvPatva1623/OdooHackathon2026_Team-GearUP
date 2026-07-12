from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    AssetViewSet,
    AllocationTransferViewSet,
    ResourceBookingViewSet,
    AuditChecklistViewSet,
    NotificationViewSet
)

router = DefaultRouter()
router.register(r'assets', AssetViewSet)
router.register(r'transfers', AllocationTransferViewSet)
router.register(r'bookings', ResourceBookingViewSet)
router.register(r'audits', AuditChecklistViewSet)
router.register(r'notifications', NotificationViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
