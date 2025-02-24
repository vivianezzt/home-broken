import { Injectable } from '@nestjs/common';
import { CreateOrdeDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderStatus, OrderTypes } from './entities/order.entity';
import { Model } from 'mongoose';
// import { UpdateOrdeDto } from './dto/update-orde.dto';

@Injectable()
export class OrderService {
    constructor(@InjectModel(Order.name)
    private orderSchema: Model<Order>) { }

    create(createOrdeDto: CreateOrdeDto) {
        return this.orderSchema.create({
            walletId: createOrdeDto.walletId,
            assetId: createOrdeDto.assetId,
            shares: createOrdeDto.shares,
            partial: createOrdeDto.shares,
            price: createOrdeDto.price,
            type: createOrdeDto.type as OrderTypes,
            status: OrderStatus.PENDING,
        });
    }

    findAll(filter: { walletId: string }) {
        return this.orderSchema.find({ walletId: filter.walletId });
        //.populate(['asset', 'trade'])
    }

    findOne(id: string) {
        return this.orderSchema.findById(id);
        //.populate(['asset', 'trade'])
    }
   // update(id: number, updateOrdeDto: UpdateOrdeDto) {
  //   return `This action updates a #${id} orde`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} orde`;
  // }
}