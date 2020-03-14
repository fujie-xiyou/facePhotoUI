import {PageHeaderWrapper} from '@ant-design/pro-layout';
import React, {useState, useEffect} from 'react';
import UploadPhotoButton from './UploadPhotoButton';
import {Card, List} from "antd";
import {connect} from "dva";

const AlbumPhoto = props => {
  const [loading, setLoading] = useState(true);
  const {photos, dispatch} = props;
  useEffect(() => {
    dispatch({
      type: 'photo/fetchByAlbum',
      payload: props.match.params.album_id
    })
  }, []);
  const {Meta} = Card;
  return (
    <PageHeaderWrapper>
      <UploadPhotoButton albumID={props.match.params.album_id}/>
      <br/>
      <List
        grid={{gutter: 16, column: 6}}
        dataSource={photos}
        renderItem={value => (
          <List.Item>
            <Card
              hoverable
              style={{
                width: 240,
              }}
              cover={
                <div style={{
                  height: 180,
                  background: `url(${/^(http)|(https):\/\//.test(value.path) ? value.path : `/static/facePhoto/${encodeURI(value.path)}`})`,
                  backgroundSize: 'cover'
                }}/>
              }
            >
              <Meta title={value.name}/>
            </Card>
          </List.Item>
        )}
      />
    </PageHeaderWrapper>
  );
};

export default connect(({photo}) => ({
  photos: photo.photos
}))(AlbumPhoto);
