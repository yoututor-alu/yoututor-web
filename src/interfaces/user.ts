import { type CountryCode } from "libphonenumber-js";
import { Currency, type Document } from ".";

export enum UserType {
  User = "User",
  Admin = "Admin",
  SuperAdmin = "SuperAdmin"
}

export interface User extends Document {
  firstName: string;

  lastName: string;

  email: string;

  username: string;

  currency: Currency;

  phoneCode: CountryCode;

  phoneNumber?: string;

  bio?: string;

  systemPrompt?: string;

  avatar?: string;

  referredBy?: User;

  type: UserType;

  isDeleted: boolean;
}
