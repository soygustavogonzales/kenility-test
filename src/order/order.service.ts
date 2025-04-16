import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from '../schemas/order.schema';
import { CreateOrderDto } from './dto/createOrder.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const createdOrder = new this.orderModel(createOrderDto);
    return createdOrder.save();
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const updatedOrder = await this.orderModel.findByIdAndUpdate(id, updateOrderDto, { new: true }).exec();
    if (!updatedOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return updatedOrder;
  }

  async getTotalSold(fix_period: string): Promise<number> {
    const now = new Date();
    let startDate: Date;

    switch (fix_period) {
      case 'last month':
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        break;
      case 'last week':
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 7);
        break;
      case 'last day':
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 1);
        break;
      case 'last two months':
        startDate = new Date(now.getFullYear(), now.getMonth() - 2, 1);
        break;
      case 'last year':
        startDate = new Date(now.getFullYear() - 1, 0, 1);
        break;
      default:
        throw new Error('Invalid period');
    }

    const orders = await this.orderModel.find({ createdAt: { $gte: startDate } }).exec();
    return orders.reduce((total, order) => total + order.total, 0);
  }

  async getHighestAmountOrder(): Promise<Order> {
    const highestOrder = await this.orderModel.findOne().sort({ total: -1 }).exec();
    if (!highestOrder) {
      throw new NotFoundException('No orders found');
    }
    return highestOrder;
  }
}
