import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { nanoid } from 'nanoid';

@Entity({ name: 'rooms' })
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: nanoid(), unique: true, nullable: false })
  nanoid: string;

  @Column({ unique: true, nullable: false })
  name: string;

  @ManyToOne(() => User, (user) => user.id)
  creator: User;

  @Column({
    nullable: false,
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
