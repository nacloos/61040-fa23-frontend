import { ObjectId } from "mongodb";

import { Router, getExpressRouter } from "./framework/router";

import { Config, Figure, FigureComment, Image, Note, NoteComment, ShareableFigure, ShareableNote, User, WebSession } from "./app";

import { FigureDoc, FigureUpdateType } from "./concepts/item/figure";
import { NoteDoc } from "./concepts/item/note";
import { UserDoc } from "./concepts/user";
import { WebSessionDoc } from "./concepts/websession";
import Responses from "./responses";

type ItemType = typeof Figure | typeof Note;
type ShareableType = typeof ShareableFigure | typeof ShareableNote;
type CommentItemType = typeof FigureComment | typeof NoteComment;

// create item methods that are shared between the different item types
async function updateItem(shareableType: ShareableType, itemType: ItemType, session: WebSessionDoc, _id: ObjectId, update: Partial<FigureUpdateType | NoteDoc>) {
  const user = WebSession.getUser(session);
  await shareableType.isOwner(user, _id);
  const itemId = await shareableType.getItemId(_id);
  return await itemType.update(itemId, update);
}

async function deleteItem(shareableType: ShareableType, itemType: ItemType, session: WebSessionDoc, _id: ObjectId) {
  const user = WebSession.getUser(session);
  await shareableType.isOwner(user, _id);
  const itemId = await shareableType.getItemId(_id);
  await itemType.delete(itemId);
  await shareableType.delete(_id);
  return `Deleted ${itemType.constructor.name} successfully!`;
}

async function addCollaborator(shareableType: ShareableType, session: WebSessionDoc, _id: ObjectId, collaborator: string) {
  const user = WebSession.getUser(session);
  await shareableType.isOwner(user, _id);
  const collaboratorId = (await User.getUserByUsername(collaborator))._id;
  // make sure the collaborator has not already access to the note (i.e. is already a collaborator or owner)
  await shareableType.hasNotAccess(collaboratorId, _id);
  return await shareableType.addCollaborator(_id, collaboratorId);
}

async function removeCollaborator(shareableType: ShareableType, session: WebSessionDoc, _id: ObjectId, collaborator: string) {
  const user = WebSession.getUser(session);
  await shareableType.isOwner(user, _id);
  const collaboratorId = (await User.getUserByUsername(collaborator))._id;
  await shareableType.isCollaborator(collaboratorId, _id);
  return await shareableType.removeCollaborator(_id, collaboratorId);
}

// async function createComment(commentItemType: CommentItemType, shareableType: ShareableType, session: WebSessionDoc, item: ObjectId, content: string) {
//   const user = WebSession.getUser(session);
//   // make sure the item is shareable and the user has access to it
//   await shareableType.hasAccess(user, item);
//   await commentItemType.create(user, item, content);
//   return "Created comment successfully!"
// }

class Routes {
  @Router.get("/session")
  async getSessionUser(session: WebSessionDoc) {
    const user = WebSession.getUser(session);
    return await User.getUserById(user);
  }

  @Router.get("/users")
  async getUsers() {
    return await User.getUsers();
  }

  @Router.get("/users/:username")
  async getUser(username: string) {
    return await User.getUserByUsername(username);
  }

  @Router.post("/users")
  async createUser(session: WebSessionDoc, username: string, password: string) {
    WebSession.isLoggedOut(session);
    return await User.create(username, password);
  }

  @Router.patch("/users")
  async updateUser(session: WebSessionDoc, update: Partial<UserDoc>) {
    const user = WebSession.getUser(session);
    return await User.update(user, update);
  }

  @Router.delete("/users")
  async deleteUser(session: WebSessionDoc) {
    const user = WebSession.getUser(session);
    WebSession.end(session);
    return await User.delete(user);
  }

  @Router.post("/login")
  async logIn(session: WebSessionDoc, username: string, password: string) {
    const u = await User.authenticate(username, password);
    WebSession.start(session, u._id);
    return { msg: "Logged in!" };
  }

  @Router.post("/logout")
  async logOut(session: WebSessionDoc) {
    WebSession.end(session);
    return { msg: "Logged out!" };
  }

  @Router.get("/search")
  async search(session: WebSessionDoc, query: { query: string }) {
    console.log("Searching for", query.query);
    const user = WebSession.getUser(session);
    // TODO: search all items
    // TODO: search only accessible items
    const results = await Note.search(query.query);
    // return await Figure.search(user, query.query);
    console.log(results);
    console.log("-----------------");
    return results;
  }

  // =========== Note routes ===========
  @Router.post("/notes/:id")
  async createNote(session: WebSessionDoc, content: string) {
    const user = WebSession.getUser(session);
    const note = await Note.create(content);
    ShareableNote.add(user, note);
    return "Created note successfully!";
  }

  @Router.patch("/notes/:_id")
  async updateNote(session: WebSessionDoc, _id: ObjectId, update: Partial<NoteDoc>) {
    return updateItem(ShareableNote, Note, session, _id, update);
    // const user = WebSession.getUser(session);
    // await ShareableNote.isOwner(user, _id);
    // const noteId = await ShareableNote.getItemId(_id);
    // return await Note.update(noteId, update);
  }

  @Router.delete("/notes/:_id")
  async deleteNote(session: WebSessionDoc, _id: ObjectId) {
    return deleteItem(ShareableNote, Note, session, _id);
  }

  @Router.get("/notes")
  async getNotes(session: WebSessionDoc) {
    // const user = WebSession.getUser(session);
    // const notes = await ShareableNote.getItems({ owner: user });
    const notes = await ShareableNote.getItems({});
    return Responses.items(Note, notes);
  }

  @Router.post("/notes/:_id/collaborators")
  async addNoteCollaborator(session: WebSessionDoc, _id: ObjectId, collaborator: string) {
    return addCollaborator(ShareableNote, session, _id, collaborator);
  }

  @Router.delete("/notes/:_id/collaborators")
  async removeNoteCollaborator(session: WebSessionDoc, _id: ObjectId, collaborator: string) {
    return removeCollaborator(ShareableNote, session, _id, collaborator);
  }

  @Router.post("/notes/:id/comments")
  async createNoteComment(session: WebSessionDoc, item: ObjectId, content: string) {
    const user = WebSession.getUser(session);
    // make sure the item is shareable and the user has access to it
    await ShareableNote.hasAccess(user, item);
    await NoteComment.create(user, item, content);
    return "Created comment successfully!";
  }

  @Router.get("/notes/:id/comments")
  async getNoteComments(session: WebSessionDoc, item: ObjectId) {
    return await NoteComment.getComments(item);
  }

  // =========== Figure routes ===========
  @Router.post("/figures")
  async createFigure(session: WebSessionDoc, imageURL: string, config: string, note: string) {
    const user = WebSession.getUser(session);

    // TODO: error when url format is not correct
    const noteId = await Note.create(note);
    const configId = await Config.create(config);
    console.log("create image", imageURL);
    const imageId = await Image.create(imageURL);
    const figId = await Figure.create(imageId, configId, noteId);
    // ensure that the figure is shared as a whole (e.g. don't want to just share the image without the config)
    await ShareableFigure.add(user, figId);
    return { msg: "Created figure successfully!" };
  }

  @Router.patch("/figures/:_id")
  async updateFigure(session: WebSessionDoc, _id: ObjectId, update: Partial<FigureDoc>) {
    return updateItem(ShareableFigure, Figure, session, _id, update);
    // const user = WebSession.getUser(session);
    // await ShareableFigure.isOwner(user, _id);
    // return await Figure.update(_id, update);
  }

  @Router.delete("/figures/:_id")
  async deleteFigure(session: WebSessionDoc, _id: ObjectId) {
    return deleteItem(ShareableFigure, Figure, session, _id);
    // const user = WebSession.getUser(session);
    // await ShareableFigure.isOwner(user, _id);
    // const figId = await ShareableFigure.getItemId(_id);
    // Figure.delete(figId);
    // ShareableFigure.delete(_id);
    // return "Deleted figure successfully!"
  }

  @Router.get("/figures")
  async getFigures(session: WebSessionDoc) {
    const user = WebSession.getUser(session);
    console.log("get figures", user)
    // const items = await ShareableFigure.getItems({});
    // the user is only allowed to access figures that he owns or is a collaborator of
    const itemIds = await ShareableFigure.getAccessibleItems(user);
    console.log("accessibleIds", itemIds);
    // const items = await Promise.all(itemIds.map((id) => ShareableFigure.getItem(id)));
    // console.log(items);

    let items = [];
    for (const id of itemIds) {
      try {
        items.push(await ShareableFigure.getItem(id));
      } catch (e) {
        // TODO: shouldn't happen
        console.log("item not found", id);
      }
    }
    console.log("items", items)
    return Responses.items(Figure, items);
  }

  @Router.post("/figures/:_id/collaborators")
  async addFigureCollaborator(session: WebSessionDoc, _id: ObjectId, collaborator: string) {
    return addCollaborator(ShareableFigure, session, _id, collaborator);
  }

  @Router.delete("/figures/:_id/collaborators/:collaborator")
  async removeFigureCollaborator(session: WebSessionDoc, _id: ObjectId, collaborator: string) {
    return removeCollaborator(ShareableFigure, session, _id, collaborator);
  }

  @Router.get("/figures/:_id/collaborators")
  async getFigureCollaborators(session: WebSessionDoc, _id: ObjectId) {
    const user = WebSession.getUser(session);
    await ShareableFigure.hasAccess(user, _id);
    const item = await ShareableFigure.getItem(_id);
    const collaborators = await User.idsToUsernames(item.collaborators);
    return collaborators;
  }

  @Router.post("/figures/:id/comments")
  async createFigureComment(session: WebSessionDoc, id: ObjectId, content: string) {
    const user = WebSession.getUser(session);
    // make sure the item is shareable and the user has access to it
    await ShareableFigure.hasAccess(user, id);
    await FigureComment.create(user, id, content);
    return "Created comment successfully!";
  }

  @Router.get("/figures/:id/comments")
  async getFigureComments(session: WebSessionDoc, id: ObjectId) {
    const comments =  await FigureComment.getComments(id);
    
    for (const comment of comments) {
      const user = await User.getUserById(comment.user);
      comment.user = user.username;
    }

    return comments;
  }

  @Router.get("/users/:username/items")
  async getAccessibleItems(username: string) {
    const userId = (await User.getUserByUsername(username))._id;

    const notes = await ShareableNote.getAccessibleItems(userId);
    const figs = await ShareableFigure.getAccessibleItems(userId);
    return notes.concat(figs);
  }

  // @Router.delete("/items")
  // async deleteAllItems(session: WebSessionDoc) {
  //   await Note.deleteAll();
  //   await Figure.deleteAll();
  //   await ShareableFigure.deleteAll({});
  //   return { msg: "All items deleted!" };
  // }

  // @Router.get("/items")
  // async getAllItems(owner?: string) {

  //   let items;
  //   if (owner) {
  //     const id = (await User.getUserByUsername(owner))._id;
  //     items = await _itemType.getItems({ owner: id });
  //   } else {
  //     items = await _itemType.getItems({});
  //   }

  //   return items;
  // }

  // @Router.get("/posts")
  // async getPosts(author?: string) {
  //   let posts;
  //   if (author) {
  //     const id = (await User.getUserByUsername(author))._id;
  //     posts = await Post.getByAuthor(id);
  //   } else {
  //     posts = await Post.getPosts({});
  //   }
  //   return Responses.posts(posts);
  // }

  // Not used in this app
  // @Router.post("/posts")
  // async createPost(session: WebSessionDoc, content: string, options?: PostOptions) {
  //   const user = WebSession.getUser(session);
  //   const created = await Post.create(user, content, options);
  //   return { msg: created.msg, post: await Responses.post(created.post) };
  // }

  // @Router.patch("/posts/:_id")
  // async updatePost(session: WebSessionDoc, _id: ObjectId, update: Partial<PostDoc>) {
  //   const user = WebSession.getUser(session);
  //   await Post.isAuthor(user, _id);
  //   return await Post.update(_id, update);
  // }

  // @Router.delete("/posts/:_id")
  // async deletePost(session: WebSessionDoc, _id: ObjectId) {
  //   const user = WebSession.getUser(session);
  //   await Post.isAuthor(user, _id);
  //   return Post.delete(_id);
  // }

  // @Router.get("/friends")
  // async getFriends(session: WebSessionDoc) {
  //   const user = WebSession.getUser(session);
  //   return await User.idsToUsernames(await Friend.getFriends(user));
  // }

  // @Router.delete("/friends/:friend")
  // async removeFriend(session: WebSessionDoc, friend: string) {
  //   const user = WebSession.getUser(session);
  //   const friendId = (await User.getUserByUsername(friend))._id;
  //   return await Friend.removeFriend(user, friendId);
  // }

  // @Router.get("/friend/requests")
  // async getRequests(session: WebSessionDoc) {
  //   const user = WebSession.getUser(session);
  //   return await Responses.friendRequests(await Friend.getRequests(user));
  // }

  // @Router.post("/friend/requests/:to")
  // async sendFriendRequest(session: WebSessionDoc, to: string) {
  //   const user = WebSession.getUser(session);
  //   const toId = (await User.getUserByUsername(to))._id;
  //   return await Friend.sendRequest(user, toId);
  // }

  // @Router.delete("/friend/requests/:to")
  // async removeFriendRequest(session: WebSessionDoc, to: string) {
  //   const user = WebSession.getUser(session);
  //   const toId = (await User.getUserByUsername(to))._id;
  //   return await Friend.removeRequest(user, toId);
  // }

  // @Router.put("/friend/accept/:from")
  // async acceptFriendRequest(session: WebSessionDoc, from: string) {
  //   const user = WebSession.getUser(session);
  //   const fromId = (await User.getUserByUsername(from))._id;
  //   return await Friend.acceptRequest(fromId, user);
  // }

  // @Router.put("/friend/reject/:from")
  // async rejectFriendRequest(session: WebSessionDoc, from: string) {
  //   const user = WebSession.getUser(session);
  //   const fromId = (await User.getUserByUsername(from))._id;
  //   return await Friend.rejectRequest(fromId, user);
  // }
}

export default getExpressRouter(new Routes());
