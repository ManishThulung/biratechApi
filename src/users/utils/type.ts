import { Role } from './role.enum';

export interface Register {
  id: number;
}

export interface UpdateUser {
  name?: string;
  email?: string;
  role?: Role;
}
