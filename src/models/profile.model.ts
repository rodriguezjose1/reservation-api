import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class Profile {
    @Prop({ type: String })
    code: string;

    @Prop({ type: String })
    name: string;
}

export const defaultFields = {
    code: 1,
    name: 1,
};

export const ProfileSchema = SchemaFactory.createForClass(Profile);
