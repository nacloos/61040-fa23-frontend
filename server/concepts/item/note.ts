import { ObjectId } from "mongodb";

import DocCollection, { BaseDoc } from "../../framework/doc";
import { NotFoundError, BadValuesError } from "../errors";


export interface NoteDoc extends BaseDoc {
    content: string
}

export default class NoteConcept {
    public readonly notes = new DocCollection<NoteDoc>("notes");

    async create(content: string): Promise<ObjectId> {
        const _id = this.notes.createOne({ content });
        return _id;
    }

    async getItem(_id: ObjectId) {
        const item = await this.notes.readOne({ _id });
        if (!item) {
          throw new NotFoundError(`Note ${_id} does not exist!`);
        }
        return item
    }

    async update(_id: ObjectId, update: Partial<NoteDoc>) {
        if (!update) {
            return { msg: "No updates were made." };
        }
        await this.getItem(_id)  // make sure the note exists
        await this.notes.updateOne({ _id }, update);
        return { msg: "Note successfully updated!" };
    }
 
    async delete(_id: ObjectId) {
        await this.getItem(_id)  // make sure the note exists
        await this.notes.deleteOne({ _id });
        return { msg: "Note deleted successfully!" };
    }

    async deleteAll() {
        await this.notes.deleteMany({});
        return { msg: "All notes deleted successfully!" };
    }
}


