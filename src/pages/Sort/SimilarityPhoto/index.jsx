import React, {useState, useEffect} from 'react';
import {connect} from "dva";

import {Spin, List, Divider} from 'antd';
import Photo from "./Photo";

const SimilarityPhoto = props => {
  const [loading, setLoading] = useState(true);
  const {similarityPhotos, dispatch} = props;
  useEffect(() => {
    dispatch({
      type: 'photo/fetchSimilarityPhotos'
    }).then(() => {
      setLoading(false)
    })
  }, []);
  return (
    <div>
      {
        similarityPhotos && similarityPhotos.map(item =>
          <div>
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
              dataSource={item}
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
          </div>
        )
      }
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
  similarityPhotos: photo.similarityPhotos
}))(SimilarityPhoto)
