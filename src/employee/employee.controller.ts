import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Body,
  Param,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeEntity } from '../entities/employee.entity';
import { EmployeeDto, UpdateEmployeeDto } from '../dtos/employee.dto';
import { RESPONSE_MESSAGES } from '../constants/message.constants';
import { EmployeePipe } from 'src/pipes/employee/employee.pipe';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get('/')
  async Employee() {
    const employees: EmployeeEntity[] =
      await this.employeeService.getEmployees();
    return {
      data: employees,
    };
  }
  @Post('/')
  async CreateEmployee(@Body(EmployeePipe) employeeDto: EmployeeDto) {
    const employee: EmployeeEntity = await this.employeeService.create(
      employeeDto,
    );

    return {
      message: RESPONSE_MESSAGES.CRUD.CREATE.SUCCESS,
      data: employee,
    };
  }

  @Put('/:id')
  async UpdateEmployee(
    @Param(EmployeePipe) { id },
    @Body() employeeDto: UpdateEmployeeDto,
  ) {
    const employee: EmployeeEntity = await this.employeeService.update(
      id,
      employeeDto,
    );

    return {
      message: RESPONSE_MESSAGES.CRUD.UPDATE.SUCCESS,
      data: employee,
    };
  }

  @Delete('/:id')
  async DeleteEmployee(@Param() { id }) {
    const result = await this.employeeService.delete(id);
    return {
      message: RESPONSE_MESSAGES.CRUD.DELETE.SUCCESS,
      data: { affected: result },
    };
  }
}
