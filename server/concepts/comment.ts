import { ObjectId } from "mongodb";
import DocCollection, { BaseDoc } from "../framework/doc";


export interface CommentDoc extends BaseDoc {
    content: string
    user: ObjectId
    item: ObjectId
}

export default class CommentConcept {
    public readonly comments;

    constructor(collectionName: string) {
        this.comments = new DocCollection<CommentDoc>(collectionName);
    }

    async create(user: ObjectId, item: ObjectId, content: string): Promise<ObjectId> {
        const _id = await this.comments.createOne({ content, user, item });
        return _id;
    }

    async getComments(item: ObjectId) {
        const comments = await this.comments.readMany({ item });
        return comments;
    }
}
