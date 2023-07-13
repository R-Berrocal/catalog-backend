import { Prop } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CoreDocument = HydratedDocument<CoreSchema>;

export abstract class CoreSchema {
  @Prop({ default: true })
  active: boolean;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  constructor(body = {}) {
    Object.assign(this, body);
  }
}
