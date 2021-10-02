import { IUser } from "@/types/rooms";

export interface State {
  users: IUser[];
}

const state: State = {
  users: [],
};

export default state;
