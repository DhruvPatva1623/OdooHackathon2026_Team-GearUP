from django.db import models

class Asset(models.Model):
    tag = models.CharField(max_length=50, primary_key=True)
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=100)
    status = models.CharField(max_length=100)
    location = models.CharField(max_length=200)
    dept = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.tag} - {self.name}"

class AllocationTransfer(models.Model):
    asset = models.ForeignKey(Asset, on_delete=models.CASCADE, related_name='transfers')
    from_employee = models.CharField(max_length=100)
    to_employee = models.CharField(max_length=100)
    reason = models.TextField()
    status = models.CharField(max_length=100, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Transfer {self.asset.tag} from {self.from_employee} to {self.to_employee}"

class ResourceBooking(models.Model):
    resource = models.CharField(max_length=200)
    team = models.CharField(max_length=100)
    start_time = models.CharField(max_length=50)
    end_time = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Booking for {self.resource} by {self.team}"

class AuditChecklist(models.Model):
    asset_id = models.CharField(max_length=50, unique=True)
    asset_name = models.CharField(max_length=200)
    expected_location = models.CharField(max_length=200)
    verification = models.CharField(max_length=100, default='Verified')

    def __str__(self):
        return f"Audit {self.asset_id} - {self.verification}"

class Notification(models.Model):
    text = models.CharField(max_length=500)
    category = models.CharField(max_length=100)
    color = models.CharField(max_length=50)
    checked = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Notification: {self.text}"
