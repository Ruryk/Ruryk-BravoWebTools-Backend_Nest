import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customers, CustomersDocument } from '../schemas/customers.schema';
import { CustomersDto } from '../dto/customers.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customers.name)
    private customersModel: Model<CustomersDocument>,
  ) {}

  async getAllCustomers(): Promise<CustomersDto[]> {
    return this.customersModel.find({});
  }

  async addNewCustomers(data: CustomersDto): Promise<boolean> {
    await this.customersModel.create({ ...data });
    return this.customersModel.exists({ customerNo: data.customerNo });
  }

  async editCustomers(data: CustomersDto, code: string): Promise<boolean> {
    await this.customersModel.updateOne({ customerNo: code }, { ...data });
    return this.customersModel.exists({ customerNo: data.customerNo });
  }
}
