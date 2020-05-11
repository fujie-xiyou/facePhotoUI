import { fetch } from '@/services/person';
import {message} from "antd";

const PersonModel = {
  namespace: 'person',
  state: {
    persons: undefined
  },
  effects: {
    *fetch(_, { call , put}){
      const response = yield call(fetch);
      yield put({
        type: 'setPersons',
        payload: response.data
      });
      if(!response.success) {
        message.error(response.message)
      }
    },
  },
  reducers: {
    setPersons(state, { payload }) {
      return {...state, persons: payload}
    }
  }

};

export default PersonModel
