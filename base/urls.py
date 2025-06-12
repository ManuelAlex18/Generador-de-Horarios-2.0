from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from base import views
from base.views import RegisterView, UserAdminViewSet, CustomTokenObtainPairView

router = routers.DefaultRouter()
router.register(r'(?P<model_name>[^/.]+)', views.GenericModelViewSet, basename='generic')

admin_router = routers.DefaultRouter()
admin_router.register(r'users', UserAdminViewSet, basename='user-admin')

urlpatterns = [
    path('api/v1/whoami/', views.whoami, name='whoami'),
    path('api/v1/admin/', include(admin_router.urls)),  # Primero admin_router
    path('api/v1/', include(router.urls)),
    path('api/calculate-balance/', views.calculate_balance, name='calculate_balance'),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/exportar-pdf/<int:schedule_id>/', views.exportar_horario_pdf, name='exportar_horario_pdf'),
]
