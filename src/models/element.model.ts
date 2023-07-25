import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class Element {
    @Prop({ type: String })
    code: string;

    @Prop({ type: String })
    name: string;

    @Prop({ type: String })
    icon: string;

    @Prop({ type: Number })
    default_height: number;

    @Prop({ type: Number })
    default_width: number;
}

export const defaultFields = {};

export const ElementSchema = SchemaFactory.createForClass(Element);
