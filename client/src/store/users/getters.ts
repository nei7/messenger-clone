import { GetterTree } from "vuex";
import { State } from "./state";

// eslint-disable-next-line @typescript-eslint/ban-types
type Getters = {};

const getters: GetterTree<State, State> & Getters = {};

export default getters;
