import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PhoneEntity } from './phone.entity';

@Entity('rating')
export class RatingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  value: number;

  @ManyToOne(() => PhoneEntity, (phone) => phone.ratings)
  phone: PhoneEntity;
}
