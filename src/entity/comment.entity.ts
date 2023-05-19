import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PhoneEntity } from './phone.entity';
import { UserEntity } from './user.entity';

@Entity('Comments')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  comment: string;

  @ManyToOne(() => PhoneEntity, (phone) => phone.comments)
  phone: PhoneEntity;

  @ManyToOne(() => UserEntity, (user) => user.comment)
  author: UserEntity;
}
