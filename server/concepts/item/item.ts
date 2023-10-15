import { Filter, ObjectId } from "mongodb";

import DocCollection, { BaseDoc } from "../../framework/doc";
import { NotAllowedError, NotFoundError } from "../errors";


export interface BaseItemDoc extends BaseDoc {
    type: string;
}


// TODO: use a general item concept?
export default class ItemConcept {
    getItem(itemId: ObjectId) {
      throw new Error("Method not implemented.");
    }
    public readonly items;

    constructor(schema: BaseDoc, collectionName: string) {
        type ItemDoc = BaseItemDoc;
        this.items = new DocCollection<ItemDoc>(collectionName);
    }


}