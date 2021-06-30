import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { CatalogModule } from './catalog/catalog.module';

const uri = 'mongodb+srv://vlad:222333@cluster0.4n3z4.mongodb.net/bravoWebTools?retryWrites=true&w=majority';

@Module({
  imports: [
    AuthenticationModule,
    MongooseModule.forRoot(uri, { useFindAndModify: false }),
    CatalogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
