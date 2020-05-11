import React, { useState, useEffect } from 'react';
import {Spin, Input, List} from 'antd';
import AlbumContent from '@/pages/Albums/AlbumContent';
import {connect} from "dva";

const PersonAlbumsIndex =  props => {
  const { Search } = Input;
  const [loading, setLoading] = useState(true);
  const { persons, dispatch } = props;

  useEffect(() => {
    dispatch({
      type: 'person/fetch'
    }).then(
      () => setLoading(false)
    );

  }, []);
  return (
    <div>
      &nbsp; &nbsp; &nbsp;
      <Search
        placeholder="搜索人物"
        onSearch={value => console.log(value)}
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
        dataSource={persons}
        renderItem={value => (
          <List.Item>
            <AlbumContent pageName="Person" id={value.id} src={value.src} name={value.name} description={value.description} to={`/person/personphotos/${value.id}`}/>
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

export default connect(({ person }) => ({
  persons: person.persons
}))(PersonAlbumsIndex);
