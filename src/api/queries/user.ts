import { gql } from "@apollo/client";
import type { User } from "../../interfaces/user";

export const GET_USER = gql`
  query getUser($username: String) {
    getUser(username: $username) {
      id
      createdAt
      updatedAt
      firstName
      lastName
      email
      bio
      username
      phoneCode
      phoneNumber
      avatar
      type
      systemPrompt
    }
  }
`;

export interface GetUserInput {
  username?: string;
}

export interface GetUserResponse {
  getUser: User;
}
