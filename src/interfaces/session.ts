import type { Document, SubDocument } from ".";
import type { User } from "./user";

export enum MessageRole {
  User = "User",
  Agent = "Agent"
}

export interface Message extends SubDocument {
  id: string;

  role: MessageRole;

  model: string;

  content: string;
}

export interface Session extends Document {
  user: User;

  name?: string;

  video: string;

  transcript?: string;

  messages: Message[];

  isDeleted: boolean;

  channel?: string;

  publishedAt?: string;

  summary?: string;
}
