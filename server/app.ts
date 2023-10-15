// import FriendConcept from "./concepts/friend";
// import PostConcept from "./concepts/post";
import ShareableConcept from "./concepts/shareable";
import CommentConcept from "./concepts/comment";
import UserConcept from "./concepts/user";
import WebSessionConcept from "./concepts/websession";

import ConfigConcept from "./concepts/item/config";
import FigureConcept from "./concepts/item/figure";
import ImageConcept from "./concepts/item/image";
import NoteConcept from "./concepts/item/note";


// App Definition using concepts
export const WebSession = new WebSessionConcept();
export const User = new UserConcept();

export const Note = new NoteConcept();
export const Config = new ConfigConcept();
export const Image = new ImageConcept();
export const Figure = new FigureConcept();

// export const Figure = new CompositeItemConcept({image: Image, config: Config, note: Note}, "figures")


export const ShareableNote = new ShareableConcept("shareable-notes");
export const ShareableFigure = new ShareableConcept("shareable-figures");

export const FigureComment = new CommentConcept("figure-comments");
export const NoteComment = new CommentConcept("note-comments");


// export const Post = new PostConcept();
// export const Friend = new FriendConcept();