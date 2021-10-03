import { ManyToOne, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'messages' })
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  sender: Omit<User, 'password' | 'email'>;

  @ManyToOne(() => User, (user) => user.id)
  receiver: Omit<User, 'password' | 'email'>;

  @Column({ nullable: false })
  content: string;

  @Column({
    nullable: false,
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  sentAt: Date;
}
