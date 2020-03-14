import { fetchUserAlbums, createAlbum } from '@/services/album';
import {message} from "antd";

const AlbumModel = {
  namespace: 'album',
  state: {
    albums: undefined,
    createState: undefined
  },
  effects: {
    *fetch(_, { call , put}){
      const response = yield call(fetchUserAlbums);
      yield put({
        type: 'setAlbums',
        payload: response.data
      });
      if(!response.success) {
        message.error(response.message)
      }
    },
    *create({ payload }, {call, put}){
      const response = yield call(createAlbum, payload);
      if(response.success){
        yield put({
          type: 'setCreateAlbumsState',
          payload: response
        });
      }else {
        message.error(response.message)
      }
    }
  },
  reducers: {
    setAlbums(state, { payload }) {
      return {...state, albums: payload}
    },
    setCreateAlbumsState(state, { payload }){
      return {...state, createState: payload.success}
    },
    resetCreateAlbumsState(state){
      return {...state, createState: false}
    }
  }

};

export default AlbumModel
