import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema({
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class DesignElement {
    @Prop({ type: SchemaTypes.ObjectId })
    company: Types.ObjectId;

    @Prop({ type: SchemaTypes.ObjectId })
    design: Types.ObjectId;

    @Prop({ type: SchemaTypes.ObjectId })
    element: Types.ObjectId;

    @Prop({ type: SchemaTypes.ObjectId, default: null })
    parent_element: Types.ObjectId;

    @Prop({ type: [Number] })
    coordinates: number[];

    @Prop({ type: String })
    height: string;

    @Prop({ type: String })
    width: string;
}

export const defaultFields = {
    company: 1,
    design: 1,
    element: 1,
    parent_element: 1,
    coordinates: 1,
    height: 1,
    width: 1,
};

const DesignElementSchema = SchemaFactory.createForClass(DesignElement);

DesignElementSchema.virtual('reservations', {
    ref: 'Reservation',
    localField: '_id',
    foreignField: 'design_element',
    match: { closed: false }, // match option with basic query selector
});

export { DesignElementSchema };
