// app/models/Item.ts
import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IItem extends Document {
  name: string;
  description: string;
}

const ItemSchema: Schema<IItem> = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const Item: Model<IItem> = mongoose.models.Item || mongoose.model<IItem>('Item', ItemSchema);

export default Item;
