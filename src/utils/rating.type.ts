import { PhoneEntity } from 'src/entity/phone.entity';

export interface Rating {
  value: number;
  phone: PhoneEntity;
}
