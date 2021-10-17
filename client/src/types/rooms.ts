export type IUser = {
  id: number;
  name: string;
  email: string;
  avatar: string;
  lastMessage: string;
  lastMessageDate: string;
  createdAt: string;
  properties: {
    unreadMessages: number;
    allMessagesLoaded: boolean;
    offset: number;
  };
};

export interface Room {
  id: string;
  owner: IUser;
}
