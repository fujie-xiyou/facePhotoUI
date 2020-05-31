import {fetchByAlbum, fetchUserPhoto,
  fetchByPersonAlbum, del, modify, style, unmarkBlurred,
  similarity, delSimilarity, fetchBlurredPhotos
} from '@/services/photo';
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
    },
    styleModalData: {
      visible: false,
      photo: undefined
    },
    similarityPhotos: []
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
    * style({payload}, {call, put}){
      const response = yield call(style, payload);
      if(response.success){
        message.success("处理成功");
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
        message.error(response.message || "服务器异常，处理失败")
      }
    },
    * setEditFormData({payload}, {_, put}){
      yield put({
        type: 'setEditFormDataReducers',
        payload,
      })
    },
    * setStyleModalData({payload}, {_, put}){
      yield put({
        type: 'setStyleModalDataReducers',
        payload
      })
    },
    * fetchSimilarityPhotos(_, {call, put}){
      const response = yield call(similarity);
      if(response.success){
        yield put({
          type: 'setSimilarityPhotos',
          payload: response.data
        })
      }else {
        message.error(response.message || "服务器异常，获取失败")
      }

    },
    * delSimilarity({payload}, {call, put}){
      const response = yield call(delSimilarity, payload);
      if(response.success){
        message.success("删除成功");
        yield put({
          type: 'fetchSimilarityPhotos'
        })
      }else {
        message.error(response.message || "服务器异常，删除失败")
      }
    },
    *fetchBlurredPhotos(_, {call, put}){
      const response = yield call(fetchBlurredPhotos);
      if(response.success){
        yield put({
          type: 'setBlurredPhotos',
          payload: response.data
        })
      }else {
        message.error(response.message || "服务器异常")
      }
    },
    * delBlurry({payload}, {call, put}){
      const response = yield call(del, payload);
      if(response.success){
        message.success("删除成功");
        yield put({
          type: 'fetchBlurredPhotos'
        })
      }else {
        message.error(response.message || "服务器异常，删除失败")
      }
    },
    *unmarkBlurred({payload}, {call, put}){
      const response = yield call(unmarkBlurred, payload);
      if(response.success){
        message.success("操作成功");
        yield put({
          type: 'fetchBlurredPhotos'
        })
      }else {
        message.error(response.message || "服务器异常，操作失败")
      }
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
    },
    setStyleModalDataReducers(state, {payload}){
      return {...state, styleModalData: payload}
    },
    setSimilarityPhotos(state, {payload}){
      return {...state, similarityPhotos: payload}
    },
    setBlurredPhotos(state, {payload}){
      return{...state, blurredPhotos: payload}
    }
  }
};

export default PhotoModel

// TODO 1.利用Model弹窗按钮的loading效果完成加载结束的副作用
// TODO 2.为页面显示加载中动画
