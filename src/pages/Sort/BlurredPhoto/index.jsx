import React, {useState, useEffect} from 'react';
import {connect} from "dva";

import {Spin, List, Divider} from 'antd';
import Photo from "./Photo";

const BlurredPhoto = props => {
  const [loading, setLoading] = useState(true);
  const {blurredPhotos, dispatch} = props;
  useEffect(() => {
    dispatch({
      type: 'photo/fetchBlurredPhotos'
    }).then(() => {
      setLoading(false)
    })
  }, []);
  return (
    <div>
      {console.log("blurredPhotos", blurredPhotos)}
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
        dataSource={blurredPhotos}
        renderItem={value => (
          <List.Item>
            <Photo
              pageName="SimilarityPhoto"
              photo={value}
            />
          </List.Item>

        )}
      />
      <Divider/>
      <div
        style={{
          paddingTop: 100,
          textAlign: 'center',
        }}
      >
        <Spin spinning={loading} size="large"/>
      </div>
    </div>

  );
};

export default connect(({photo}) => ({
  blurredPhotos: photo.blurredPhotos
}))(BlurredPhoto)
