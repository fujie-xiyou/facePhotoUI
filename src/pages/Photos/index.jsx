import React, {useState, useEffect} from 'react';
import {List, Spin} from 'antd';
import styles from './index.less';
import Photo from './Photo';
import {connect} from "dva";


const Photos = props => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  const {allPhotos, dispatch} = props;

  useEffect(() => {
    dispatch({
      type: 'photo/fetchUserPhoto'
    })
  }, []);
  return (
    <div className={styles.main}>
      <List
        grid={{gutter: 16, column: 6}}
        dataSource={allPhotos}
        renderItem={value => (
          <List.Item>
            <Photo
              src={/^(http)|(https):\/\//.test(value.path) ? value.path : `/static/facePhoto/${encodeURI(value.path)}`}
              title={value.name}/>
          </List.Item>
        )}
      />
      <div
        style={{
          paddingTop: 100,
          textAlign: 'center',
        }}
      >
        {/*<Spin spinning={loading} size="large" />*/}
      </div>
    </div>
  );
};

export default connect(({photo}) => ({
  allPhotos: photo.allPhotos
}))(Photos);
