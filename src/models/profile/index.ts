// Type API
export interface UserProfile {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  gender: string;
  avatar: string;
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
  notificationCount: number;
}


export interface Department {
  id: number;
  displayName: string;
}

export interface Position {
  id: number;
  displayName: string;
}

export interface Role {
  id: string;
  displayName: string;
}

export interface CreatedBy {
  id: number;
  firstName: string;
  lastName: string;
}

export interface UpdatedBy {
  id: number;
  firstName: string;
  lastName: string;
}
