from django.db import models


class Message(models.Model):
    text = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    to = models.ForeignKey("users.User", on_delete=models.CASCADE, related_name="to")
    sender = models.ForeignKey("users.User", on_delete=models.CASCADE, related_name="sender")

    def __str__(self):
        return self.text

    @property
    def preview(self):
        if len(description := self.transaction.name[:50]) == 50:
            description = f"{description[:-3]}..."
        return description

    def send(self):
        pass

