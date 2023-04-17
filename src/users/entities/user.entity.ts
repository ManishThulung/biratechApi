import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Role } from '../utils/role.enum';
import { PhoneEntity } from 'src/entity/phone.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  // @OneToMany(() => PhoneEntity, (phone) => phone.user)
  // phones: PhoneEntity[];
}
