import {
  AfterInsert,
  Column,
  Entity,
  FindConditions,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm';
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ default: '' })
  avatar: string;

  @AfterInsert()
  setAvatar() {
    this.avatar = `initials/${this.name}.svg`;
  }
}
