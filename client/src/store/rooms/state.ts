import { Room } from "@/types/rooms";

export interface State {
  rooms: Room[];
}

const state: State = {
  rooms: [],
};

export default state;
