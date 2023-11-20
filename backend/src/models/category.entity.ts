import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('category')
export class CategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  categoryId: string;

  @Column({
    nullable: false,
    length: 150,
    unique: true,
  })
  name: string;

  @Column({
    nullable: true,
    length: 255,
  })
  description: string;
}
