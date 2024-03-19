import { WebSocket } from 'ws';
import { Model } from 'mongoose';

export interface ActiveConnections {
  [id: string]: WebSocket;
}
export interface UserFields {
  email: string;
  password: string;
  token: string;
  role: string;
  displayName: string;
  googleID?: string;
  avatar?: string;
  isActive: boolean;
}
export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}
type UserModal = Model<UserFields, {}, UserMethods>;

export interface UserClient {
  _id: string;
  token: string;
  displayName: string;
  avatar: string | null;
}

export interface UserWS {
  _id: string;
  displayName: string;
  avatar: string | null;
}
export interface PostApi {
  id: string;
  message: string;
  user: string;
  createdAt: string;
}
export interface PostMutation {
  message: string;
  user: string;
}
export interface IncomingMessage {
  type: string;
  payload: {
    messages: PostMutation[];
    clients: UserClient[];
  };
}
