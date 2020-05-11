import { fetch, modify } from '@/services/person';
import {message} from "antd";

const PersonModel = {
  namespace: 'person',
  state: {
    persons: undefined
  },
  effects: {
    *fetch(_, { call , put}){
      yield put({
        type: 'setPersons',
        payload: []
      });
      const response = yield call(fetch);
      yield put({
        type: 'setPersons',
        payload: response.data
      });
      if(!response.success) {
        message.error(response.message)
      }
    },
    * modify({payload}, {call, put}){
      const response = yield call(modify, payload);
      if(response.success){
        message.success("修改成功");
        yield put({
          type: 'fetch',
        })
      }else {
        message.error(response.message || "服务器异常,修改失败")
      }
    }
  },
  reducers: {
    setPersons(state, { payload }) {
      return {...state, persons: payload}
    }
  }

};

export default PersonModel
