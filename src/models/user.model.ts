import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema({ _id: false })
class Phone {
    @Prop()
    country_code_number: string;

    @Prop()
    country_code_string: string;

    @Prop()
    number: string;
}

const PhoneSchema = SchemaFactory.createForClass(Phone);

class IPhone {
    country_code_number: string;
    country_code_string: string;
    number: string;
}

@Schema({
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class User {
    @Prop({ type: SchemaTypes.ObjectId, ref: 'Profile' })
    profile: Types.ObjectId;

    @Prop({ type: String })
    name: string;

    @Prop({ type: String })
    lastname: string;

    @Prop({ type: String })
    username: string;

    @Prop({ type: String })
    email: string;

    @Prop({ type: PhoneSchema })
    phone: IPhone;

    @Prop()
    password_hash: string;
}

export const defaultFields = {
    profile: 1,
    name: 1,
    lastname: 1,
    username: 1,
    email: 1,
    phone: 1,
};

export const UserSchema = SchemaFactory.createForClass(User);
