import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema({
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class Reservation {
    @Prop({ type: SchemaTypes.ObjectId })
    client: Types.ObjectId;

    @Prop({ type: SchemaTypes.ObjectId })
    user: Types.ObjectId;

    @Prop({ type: SchemaTypes.ObjectId })
    design_element: Types.ObjectId;

    @Prop({ type: Date })
    date_start: Date;

    @Prop({ type: Date, default: null })
    date_end: Date;

    @Prop({ type: String, enum: ['reserved', 'matched', 'finished', 'cancelled', 'rejected'], default: 'reserved' })
    status: string;

    @Prop({ type: Boolean, default: false })
    closed: boolean;

    @Prop({ type: Date, default: null })
    match_date: Date;

    @Prop({ type: Date, default: null })
    closed_at: Date;
}

export const defaultFields = {
    client: 1,
    user: 1,
    design_element: 1,
    date_start: 1,
    date_end: 1,
    status: 1,
    closed: 1,
    match_date: 1,
    closed_at: 1,
};

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
