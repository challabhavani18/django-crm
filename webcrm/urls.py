from django.contrib import admin
from django.contrib.admin.views.decorators import staff_member_required
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls.i18n import i18n_patterns

from common.views.favicon import FaviconRedirect
from crm.views.contact_form import contact_form
from massmail.views.get_oauth2_tokens import get_refresh_token
from django.http import HttpResponse


def home(request):
    return HttpResponse("Django CRM Running")


# ✅ Base URLs
urlpatterns = [
    path('', home),
    path('favicon.ico', FaviconRedirect.as_view()),
    path('voip/', include('voip.urls')),
    path(
        'OAuth-2/authorize/',
        staff_member_required(get_refresh_token),
        name='get_refresh_token'
    ),
]


# ✅ ONLY MEDIA (NOT STATIC)
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


# ✅ Optional apps
if 'rosetta' in settings.INSTALLED_APPS:
    urlpatterns += [
        path('rosetta/', include('rosetta.urls'))
    ]


# ✅ Main app URLs
urlpatterns += i18n_patterns(
    path(settings.SECRET_CRM_PREFIX, include('common.urls')),
    path(settings.SECRET_CRM_PREFIX, include('crm.urls')),
    path(settings.SECRET_CRM_PREFIX, include('massmail.urls')),
    path(settings.SECRET_CRM_PREFIX, include('tasks.urls')),
    path(settings.SECRET_ADMIN_PREFIX, admin.site.urls),
    path('contact-form/<uuid:uuid>/', contact_form, name='contact_form'),
)