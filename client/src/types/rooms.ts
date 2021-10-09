export type IUser = {
  id: number;
  name: string;
  email: string;
  avatar: string;
};

export interface Room {
  id: string;
  owner: IUser;
}
