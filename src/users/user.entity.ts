import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { MessageEntity } from '../messages/messages.entity';
import { MessageDto } from '../messages/messages.dto';

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

  @OneToMany(type => MessageEntity, messages => messages.author)
  messages: MessageDto[];


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
