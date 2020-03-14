import {fetchByAlbum, fetchUserPhoto} from '@/services/photo';


const PhotoModel = {
  namespace: 'photo',
  state: {
    photos: [],
    allPhotos: []
  },
  effects: {
    * fetchByAlbum({payload}, {call, put}) {
      const response = yield call(fetchByAlbum, payload);
      yield put({
        type: 'setPhotos',
        payload: response.data
      })
    },
    *fetchUserPhoto(_, {call, put}) {
      const response = yield call(fetchUserPhoto);
      yield put({
        type: 'setAllPhotos',
        payload: response.data
      })
    }

  },
  reducers: {
    setPhotos(state, {payload}) {
      return {...state, photos: payload}
    },
    setAllPhotos(state, { payload }){
      return {...state, allPhotos: payload}
    }
  }
};

export default PhotoModel

// TODO 1.利用Model弹窗按钮的loading效果完成加载结束的副作用
// TODO 2.为页面显示加载中动画
