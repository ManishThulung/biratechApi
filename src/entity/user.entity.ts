import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Role } from '../users/utils/role.enum';
import { PhoneEntity } from 'src/entity/phone.entity';
import { Exclude } from 'class-transformer';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @OneToMany(() => PhoneEntity, (phone) => phone.author)
  phones: PhoneEntity[];
}
