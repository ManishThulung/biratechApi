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

  // @Column({ unique: true })
  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ default: false })
  is_verified: boolean;

  @Column({ nullable: true, type: 'bigint' })
  verify_time: number;

  @Column({ nullable: true })
  verify_token: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @OneToMany(() => PhoneEntity, (phone) => phone.author)
  phones: PhoneEntity[];
}
