import { gql } from "@apollo/client";
import type { Session } from "../../interfaces/session";
import type { FilterInput, PaginationResponse } from "../../interfaces";

export const GET_SESSION = gql`
  query getSession($id: ObjectId!) {
    getSession(id: $id) {
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

export interface GetSessionInput {
  id: string;
}

export interface GetSessionResponse {
  getSession: Session;
}

export const GET_SESSIONS = gql`
  query getSessions($filter: FilterInput!) {
    getSessions(filter: $filter) {
      totalPages
      totalCount
      list {
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
  }
`;

export interface GetSessionsInput {
  filter: FilterInput;
}

export interface GetSessionsResponse {
  getSessions: PaginationResponse<Session>;
}
