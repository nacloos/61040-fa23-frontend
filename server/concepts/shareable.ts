import { Filter, ObjectId } from "mongodb";

import DocCollection, { BaseDoc } from "../framework/doc";
import { NotAllowedError, NotFoundError } from "./errors";


export interface ShareableItemDoc extends BaseDoc {
    owner: ObjectId;
    item: ObjectId;
    // could use separate collection for collaborators
    collaborators: ObjectId[];
}


export interface AccessibleToDoc extends BaseDoc {
    user: ObjectId;
    item: ObjectId;
}


export default class ShareableConcept {
    public readonly items;
    // store the items accessible to a user (owner or collaborator)
    public readonly accessibleItems = new DocCollection<AccessibleToDoc>("accessibleItems");

    constructor(collectionName: string) {
        this.items = new DocCollection<ShareableItemDoc>(collectionName);
    }

    async add(owner: ObjectId, item: ObjectId) {
        const _id = await this.items.createOne({ owner, item, collaborators: [] });
        await this.accessibleItems.createOne({ user: owner, item: _id });
        return _id;
    }
    
    async delete(_id: ObjectId) {
        await this.items.deleteOne({ _id });
        await this.accessibleItems.deleteOne({ items: _id });
        return { msg: "Shareable item successfully deleted!" };
    }

    async deleteAll(query: Filter<ShareableItemDoc>) {
        // delete everything (useful for debugging)
        this.items.deleteMany(query);
        this.accessibleItems.deleteMany({});
        return { msg: "All items successfully deleted!" };
    }

    async addCollaborator(_id: ObjectId, collaborator: ObjectId) {
        await this.items.updateOne({ _id }, {}, { $push: { collaborators: collaborator } });
        await this.accessibleItems.createOne({ user: collaborator, item: _id });
        console.log("Add collab:", await this.accessibleItems.readMany({ user: collaborator }));
        return { msg: "Collaborator successfully added!" };
    }

    async removeCollaborator(_id: ObjectId, collaborator: ObjectId) {
        await this.items.updateOne({ _id }, {}, { $pull: { collaborators: collaborator } });
        await this.accessibleItems.deleteOne({ user: collaborator, item: _id } );
        return { msg: "Collaborator successfully removed!" };
    }

    async getItem(_id: ObjectId) {
        const item = await this.items.readOne({ _id });
        if (!item) {
          throw new NotFoundError(`Item ${_id} does not exist!`);
        }
        return item
    }

    async getItemId(_id: ObjectId) {
        // return the id of the underlying item
        const item = await this.getItem(_id);
        return item.item;
    }

    async isOwner(user: ObjectId, _id: ObjectId) {
        const item = await this.items.readOne({ _id });
        if (!item) {
            throw new NotFoundError(`Item ${_id} does not exist!`);
        }
        if (item.owner.toString() !== user.toString()) {
            throw new ItemOwnerNotMatchError(user, _id);
        }
    }
    
    async isCollaborator(user: ObjectId, _id: ObjectId) {
        const item = await this.getItem(_id);
        // TODO: more efficient way to do this? (e.g. with separate collection for collaborators)
        if (item.collaborators.includes(user)) {
          throw new ItemCollaboratorNotMatchError(user, _id);
        }
    }

    async hasAccess(user: ObjectId, item: ObjectId) {
        try {
            await this.isOwner(user, item);
        } catch (e) {
            if (e instanceof ItemOwnerNotMatchError) {
                await this.isCollaborator(user, item);
            } else {
                throw e;
            }
        }
    }

    // TODO: is there a better way to do this? Reuse hasAccess?
    async hasNotAccess(user: ObjectId, _id: ObjectId) {
        const item = await this.items.readOne({ _id });
        if (!item) {
            throw new NotFoundError(`Item ${_id} does not exist!`);
        }
        if (item.owner.toString() === user.toString() || item.collaborators.some(c => c.toString() === user.toString())) {        
            throw new NotAllowedError(`User ${user} has access to item ${item.toString()}!`);
        }
    }
    
    async getItems(query: Filter<ShareableItemDoc>) {
        const items = await this.items.readMany(query, {
            sort: { dateUpdated: -1 },
        });
        return items;
    }

    async getAccessibleItems(user: ObjectId) {
        const accessibleItems = await this.accessibleItems.readMany({ user });
        if (!accessibleItems) {
            throw new NotFoundError(`User ${user} does not have any items!`);
        }
        return accessibleItems;
    }
}

export class ItemOwnerNotMatchError extends NotAllowedError {
    constructor(
        public readonly author: ObjectId,
        public readonly _id: ObjectId,
    ) {
        super("{0} is not the owner of the item {1}!", author, _id);
    }
}   

export class ItemCollaboratorNotMatchError extends NotAllowedError {
    constructor(
        public readonly author: ObjectId,
        public readonly _id: ObjectId,
    ) {
        super("{0} is not a collaborator of the item {1}!", author, _id);
    }
}