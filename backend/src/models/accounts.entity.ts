import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { CategoryEntity } from './category.entity';

@Entity('accounts')
export class AccountEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  accountId: string;

  @Column({
    nullable: false,
    length: 150,
  })
  @Index('acnttype_idx')
  accountType: string;

  @Column({
    nullable: false,
    type: 'float',
  })
  amount: number;

  @Column({
    nullable: false,
  })
  date: Date;

  @Column({
    nullable: false,
    length: 255,
  })
  description: string;

  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'categoryId' })
  category: CategoryEntity;
}
