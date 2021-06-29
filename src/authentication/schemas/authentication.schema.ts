import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuthenticationDocument = Authentication & Document;

@Schema()
export class Authentication {
  @Prop() id: number;
  @Prop() email: string;
  @Prop() token: string;
  @Prop() code: string;
}

export const AuthenticationSchema =
  SchemaFactory.createForClass(Authentication);
