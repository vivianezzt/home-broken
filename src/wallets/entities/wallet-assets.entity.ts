import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import  mongoose, { HydratedDocument } from "mongoose";
import crypto from "crypto";
import { Wallet } from "./wallet.entity";
import { Asset } from "src/assets/entities/asset.entity";


export type WalletDocument = HydratedDocument<WalletAsset>;

@Schema({timestamps: true})
export class WalletAsset {
    @Prop({default: () => crypto.randomUUID()})
    _id: string;

    @Prop({types: mongoose.Schema.Types.Int32})
    shares: number;

    @Prop({type: String, ref: Wallet.name})
    wallet: WalletDocument | string;

    @Prop({type: String, ref: Asset.name})
    asset: WalletDocument | string;

    createdAt!: Date;
    updatedAt!: Date;
}

export const WalletAssetSchema = SchemaFactory.createForClass(WalletAsset);
WalletAssetSchema.index({wallet: 1, asset: 1}, {unique: true});