import { MutationTree } from "vuex";
import { State } from "./state";

export enum MutationType {}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const mutations: MutationTree<State> & MutationType = {};

export default mutations;
