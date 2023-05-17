import { Role } from 'src/users/utils/role.enum';

export interface User {
  name: string;
  email: string;
  password: string;
  is_verified?: boolean;
  verify_token?: string;
  verify_time?: number;
  avatar?: string;
  role?: Role;
}
