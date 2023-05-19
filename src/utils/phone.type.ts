import { UserEntity } from 'src/entity/user.entity';

export type Phone = {
  id?: number;
  name?: string;
  // company?: string;
  camera?: string;
  memory?: string;
  battery?: string;
  photo?: string | null;
  price?: number;
  releaseDate?: Date;
  // author: UserEntity;
};

export type QueryValidate = {
  phoneOne: string;
  phoneTwo: string;
};

export type FilterQueryValidate = {
  company?: string;
  name?: string;
  storage?: string;
  ram?: string;
  battery?: string;
  camera?: string;
  price?: [number, number];
};
