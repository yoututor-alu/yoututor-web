import { gql } from "@apollo/client";
import type { User } from "../../interfaces/user";

export const UPDATE_USER = gql`
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
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

export interface UpdateUserInput {
  input: {
    bio?: string;
    systemPrompt?: string;
  };
}

export interface UpdateUserResponse {
  updateUser: User;
}
