import mongoose, { Document, Model, Schema } from 'mongoose';
import { User as UserModelType, DocumentType, UserDocument } from '../types/Models';
import {UserSchema} from '../schema/Schema';


export class UserModel extends Model<UserDocument> {
 
    private model: Model<UserDocument>;

    constructor() {
        super();
        // Create a new Mongoose model for user documents
        this.model = mongoose.model<UserDocument>('Courses', UserSchema);
    }

    public async create(user: UserModelType): Promise<UserDocument> {
        // Create a new document in the Users collection
        const created = await this.model.create(user);
        return created;
    }
}



export default new UserModel()

