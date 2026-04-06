from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from common.views.dashboard_views import ApiHomeView
from django.conf import settings
from django.contrib import admin
from django.urls import path, include
# from django.contrib.auth import views
from django.urls import include, path
from django.urls import re_path as url
from django.views.generic import TemplateView
from django.http import HttpResponse 
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

app_name = "crm"

urlpatterns = [
    path('', lambda request: HttpResponse("Welcome to CRM Project")),

    path('dashboard/', ApiHomeView.as_view()),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path(
        r"healthz/",
        TemplateView.as_view(template_name="healthz.html"),
        name="healthz",
    ),

    # ✅ ONLY THIS API INCLUDE
    path("api/", include("common.app_urls", namespace="common_urls")),
     path("dashboard/", ApiHomeView.as_view(), name="dashboard"),

    # Public APIs
    path("api/public/", include("invoices.public_urls", namespace="public_invoices")),

    # path(
    #     "logout/", views.LogoutView.as_view(), {"next_page": "/login/"}, name="logout"
    # ),

    path("admin/", admin.site.urls),

    # Swagger
    path("schema/", SpectacularAPIView.as_view(), name="schema"),
    path("swagger-ui/", SpectacularSwaggerView.as_view(url_name="schema")),
    path("api/schema/redoc/", SpectacularRedocView.as_view(url_name="schema")),
]


if settings.DEBUG:
    from django.conf.urls.static import static
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns

    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

    # urlpatterns = urlpatterns + static(
    #     settings.MEDIA_URL, document_root=settings.MEDIA_ROOT
    # )
