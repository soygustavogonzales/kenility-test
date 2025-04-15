import { Controller, Post, Body, Put, Param, Get, Query, UseGuards } from '@nestjs/common';
import { OrdersService } from './order.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';
import { Order } from '../schemas/order.schema';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('orders')
@ApiBearerAuth()
@Controller('orders')
@UseGuards(AuthGuard('jwt'))
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'The order has been successfully created.', type: Order })
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.create(createOrderDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing order' })
  @ApiResponse({ status: 200, description: 'The order has been successfully updated.', type: Order })
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto): Promise<Order> {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Get('sales')
  @ApiOperation({ summary: 'Get total sales for a specified period' })
  @ApiResponse({ status: 200, description: 'Total sales amount for the specified period.', type: Number })
  async getTotalSold(@Query('fix_period') fix_period: string): Promise<number> {
    return this.ordersService.getTotalSold(fix_period);
  }

  @Get('highest-amount-order')
  @ApiOperation({ summary: 'Get the order with the highest amount' })
  @ApiResponse({ status: 200, description: 'The order with the highest amount.', type: Order })
  async getHighestAmountOrder(): Promise<Order> {
    return this.ordersService.getHighestAmountOrder();
  }
}
