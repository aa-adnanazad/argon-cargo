import { debug } from '../helpers/';
import { createStore } from 'redux';

type Action = {
  type: string;
  value: object[];
};

const defaultState = {
  currentVessels: [],
  multiVessels: [],
  gettingInformation: false,
  textareaValue: '',
};

function reducer(state: any, action: Action) {
  let { type, value } = action;
  let newState = { ...state };

  if (type === 'GET_NEW_VESSELS') {
    debug('Updated state with new vessels information');
    newState.currentVessels = [...value];
    return newState;
  }

  if (type === 'GET_MULTI_VESSELS') {
    debug('Updated state with multi vessels information');
    newState.multiVessels = [...value];
    return newState;
  }

  if (type === 'GETTING_INFO') {
    newState.gettingInformation = value;
    return newState;
  }

  if (type === 'CHANGE_TEXTAREA') {
    newState.textareaValue = value;
    return newState;
  }

  return state;
}

export default createStore(reducer, defaultState);
