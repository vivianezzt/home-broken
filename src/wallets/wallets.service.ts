import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { Wallet } from './entities/wallet.entity';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Asset } from '../assets/entities/asset.entity';
import { WalletAsset } from './entities/wallet-assets.entity';
// import { UpdateWalletDto } from './dto/update-wallet.dto';

@Injectable()
export class WalletsService {
  constructor(
    @InjectModel(Wallet.name) private walletSchema: Model<Wallet>,
    @InjectModel(WalletAsset.name)
    private walletAssetSchema: Model<WalletAsset>,
    @InjectConnection() private connection: mongoose.Connection,
  ) {}

  create(createWalletDto: CreateWalletDto) {
    return this.walletSchema.create(createWalletDto);
  }

  findAll() {
    return this.walletSchema.find();
  }

  findOne(id: string) {
    return this.walletSchema.findById(id).populate([
      {
        path: 'assets', //walletasset
        populate: ['asset'],
      },
    ]) as Promise<
      (Wallet & { assets: (WalletAsset & { asset: Asset })[] }) | null
    >;
  }

  async createWalletAsset(data: { wallet: string; asset: string; shares: number }) {
    const session = await this.connection.startSession();
    await session.startTransaction();
    try {
      const docs = await this.walletAssetSchema.create(
        [
          {
            wallet: data.wallet,
            asset: data.asset,
            shares: data.shares,
          },
        ],
        { session },
      );
      const walletAsset = docs[0];
      await this.walletSchema.updateOne(
        { _id: data.wallet },
        { $push: { assets: new mongoose.Types.ObjectId(walletAsset._id) } }, // Correção aqui
        { session },
      );
      await session.commitTransaction();
      return walletAsset;
    } catch (e) {
      console.error(e);
      await session.abortTransaction();
      throw e;
    } finally {
      await session.endSession();
    }
  }
}
   // update(id: number, updateWalletDto: UpdateWalletDto) {
  //   return `This action updates a #${id} wallet`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} wallet`;
  // }
