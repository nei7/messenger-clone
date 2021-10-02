export type IUser = {
  id: number;
  name: string;
  email: string;
};

export interface Room {
  id: string;
  owner: IUser;
}
