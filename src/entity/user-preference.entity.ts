import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_preference')
export class UserPreferenceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  company: Array<string>;

  @Column({ nullable: true })
  price: Array<number>;

  @Column({ nullable: true })
  memory: Array<string>;

  @Column({ nullable: true })
  camera: Array<string>;

  @Column({ nullable: true })
  battery: Array<string>;
}
