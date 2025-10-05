import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Index,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'divisions' })
@Index(['name'], { unique: true })
export class Division {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 45 })
  name: string;

  @Column({ type: 'int', name: 'parent_id', nullable: true })
  parentId: number | null;

  @ManyToOne(() => Division, (d) => d.children, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'parent_id' })
  parent?: Division | null;

  @OneToMany(() => Division, (d) => d.parent)
  children?: Division[];

  @Column({ type: 'varchar', length: 120, name: 'ambassador_full_name', nullable: true })
  ambassadorFullName?: string | null;

  @Column({ type: 'int', unsigned: true })
  level: number;

  @Column({ type: 'int', unsigned: true, name: 'collaborators_count' })
  collaboratorsCount: number; 

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
