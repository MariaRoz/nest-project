import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '../users/user.entity';

@Entity()
export class Messages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  message: string;

  @Column({ type: 'datetime', default: 'now()'})
  createdAt: Date;

  @Column({ type: 'int', nullable: false })
  authorId: number;

  @ManyToOne(type => UserEntity, user => user.messages)
  @JoinColumn({name: 'authorId'})
  author: UserEntity;
}
