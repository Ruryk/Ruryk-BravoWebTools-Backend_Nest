import { Body, Controller, Get, Post } from '@nestjs/common';

import { OrdersService } from '../service/orders.service';
import { OrdersDto } from '../dto/orders.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {
  }

  @Get()
  getAllCustomers(): Promise<OrdersDto[]> {
    return this.ordersService.getAllOrders();
  }

  @Post('confirm')
  editCatalog(
    @Body() dataOrders: { code: string },
  ): Promise<boolean> {
    return this.ordersService.confirmOrders(
      Number(dataOrders.code),
    );
  }
}
