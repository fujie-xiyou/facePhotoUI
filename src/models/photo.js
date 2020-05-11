import {fetchByAlbum, fetchUserPhoto, fetchByPersonAlbum, del, modify} from '@/services/photo';
import {message} from "antd";


const PhotoModel = {
  namespace: 'photo',
  state: {
    photos: [],
    allPhotos: [],
    personAlbumPhotos: [],
    editFormData: {
      visible: false,
      photo: undefined
    }
  },
  effects: {
    * fetchByAlbum({payload}, {call, put}) {
      yield put({
        type: 'setPhotos',
        payload: []
      });
      const response = yield call(fetchByAlbum, payload);
      yield put({
        type: 'setPhotos',
        payload: response.data
      })
    },
    * fetchUserPhoto(_, {call, put}) {
      yield put({
        type: 'setAllPhotos',
        payload: []
      });
      const response = yield call(fetchUserPhoto);
      yield put({
        type: 'setAllPhotos',
        payload: response.data
      })
    },
    * fetchByPersonAlbum({payload}, {call, put}){
      yield put({
        type: 'setPersonAlbumPhotos',
        payload: []
      });
      const response = yield call(fetchByPersonAlbum, payload);
      yield put({
        type: 'setPersonAlbumPhotos',
        payload: response.data
      })
    },
    * del({payload}, {call, put}){
      const response = yield call(del, payload.photo_id);
      if(response.success){
        message.success("删除成功");
        if(payload.pageName === 'UserPhotos'){
          yield put({
            type: 'fetchUserPhoto'
          })
        }
        else if(payload.pageName === "AlbumPhotos"){
          yield put({
            type: 'fetchByAlbum',
            payload: payload.album_id
          })
        }
      }else {
        message.error(response.message || "服务器异常，删除失败")
      }
    },
    * modify({payload}, {call, put}){
      const response = yield call(modify, payload);
      if(response.success){
        message.success("修改成功");
        if(payload.pageName === 'UserPhotos'){
          yield put({
            type: 'fetchUserPhoto'
          })
        }
        else if(payload.pageName === "AlbumPhotos"){
          yield put({
            type: 'fetchByAlbum',
            payload: payload.album_id
          })
        }
      }else {
        message.error(response.message || "服务器异常，修改失败")
      }
    },
    * setEditFormData({payload}, {_, put}){
      yield put({
        type: 'setEditFormDataReducers',
        payload,
      })
    }

  },
  reducers: {
    setPhotos(state, {payload}) {
      return {...state, photos: payload}
    },
    setAllPhotos(state, { payload }){
      return {...state, allPhotos: payload}
    },
    setPersonAlbumPhotos(state, {payload}){
      return {...state, personAlbumPhotos: payload}
    },
    setEditFormDataReducers(state, {payload}){
      return {...state, editFormData: payload}
    }
  }
};

export default PhotoModel

// TODO 1.利用Model弹窗按钮的loading效果完成加载结束的副作用
// TODO 2.为页面显示加载中动画
