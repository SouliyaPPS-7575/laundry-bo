// Shared interface for common properties
export interface BaseDetail {
  "@type": string;
  reason?: string;
  fieldViolations?: FieldViolation[];
  resourceType?: string;
  resourceName?: string;
}

// Detail Sample
export interface Detail extends BaseDetail {
  domain: string;
}

// Detail Validation Failed
export interface DetailValidationFailed extends BaseDetail { }

// Detail Already exists
export interface DetailAlreadyExists extends BaseDetail { }

export interface FieldViolation {
  field: string;
  description: string;
}

export interface IError {
  error: ErrorRes;
}

export interface ErrorMessages {
  message: string;
}

// Error interface
export interface ErrorRes {
  code: number;
  message: string;
  status: string;
  details: (Detail | DetailValidationFailed | DetailAlreadyExists)[];
}
