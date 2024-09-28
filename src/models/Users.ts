import mongoose, { Document, Schema } from 'mongoose';
export interface Users {
    userId: number;
    email: string;
    username: string;
    password: string;
}

const userSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

export default mongoose.model<Users>('User', userSchema);