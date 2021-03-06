import React, {useState, useEffect} from 'react';
import {List, Spin} from 'antd';
import {connect} from "dva";
import EditForm from '@/pages/Photos/Edit'
import StyleModal from '@/pages/Photos/Style'
import styles from './index.less';
import Photo from './Photo';



const Photos = props => {
  const [loading, setLoading] = useState(true);
  const {allPhotos, dispatch} = props;
  useEffect(() => {
    dispatch({
      type: 'photo/fetchUserPhoto'
    }).then(() => setLoading(false))
  }, []);
  return (
    <div className={styles.main}>
      <EditForm pageName="UserPhotos"/>
      <StyleModal pageName="UserPhotos"/>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 4,
          xxl: 6,
        }}
        dataSource={allPhotos}
        renderItem={value => (
          <List.Item>
            <Photo
              photo={value}
              pageName="UserPhotos"
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
    </div>
  );
};

export default connect(({photo}) => ({
  allPhotos: photo.allPhotos,
}))(Photos);
