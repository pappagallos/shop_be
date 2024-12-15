import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Purchase extends Document {
  @Prop({ type: Types.ObjectId })
  productId: Types.ObjectId;

  @Prop({ type: Types.ObjectId })
  buyerId: Types.ObjectId;

  @Prop({ type: Types.ObjectId })
  sellerId: Types.ObjectId;

  @Prop({ required: true })
  price: number;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const PurchaseSchema = SchemaFactory.createForClass(Purchase);
