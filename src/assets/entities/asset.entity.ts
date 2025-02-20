import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import crypto from "crypto";

export type AssetDocument = HydratedDocument<Asset>;

@Schema({timestamps: true})
export class Asset {
    @Prop({default: () => crypto.randomUUID()})
    _id: string;

    @Prop({unique: true, index: true })
    name: string;

    @Prop({unique: true, index: true })
    symbol: string;

    @Prop()
    price: number;

    @Prop()
    image: string;

    createdAt!: Date;
    updatedAt!: Date;
}

export const AssetSchema = SchemaFactory.createForClass(Asset);