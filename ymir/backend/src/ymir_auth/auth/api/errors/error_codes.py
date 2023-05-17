from enum import IntEnum, unique


@unique
class APIErrorCode(IntEnum):
    API_ERROR = 110101
    VALIDATION_FAILED = 110102
    UNKNOWN_ERROR = 110103
    INVALID_TOKEN = 110104
    REQUIRED_FIELD_MISSING = 110105
    CONTROLLER_ERROR = 110106
    INCORRECT_EMAIL_OR_PASSWORD = 110107
    FAILED_TO_DOWNLOAD = 110108
    INVALID_CONFIGURATION = 110109
    INVALID_SCOPE = 110110
    FAILED_TO_PROCESS_PROTECTED_RESOURCES = 110111
    SYSTEM_VERSION_CONFLICT = 110112
    FAILED_TO_SEND_EMAIL = 110113

    USER_NOT_FOUND = 110201
    USER_DUPLICATED_NAME = 110202
    USER_NOT_ACCESSIBLE = 110203
    USER_NOT_ADMIN = 110205
    USER_NOT_ACTIVE = 110206
    USER_ROLE_NOT_ELIGIBLE = 110207
    USER_FAILED_TO_CREATE = 110208
    USER_DUPLICATED_PHONE = 110209
