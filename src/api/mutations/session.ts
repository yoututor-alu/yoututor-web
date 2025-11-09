import { gql } from "@apollo/client";
import type { Session } from "../../interfaces/session";

export const CREATE_SESSION = gql`
  mutation createSession($input: CreateSessionInput!) {
    createSession(input: $input) {
      id
      name
      video
      messages {
        id
        role
        model
        content
        createdAt
      }
      channel
      publishedAt
      summary
      createdAt
    }
  }
`;

export interface CreateSessionInput {
  input: {
    name?: string;
    video: string;
  };
}

export interface CreateSessionResponse {
  createSession: Session;
}

export const SEND_MESSAGE = gql`
  mutation sendMessage($input: SendMessageInput!) {
    sendMessage(input: $input) {
      id
      messages {
        id
        role
        model
        content
        createdAt
      }
      channel
      publishedAt
      summary
      createdAt
    }
  }
`;

export interface SendMessageInput {
  input: {
    id: string;

    content: string;
  };
}

export interface SendMessageResponse {
  sendMessage: Session;
}
