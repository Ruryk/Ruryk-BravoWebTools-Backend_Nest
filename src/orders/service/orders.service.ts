import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Orders, OrdersDocument } from '../schemas/orders.schema';
import { OrdersDto } from '../dto/orders.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Orders.name)
    private ordersModel: Model<OrdersDocument>,
  ) {
  }

  async getAllOrders(): Promise<OrdersDto[]> {
    return this.ordersModel.find({});
  }

  async getOrderById(id: string): Promise<OrdersDto[]> {
    return this.ordersModel.find({ orderNo: Number(id) });
  }

  async confirmOrders(code: number): Promise<boolean> {
    await this.ordersModel.updateOne({ orderNo: code }, { status: true });
    return this.ordersModel.exists({ orderNo: code, status: true });
  }
}
