import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { CustomersService } from '../service/customers.service';
import { CustomersDto } from '../dto/customers.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {
  }

  @Get()
  getAllCustomers(): Promise<CustomersDto[]> {
    return this.customersService.getAllCustomers();
  }

  @Post('new')
  addNewCatalog(@Body() dataCustomers: { data: CustomersDto }): Promise<boolean> {
    return this.customersService.addNewCustomers(dataCustomers.data);
  }

  @Post('edit')
  editCatalog(
    @Body() dataCustomers: { data: CustomersDto; code: string },
  ): Promise<boolean> {
    return this.customersService.editCustomers(
      dataCustomers.data,
      dataCustomers.code,
    );
  }
}
