import { Module } from '@nestjs/common';
import { CsvCheckService } from './service/csv-check.service';
import { CsvCheckController } from './controller/csv-check.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Catalog, CatalogSchema } from '../catalog/schemas/catalog.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Catalog.name, schema: CatalogSchema, collection: 'catalog' },
    ]),
  ],
  controllers: [CsvCheckController],
  providers: [CsvCheckService]
})
export class CsvCheckModule {
}
