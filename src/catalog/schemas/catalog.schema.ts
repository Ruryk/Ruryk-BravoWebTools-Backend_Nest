import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UnitsDto } from '../dto/units.dto';

export type CatalogDocument = Catalog & Document;

@Schema()
export class Catalog {
  @Prop() _id: string;
  @Prop() code: string;
  @Prop() name: string;
  @Prop() units: UnitsDto[];
  @Prop() availability: string;
  @Prop() actions: string;
  @Prop() exclusively: string[];
  @Prop() replacementProducts: string[];
}

export const CatalogSchema = SchemaFactory.createForClass(Catalog);
