import { ManyToOne, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'messages' })
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
  })
  sender: User;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
  })
  receiver: User;

  @Column({ nullable: false })
  content: string;

  @Column({
    nullable: false,
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  sentAt: Date;
}
