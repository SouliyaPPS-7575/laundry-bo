// Type API

// user list
export interface IUsersListParam {
  queryParam: {
    id?: string | number | null;
    firstName?: string | null;
    lastName?: string | null;
    phone?: string | null;
    email?: string | null;
    positionID?: string | null;
    roleID?: string | null;
  };
  pagination: {
    pageSize?: number | undefined;
    nextPageToken?: string | undefined;
    pageIndex?: number | undefined;
  };
}

export interface IUsersListRes {
  data: UsersList[];
  nextPageToken: string;
}

export interface UsersList {
  id: string;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  role: string;
  department: string;
  position: string;
  gender: string;
  isSigner: boolean;
  isEnabled: boolean;
  haveSignature: boolean;
  email: string;
  phone: string;
  status: string;
  updatedBy: UpdatedBy;
  updatedAt: string;
}

export interface UpdatedBy {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
}

export interface Role {
  id: string;
  code: string;
  displayName: string;
}

export interface Department {
  id: string;
  code: string;
  displayName: string;
}

export interface Position {
  id: string;
  code: string;
  displayName: string;
}

// user detail res
export interface UserDetailRes {
  id: number;
  avatar: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  gender: string;
  isEnabled: boolean;
  status: string;
  Department: Department;
  Position: Position;
  Role: Role;
  createdBy: CreatedBy;
  createdAt: string;
  updatedBy: UpdatedBy;
  updatedAt: string;
}

export interface Department {
  id: string;
  displayName: string;
}

export interface Position {
  id: string;
  displayName: string;
}

export interface Role {
  id: string;
  displayName: string;
}

export interface CreatedBy {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
}

export interface UpdatedBy {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
}


// Create user
export interface CreateForm {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  gender: string;
  positionID: number;
  departmentID: number;
  roleID: string;
  password: string;

  // type ui
  ui: {
    confirmPassword?: string | undefined;
    showPassword?: boolean | undefined;
    showConfirmPassword?: boolean | undefined;
  };
}

export interface CreateUsersListRes {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  gender: string;
  notificationCount: number;
  isEnabled: boolean;
  isSigner: boolean;
  haveSignature: boolean;
  status: string;
  Department: Department;
  Position: Position;
  Role: Role;
  createdBy: CreatedBy;
  createdAt: string;
  updatedBy: UpdatedBy;
  updatedAt: string;
}

// Update user
export interface UpdateForm {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  gender: string;
  positionID: string;
  departmentID: string;
  roleID: string;
}

export interface UpdateUsersListRes {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  gender: string;
  isEnabled: boolean;
  status: string;
  Department: Department;
  Position: Position;
  Role: Role;
  createdBy: CreatedBy;
  createdAt: string;
  updatedBy: UpdatedBy;
  updatedAt: string;
}

export interface Row {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  department: string;
  position: string;
  gender: string;
  isSigner: boolean;
  isEnabled: boolean;
  email: string;
  phone: string;
  status: string;
  avatar: string;
  updatedBy: UpdatedBy;
  updatedAt: string;
}

export interface Department {
  id: string;
  displayName: string;
}

export interface Position {
  id: string;
  displayName: string;
}

export interface Role {
  id: string;
  displayName: string;
}

export interface UpdatedBy {
  id: string;
  firstName: string;
  lastName: string;
}

// Enable user
export interface IEnableUser {
  userID: string;
}

// Disable user
export interface IDisableUser {
  userID: string;
}

// Enable Signer
export interface IEnableSigner {
  userID: string;
}

// Disable Signer
export interface IDisableSigner {
  userID: string;
}

// Send Reset Password
export interface ISendResetPassword {
  userID: string;
}

export interface UploadSignatureRes {
  code: number;
  message: string;
  status: string;
}

// Type UI

export type Queries = {
  search: IUsersListParam['queryParam'];
};

export type OptionType = {
  value: string;
  label: string;
};

export interface TableProps {
  searchValue: Queries['search'];
}

// Business Logic
export const user = (() => {
  const genders = [
    {
      value: 'M',
      label: 'Mr',
    },
    {
      value: 'F',
      label: 'Ms',
    },
    {
      value: 'O',
      label: 'Other',
    },
  ];
  const mapGender = new Map(
    genders.map((gender) => [gender.value, gender.label])
  );
  return {
    genders,
    mapGender,
  };
})();

export const removeLaoDialCode = (phone: string) => {
  return phone.replace('+856', '');
};
