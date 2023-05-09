import { Role } from 'src/users/utils/role.enum';

export interface User {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  role?: Role;
}
