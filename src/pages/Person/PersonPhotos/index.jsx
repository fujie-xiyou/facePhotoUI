import {PageHeaderWrapper} from '@ant-design/pro-layout';
import React, {useState, useEffect} from 'react';
import {Spin, List} from "antd";
import {connect} from "dva";
import Photo from '@/pages/Photos/Photo';


const PersonPhoto = props => {
  const [loading, setLoading] = useState(true);
  const {photos, dispatch} = props;
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
        grid={{gutter: 16, column: 6}}
        dataSource={photos}
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
  photos: photo.photos
}))(PersonPhoto);
