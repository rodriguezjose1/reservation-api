import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema({
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class Design {
    @Prop({ type: SchemaTypes.ObjectId })
    company: Types.ObjectId;

    @Prop({ type: String })
    name: string;

    @Prop({ type: String })
    description: string;
}

export const defaultFields = {};

export const DesignSchema = SchemaFactory.createForClass(Design);
