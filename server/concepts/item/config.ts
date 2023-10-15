import { ObjectId } from "mongodb";

import DocCollection, { BaseDoc } from "../../framework/doc";
import { BadValuesError, NotFoundError } from "../errors";


export interface ConfigDoc extends BaseDoc {
    content: string
}

export default class ConfigConcept {
    public readonly configs = new DocCollection<ConfigDoc>("configs");

    async create(content: string): Promise<ObjectId> {
        this.validateConfigContent(content);
        const _id = this.configs.createOne({ content });
        return _id;
    }

    private validateConfigContent(content: string) {
        if (!content || content.trim() === "") {
            throw new BadValuesError("Config content cannot be empty!");
        }
    }
    
    async getItem(_id: ObjectId) {
        const item = await this.configs.readOne({ _id });
        if (!item) {
          throw new NotFoundError(`Config ${_id} does not exist!`);
        }
        return item
    }

    async update(_id: ObjectId, update: Partial<ConfigDoc>) {
        if (!update) {
            return { msg: "No updates were made." };
        }
        if (update.content) {
            this.validateConfigContent(update.content);
        }
        await this.configs.updateOne({ _id }, update);
        return { msg: "Config successfully updated!" };
    }
 
    async delete(_id: ObjectId) {
        await this.getItem(_id)  // make sure the note exists
        await this.configs.deleteOne({ _id });
        return { msg: "Config deleted successfully!" };
    }

    async deleteAll() {
        await this.configs.deleteMany({});
        return { msg: "All configs deleted successfully!" };
    }
}


