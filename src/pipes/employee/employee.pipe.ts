import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { UpdateEmployeeDto } from 'src/dtos/employee.dto';
import { EmployeeService } from '../../employee/employee.service';

@Injectable()
export class EmployeePipe implements PipeTransform {
  constructor(private readonly employeeService: EmployeeService) {}
  async transform(value: any, metadata: ArgumentMetadata) {
    const employee: UpdateEmployeeDto =
      await this.employeeService.getRequiredData(value);
    return employee;
  }
}
