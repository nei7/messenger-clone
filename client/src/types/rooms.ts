export type User = {
  id: number;
  name: string;
  email: string;
};

export interface Room {
  id: string;
  owner: User;
}
