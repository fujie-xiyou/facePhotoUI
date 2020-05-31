import {PageHeaderWrapper} from '@ant-design/pro-layout';
import React, {useState, useEffect} from 'react';
import {Spin, List} from "antd";
import {connect} from "dva";
import Photo from "@/pages/Photos/Photo";
import EditForm from "@/pages/Photos/Edit";
import StyleModal from "@/pages/Photos/Style";
import UploadPhotoButton from './UploadPhotoButton';

const AlbumPhoto = props => {
  const [loading, setLoading] = useState(true);
  const {photos, dispatch} = props;

  useEffect(() => {
    dispatch({
      type: 'photo/fetchByAlbum',
      payload: props.match.params.album_id
    }).then(
      () => setLoading(false)
    );
  }, []);
  return (
    <PageHeaderWrapper>
      <UploadPhotoButton albumID={props.match.params.album_id}/>
      <br/>
      <StyleModal pageName="AlbumPhotos"/>
      <EditForm pageName="AlbumPhotos"/>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 5,
          xxl: 6,
        }}
        dataSource={photos}
        renderItem={value => (
          <List.Item>
            <Photo
              photo={value}
              pageName="AlbumPhotos"
            />
          </List.Item>
        )}
      />
      <div
        style={{
          paddingTop: 100,
          textAlign: 'center',
        }}
      >
        <Spin spinning={loading} size="large"/>
      </div>
    </PageHeaderWrapper>
  );
};

export default connect(({photo}) => ({
  photos: photo.photos
}))(AlbumPhoto);
