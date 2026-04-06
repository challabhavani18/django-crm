from django.contrib import admin
from .models import Account
from .models import Org

@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')   #  safe
@admin.register(Org)
class OrgAdmin(admin.ModelAdmin):
    list_display = ('name', 'company_name', 'email', 'phone', 'is_active')
    search_fields = ('name', 'company_name', 'email')