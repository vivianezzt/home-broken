import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';

import { CreateOrdeDto } from './dto/create-order.dto';
import { OrderService } from './orders.service';
// import { UpdateOrdeDto } from './dto/update-orde.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrderService) {}

  @Post()
  create(@Body() createOrdeDto: CreateOrdeDto) {
    return this.ordersService.create(createOrdeDto);
  }

  @Get()
  findAll(@Query('walletId') walletId: string) {
    return this.ordersService.findAll({ walletId });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOrdeDto: UpdateOrdeDto) {
  //   return this.ordesService.update(+id, updateOrdeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.ordesService.remove(+id);
  // }
}
