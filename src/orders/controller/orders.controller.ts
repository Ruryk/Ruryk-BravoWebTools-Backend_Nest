import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { OrdersService } from '../service/orders.service';
import { OrdersDto } from '../dto/orders.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {
  }

  @Get()
  getAllOrders(): Promise<OrdersDto[]> {
    return this.ordersService.getAllOrders();
  }

  @Get(':id')
  getOrderById(@Param() id: { id: string }): Promise<OrdersDto[]> {
    return this.ordersService.getOrderById(id.id);
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
