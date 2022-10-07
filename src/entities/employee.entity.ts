import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DesignationEntity } from './designation.entity';
import { EmployeeProjectsEntity } from './employee-projects.entity';

@Entity({
  name: 'tbl_employee',
})
export class EmployeeEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name?: string;

  @Column()
  joiningDate?: Date;

  @Column()
  salary?: number;

  @Column({ default: false })
  hasResigned?: boolean;

  @ManyToOne(() => DesignationEntity, designation => designation.employee, {
    eager: true,
    nullable: true,
  })
  designation?: DesignationEntity;

  @OneToMany(() => EmployeeProjectsEntity, ep => ep.employee, {
    onDelete: 'CASCADE',
    eager: true,
  })
  projects?: EmployeeProjectsEntity[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  // Add this column to your entity!
  @DeleteDateColumn()
  deletedAt?: Date;
}
