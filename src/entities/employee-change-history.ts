import { Entity } from 'typeorm';
import { EmployeeEntity } from './employee.entity';

@Entity({
  name: 'tbl_employee_change_history',
})
export class EmployeeChangeHistory {
  // id:string;
  // employee:EmployeeEntity;
  // @Column("simple-json")
  // change:{}
}
