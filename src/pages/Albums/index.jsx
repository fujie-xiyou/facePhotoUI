import React, {useState, useEffect} from 'react';
import {Spin, Input, List} from 'antd';
import AlbumsCreateButton from '@/pages/Albums/Create';
import {connect} from "dva";
import AlbumContent from './AlbumContent';

const AlbumsIndex = props => {
  const {Search} = Input;
  const [loading, setLoading] = useState(true);
  const {albums, dispatch} = props;
  const [searchAlbums, setSearchAlbums] = useState();
  useEffect(() => {
    dispatch({
      type: 'album/fetch'
    }).then(
      () => setLoading(false)
    );

  }, []);
  return (
    <div>
      <AlbumsCreateButton/>
      &nbsp; &nbsp; &nbsp;
      <Search
        placeholder="搜索相册"
        onSearch={value => {
          setSearchAlbums(albums.filter(item => item.name.search(value) >= 0 || item.description.search(value) >= 0))
        }}
        style={{
          width: 200,
        }}
      />
      <br/><br/>
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
        dataSource={searchAlbums || albums}
        renderItem={value => (
          <List.Item>
            <AlbumContent pageName="Albums" id={value.id} src={value.src} name={value.name}
                          description={value.description} to={`albums/albumphotos/${value.id}`}/>
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

export default connect(({album}) => ({
  albums: album.albums
}))(AlbumsIndex);
