import { Injectable } from '@nestjs/common';
import { CatalogDto } from '../dto/catalog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Catalog, CatalogDocument } from '../schemas/catalog.schema';

@Injectable()
export class CatalogService {
  constructor(
    @InjectModel(Catalog.name)
    private catalogModel: Model<CatalogDocument>,
  ) {
  }

  async getAllCatalog(): Promise<CatalogDto[]> {
    return this.catalogModel.find({});
  }

  async addNewCatalog(data: CatalogDto): Promise<any> {
    console.log(data);
    return this.catalogModel.insertMany([data]);
  }
}
