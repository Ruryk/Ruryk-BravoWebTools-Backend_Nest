import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { CatalogModule } from './catalog/catalog.module';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { CsvCheckModule } from './csv-check/csv-check.module';

const uri =
  'mongodb+srv://vlad:222333@cluster0.4n3z4.mongodb.net/bravoWebTools?retryWrites=true&w=majority';

@Module({
  imports: [
    AuthenticationModule,
    MongooseModule.forRoot(uri, { useFindAndModify: false }),
    CatalogModule,
    CustomersModule,
    OrdersModule,
    CsvCheckModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
