import { EmployeeProjectsEntity } from './employee-projects.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'tbl_projects',
})
export class ProjectEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ unique: true })
  slug?: string;

  @OneToMany(() => EmployeeProjectsEntity, ep => ep.employee, {
    onDelete: 'CASCADE',
  })
  employees: EmployeeProjectsEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
