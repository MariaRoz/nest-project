import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Message } from '../messages/messages.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  username: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'datetime', default: 'now()'})
  createdAt: Date;

  @Column({ type: 'datetime', default: 'now()'})
  updatedAt: Date;

  @OneToMany(type => Message, messages => messages.author)
  messages: Message[];


  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  sanitize() {
   delete this.password;
  }
}
