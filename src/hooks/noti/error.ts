import { Detail, DetailAlreadyExists, DetailValidationFailed, ErrorMessages, ErrorRes, FieldViolation, IError } from "@/models/error";
import axios, { AxiosError } from "axios";
import { t } from 'i18next';

export const mapErrorToMessage = (error: unknown | IError | ErrorRes | ErrorMessages | Error | undefined | null) => {
  const axiosError = error as AxiosError<IError>;

  const errResponse = axiosError?.response?.data?.error;

  if (errResponse) {
    const { message } = errResponse;
    return message;
  }

  const errorStatusText = axiosError?.response?.statusText;
  if (errorStatusText) {
    return errorStatusText;
  }

  if (error === undefined) {
    return t('unknown_error');
  }

  if (error === 'please_upload_a_file') {
    return t('please_upload_a_file');
  }

  if (error === 'file_must_be_pdf') {
    return t('file_must_be_pdf');
  }

  return t('failed_to_load_data');
};

export const mapErrorToDescrition = (error: unknown | IError | ErrorRes | Error | undefined | null): string | null => {
  const axiosError = error as AxiosError<IError>;
  const errResponse = axiosError?.response?.data?.error;

  // Check if the error is an AxiosError
  if (axios.isAxiosError(errResponse)) {
    // Check if the AxiosError contains a response with error data
    if (axiosError.response && errResponse) {
      const { error } = axiosError.response.data;
      // Get the error message from the error data
      const errorMessage = getErrorMessageFromData(error);
      // Return the error message or the status if no error message found
      return errorMessage || error.status;
    }
    // If no response or data found, return a generic error message
    return null;
  }

  // Check if the error is of type IError when Mock Service is used
  if (errResponse && 'details' in (errResponse as ErrorRes)) {
    const iError = errResponse as ErrorRes;

    // Check if details contain errors
    if (iError?.details && iError?.details?.length > 0) {
      // Get the error message from the details
      return getErrorMessageFromDetails(iError?.details[0]) || iError?.status;
    }
    // If no details found, return the status or a generic error message
    return iError?.status;
  }


  const errorStatusText = axiosError?.response?.statusText;
  if (errorStatusText) {
    return null;
  }

  if (error === undefined) {
    return null;
  }

  // If none of the above conditions are met, return a generic error message
  return null;
};


const getErrorMessageFromData = (data: ErrorRes): string | undefined | null => {
  // Check if the error data contains details
  if (data.details && data.details.length > 0) {
    // Get the error message from the details
    return getErrorMessageFromDetails(data.details[0]) || data.status;
  }

  // If no details found, return the status
  return data.status;
};


const getErrorMessageFromDetails = (detail: Detail | DetailValidationFailed | DetailAlreadyExists): string | undefined | null => {
  // Check if details contain a reason
  if ('reason' in detail && detail.reason) {
    return detail.reason;
  }
  // Check if details contain field violations
  if ('fieldViolations' in detail && detail.fieldViolations) {
    // Get the error messages from field violations and join them with comma
    return detail.fieldViolations.map((violation: FieldViolation) => violation.description).join(', ');
  }
  // Check if details contain resource type and name
  if ('resourceType' in detail && 'resourceName' in detail && detail.resourceType && detail.resourceName) {
    return `${detail.resourceType} ${detail.resourceName} already exists`;
  }

  // If no reason found, return undefined
  return null;
};


