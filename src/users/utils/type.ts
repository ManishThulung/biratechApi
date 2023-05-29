import { CommentEntity } from 'src/entity/comment.entity';
import { Role } from './role.enum';
import { PhoneEntity } from 'src/entity/phone.entity';

export interface Register {
  id: number;
}

export interface UpdateUser {
  name?: string;
  email?: string;
  role?: Role;
  // password?: string;
  // is_verified?: boolean;
  // verify_time?: number;
  // comment?: CommentEntity;
  // phones?: PhoneEntity;
}

// export interface LoginCredential {
//   email: string;
//   password: string;
// }
