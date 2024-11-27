export type AuthInput = {
  username: string;
  password: string;
};

export type SignInData = {
  userId: number;
  username: string;
};

export type AuthResult = {
  accessToken: string;
  userId: number;
  username: string;
};
