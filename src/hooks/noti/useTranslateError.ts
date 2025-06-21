import { t } from 'i18next';

const errorMessages: { [key: string]: string; } = {
  'email or password is invalid': 'email or password is invalid',
  'Invalid or missing authorization token': 'Invalid or missing authorization token',
  'internal_server_error': 'internal_server_error',
  'duplicate_key': 'duplicate_key',
  'binding_json_body_failure_please_pass_a_valid_json_body': 'binding_json_body_failure_please_pass_a_valid_json_body',
  'invalid body': 'invalid body',
  'info_not_found': 'info_not_found',
  'sign_reject_approve_helper': 'sign_reject_approve_helper',
  'ref key is invalid': 'ref key is invalid',
  'status_not_allow': 'status_not_allow',
  'please_upload_a_file': 'please_upload_a_file',
  'file_must_be_pdf': 'file_must_be_pdf',
  'body is invalid': 'body is invalid',
  "you_does't_have_sufficient_permission_to_perform_action": "you_not_have_sufficient_permission_to_perform_action"
};

const errorDescriptions: { [key: string]: string; } = {
  'CREDENTIALS_INVALID': 'CREDENTIALS_INVALID',
  'TOKEN_INVALID': 'TOKEN_INVALID',
  'INTERNAL_SERVER_ERROR': 'INTERNAL_SERVER_ERROR',
  'DUPLICATE_KEY': 'DUPLICATE_KEY',
  'BINDING_FAILURE': 'BINDING_FAILURE',
  'INVALID_INPUT': 'INVALID_INPUT',
  'INVALID_BODY': 'INVALID_BODY',
  'NOT_FOUND': 'NOT_FOUND',
  'sign_reject_approve': 'sign_reject_approve',
  'SIGNATURE_FILE_NOT_EXIST': 'signature_file_not_exist',
  'REF_KEY_IS_INVALID': 'REF_KEY_IS_INVALID',
  'DOC_IS_NOT_REJECTED': 'DOC_IS_NOT_REJECTED',
  'INVALID_STATUS': 'INVALID_STATUS',
  'INSUFFICIENT_PERMISSION': 'INSUFFICIENT_PERMISSION'
};

export const translateErrorMessage = (message: string) => {
  return errorMessages[message] ? t(errorMessages[message]) : message;
};

export const translateErrorDescription = (description: string) => {
  return errorDescriptions[description] ? t(errorDescriptions[description]) : description;
};
