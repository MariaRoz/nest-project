import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Messages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  message: string;
}
