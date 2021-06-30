import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CatalogController } from './controller/catalog.controller';
import { CatalogService } from './service/catalog.service';
import {
  Catalog,
  CatalogSchema,
} from './schemas/catalog.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Catalog.name, schema: CatalogSchema, collection: 'catalog' },
    ]),
  ],
  controllers: [CatalogController],
  providers: [CatalogService],
})
export class CatalogModule {
}
