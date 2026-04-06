from django.apps import AppConfig


class CommonConfig(AppConfig):
    name = "common"
    verbose_name = 'Organization Management'

    def ready(self):
        import common.signals  # noqa: F401  # pylint: disable=unused-import
