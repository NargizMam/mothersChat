export interface RegisterMutation {
  email: string;
  password: string;
  displayName: string;
  avatar: string | null;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  email: string;
  token: string;
  role: string;
  googleID?: string;
  displayName: string;
  avatar: string | null;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}
export interface GlobalError {
  error: string;
}
export interface UserClient {
  _id: string,
  displayName: string,
  avatar: string | null
}

export interface ChatPostApi {
  _id: string,
  user: UserClient,
  text: string,
  createdAt: string
}
export interface IncomingPost {
  type: string,
  payload: {
    message: ChatPostApi,
    messages: ChatPostApi[],
    users: UserClient[]
  };
}

