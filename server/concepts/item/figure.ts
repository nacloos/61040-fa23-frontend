import { ObjectId } from "mongodb";

import { Config, Image, Note } from "../../app";
import DocCollection, { BaseDoc } from "../../framework/doc";
import { NotFoundError, BadValuesError } from "../errors";



export interface FigureDoc extends BaseDoc {
    image: ObjectId
    config: ObjectId
    note: ObjectId
}
export type FigureUpdateType = {image: string, config: string, note: string}


export default class FigureConcept {
    public readonly figures: DocCollection<FigureDoc>;

    constructor() {
        this.figures = new DocCollection<FigureDoc>("figures");
    }

    async create(image: ObjectId, config: ObjectId, note: ObjectId): Promise<ObjectId> {
        const _id = await this.figures.createOne({ image, config, note });
        return _id;
    }

    async getItem(_id: ObjectId) {
        const fig = await this.figures.readOne({ _id });
        if (!fig) {
          throw new NotFoundError(`Figure ${_id} does not exist!`);
        }
        const {image, config, note} = fig;
        return {
            image: await Image.getItem(image),
            config: await Config.getItem(config),
            note: await Note.getItem(note)
        }
    }

    async update(_id: ObjectId, update: Partial<FigureUpdateType>) {
        const fig = await this.figures.readOne({ _id });
        if (!fig) {
            throw new NotFoundError(`Figure ${_id} does not exist!`);
        }
        // update subitems
        if (update.image) {
            console.log(update.image);
            await Image.update(fig.image, {url: update.image});
        }
        if (update.config) {
            await Config.update(fig.config, {content: update.config});
        }
        if (update.note) {
            await Note.update(fig.note, {content: update.note});
        }

        // await this.figures.updateOne({ _id }, update);
        return { msg: "Figure successfully updated!" };
    }
 
    async delete(_id: ObjectId) {
        const fig = await this.figures.readOne({ _id });
        if (fig === null) {
            throw new NotFoundError(`Figure ${_id} does not exist!`);
        }
        const {image, config, note} = fig;
        await Image.delete(image);
        await Config.delete(config);
        await Note.delete(note);

        await this.figures.deleteOne({ _id });
        return { msg: "Figure deleted successfully!" };
    }

    async deleteAll() {
        await this.figures.deleteMany({});
        return { msg: "All figures deleted successfully!" };
    }

    async search(user: ObjectId, query: String) {
        if (typeof query !== "string") {
            throw new BadValuesError("Query must be a string");
        }
        if (!query) {
            return [];
        }
        const items = ["apple", "banana", "orange", "pear"];
        return items.filter((item) => {
            return item.toLowerCase().includes(query.toLowerCase());
        });
    }
}


