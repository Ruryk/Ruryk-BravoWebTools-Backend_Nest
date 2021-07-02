import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Orders, OrdersSchema } from './schemas/orders.schema';
import { OrdersService } from './service/orders.service';
import { OrdersController } from './controller/orders.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Orders.name, schema: OrdersSchema, collection: 'orders' },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
