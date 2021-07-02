import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CustomersController } from './controller/customers.controller';
import { CustomersService } from './service/customers.service';
import { Customers, CustomersSchema } from './schemas/customers.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Customers.name, schema: CustomersSchema, collection: 'customers' },
    ]),
  ],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
