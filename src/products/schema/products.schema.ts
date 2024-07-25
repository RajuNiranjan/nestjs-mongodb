import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Products {
  @Prop()
  title: string;

  @Prop()
  desc: string;

  @Prop()
  cost: number;

  @Prop()
  offCost: number;

  @Prop()
  img: string[];
}

export const ProductsSchema = SchemaFactory.createForClass(Products);
