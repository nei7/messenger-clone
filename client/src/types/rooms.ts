export type IUser = {
  id: number;
  name: string;
  email: string;
  avatar: string;
  lastMessage: string;
  unreadMessages?: number;
  lastMessageDate: string;
};

export interface Room {
  id: string;
  owner: IUser;
}
