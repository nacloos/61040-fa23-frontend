import { URL } from "url";
import { ObjectId } from "mongodb";

import DocCollection, { BaseDoc } from "../../framework/doc";
import { BadValuesError, NotFoundError } from "../errors";


export interface ImageDoc extends BaseDoc {
    url: string
}

export default class ImageConcept {
    public readonly images = new DocCollection<ImageDoc>("images");


    async create(url: string) {
        if (!this.isValidUrl(url)) {
            throw new BadValuesError("Invalid URL");
        }
        
        const _id = await this.images.createOne({ url });
        return _id;
    }

    async getItem(_id: ObjectId) {
        const item = await this.images.readOne({ _id });
        if (!item) {
          throw new NotFoundError(`Image ${_id} does not exist!`);
        }
        return item
    }

    async update(_id: ObjectId, update: Partial<ImageDoc>) {
        if (update.url && !this.isValidUrl(update.url)) {
            throw new BadValuesError("Invalid URL");
        }
        
        await this.images.updateOne({ _id }, update);
        return { msg: "Image successfully updated!" };
    }

    private isValidUrl(url: string) {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    }
 
    async delete(_id: ObjectId) {
        await this.images.deleteOne({ _id });
        return { msg: "Image deleted successfully!" };
    }

    async deleteAll() {
        await this.images.deleteMany({});
        return { msg: "All images deleted successfully!" };
    }

}


