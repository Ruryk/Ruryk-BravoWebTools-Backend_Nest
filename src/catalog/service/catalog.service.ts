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

  async addNewCatalog(data: CatalogDto): Promise<boolean> {
    await this.catalogModel.create({ ...data });
    return this.catalogModel.exists({ code: data.code });
  }

  async editCatalog(data: CatalogDto, code: string): Promise<boolean> {
    await this.catalogModel.updateOne({ code: code }, { ...data });
    return this.catalogModel.exists({ code: data.code });
  }

  async deleteCatalog(code: string): Promise<boolean> {
    await this.catalogModel.findOneAndDelete({ code });
    return this.catalogModel.exists({ code });
  }
}
