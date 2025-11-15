export interface registerTypes {
  name?: string;
  userName: string;
  password: string;
  gender?: string;
  email: string;
}

export interface loginTypes {
  userNameOrEmail: string;
  password: string;
}

export interface valideUserNameTypes {
  userName: string;
}
