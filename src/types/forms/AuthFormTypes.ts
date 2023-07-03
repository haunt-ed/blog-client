import { WithError } from "@/utils/getFormErrors";

export interface RegistrationInputs {
  email: string;
  username: string;
  password: string;
}

export interface LoginInputs {
  user: string;
  password: string;
}

export type RegistrationErrors = RegistrationInputs & WithError;
export type LoginErrors = LoginInputs & WithError;
