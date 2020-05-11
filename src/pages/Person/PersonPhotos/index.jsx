import {PageHeaderWrapper} from '@ant-design/pro-layout';
import React, {useState, useEffect} from 'react';
import {Spin, List} from "antd";
import {connect} from "dva";
import Photo from '@/pages/Photos/Photo';


const PersonPhoto = props => {
  const [loading, setLoading] = useState(true);
  const {personAlbumPhotos, dispatch} = props;
  useEffect(() => {
    dispatch({
      type: 'photo/fetchByPersonAlbum',
      payload: props.match.params.person_album_id
    }).then(
      () => setLoading(false)
    );
  }, []);
  return (
    <PageHeaderWrapper>
      <br/>
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
        dataSource={personAlbumPhotos}
        renderItem={value => (
          <List.Item>
            <Photo
              photo={value}
              hasActions={false}
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
        <Spin spinning={loading} size="large" />
      </div>
    </PageHeaderWrapper>
  );
};

export default connect(({photo}) => ({
  personAlbumPhotos: photo.personAlbumPhotos
}))(PersonPhoto);
