import { queryCurrent, query as queryUsers, register } from '@/services/user';
import {message} from "antd";
import { routerRedux } from 'dva/router';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response.data,
      });
    },
    * register({payload}, {call, put}){
      const response = yield call(register, payload);
      if(response.success){
        message.success("注册成功");
        yield put({
          type: 'redirect'
        })
      }else {
        message.success(response.message || "服务器异常，注册失败")
      }
    },
    * redirect (_ , { put }) {
      yield put(routerRedux.push('/user/login'));
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
