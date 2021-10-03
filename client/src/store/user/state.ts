export interface State {
  token: string;
  name: string;
  email: string;
  id: number;
}

const state: State = {
  token: '',
  name: '',
  email: '',
  id: -1,
};

export default state;
