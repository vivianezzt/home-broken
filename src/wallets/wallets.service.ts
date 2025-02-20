
import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Wallet } from './entities/wallet.entity';
import { Model } from 'mongoose';
import { WalletAsset } from './entities/wallet-assets.entity';
// import { UpdateWalletDto } from './dto/update-wallet.dto';

@Injectable()
export class WalletsService {
  constructor(@InjectModel(Wallet.name) private walletSchema: Model<Wallet>,
  @InjectModel(WalletAsset.name) private walletAssetSchema: Model<WalletAsset>) {}

  async create(createWalletDto: CreateWalletDto): Promise<Wallet> {
    return this.walletSchema.create(createWalletDto);
  }

  async findAll(): Promise<Wallet[]> {
    return this.walletSchema.find();
  }

  async findOne(id: string): Promise<Wallet | null> {
    return this.walletSchema.findById(id);
  }

  createWalletAsset(data: {wallet: string, asset: string, shares: number}) {
    return this.walletAssetSchema.create({
      wallet: data.wallet,
      asset: data.asset,
      shares: data.shares
    });
  }
   // update(id: number, updateWalletDto: UpdateWalletDto) {
  //   return `This action updates a #${id} wallet`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} wallet`;
  // }
}