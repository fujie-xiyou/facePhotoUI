import React, { useState, useEffect } from 'react';
import {Spin, Input, List} from 'antd';
import styles from './index.less';
import AlbumsCreateButton from '@/pages/Albums/Create';
import AlbumContent from './AlbumContent';
import {connect} from "dva";

const AlbumsIndex =  props => {
  const { Search } = Input;
  const [loading, setLoading] = useState(true);
  const { albums, dispatch } = props;
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    dispatch({
      type: 'album/fetch'
    })
  }, []);
  return (
    <div>
      <AlbumsCreateButton />
      &nbsp; &nbsp; &nbsp;
      <Search
        placeholder="搜索相册"
        onSearch={value => console.log(value)}
        style={{
          width: 200,
        }}
      />
      <br/><br/>
      <List
        grid={{ gutter: 16, column: 6 }}
        dataSource={albums}
        renderItem={value => (
          <List.Item>
            <AlbumContent id={value.id} src={value.src} name={value.name} description={value.description}/>
          </List.Item>
        )}
      />
    </div>
  );
};

export default connect(({ album }) => ({
  albums: album.albums
}))(AlbumsIndex);
