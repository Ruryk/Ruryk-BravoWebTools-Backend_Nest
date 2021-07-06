import { Injectable } from '@nestjs/common';
import * as csv from 'csv-parser';
import * as fs from 'fs';
import { InjectModel } from '@nestjs/mongoose';
import { Catalog, CatalogDocument } from '../../catalog/schemas/catalog.schema';
import { Model } from 'mongoose';
import { CatalogDto } from '../../catalog/dto/catalog.dto';

const headersValidation = {
  code: '',
  name: '',
  units: [],
  availability: '',
  actions: '',
  exclusively: [],
  replacementProducts: [],
};

@Injectable()
export class CsvCheckService {

  public readFile;

  constructor(
    @InjectModel(Catalog.name)
    private catalogModel: Model<CatalogDocument>,
  ) {
  }

  parse(file: any) {
    const result = [];
    const path = __dirname + '/uploads/check.csv';
    return new Promise((resolve, reject) => {
      fs.createReadStream(path)
        .pipe(csv({ separator: ',' }))
        .on('data', (data) => result.push(data))
        .on('end', () => {
          const filesArr = [];
          result.forEach((file) => {
            const item = Object.keys(file).reduce((acc, key) => {
              switch (key.trim()) {
                case 'units':
                  acc[key.trim()] = JSON.parse(file[key.trim()]);
                  break;
                case 'exclusively':
                  acc[key.trim()] = JSON.parse(file[key.trim()]);
                  break;
                case 'replacementProducts':
                  acc[key.trim()] = JSON.parse(file[key.trim()]);
                  break;
                default:
                  acc[key.trim()] = file[key];
                  break;
              }
              return acc;
            }, {} as any);
            filesArr.push(item);
          });
          const errors = this.csvValidation(filesArr);
          const validState = errors.every((item) =>
            Object.keys(item).every((key) => item[key] === true),
          );
          if (validState) {
            this.readFile = filesArr;
          }
          resolve({ status: validState, errors });
        });
    });
  }

  async replaceCatalog(): Promise<any> {
    await this.catalogModel.deleteMany({}).exec();
    await this.catalogModel.insertMany([...this.readFile]);
    const res = await this.catalogModel.find({}).exec();
    return new Promise((resolve, reject) => resolve(res.length > 0));
  }

  csvValidation(files): any {
    const validArray = files.map((file) => {
      return Object.keys(file).reduce((res, key) => {
        res[key] =
          typeof file[key] === typeof headersValidation[key] ||
          'Is not valid. Error Type';
        return res;
      }, {} as any);
    });
    return validArray;
  }
}
