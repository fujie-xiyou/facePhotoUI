import React, {useState, useEffect} from 'react';
import {Spin, Input} from 'antd';
import styles from './index.less';
import AlbumsCreateButton from "@/pages/Albums/Create";

export default () => {
  const { Search } = Input
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <div>
      <AlbumsCreateButton />
      &nbsp; &nbsp; &nbsp;
      <Search
        placeholder="搜索相册"
        onSearch={value => console.log(value)}
        style={{width: 200}}
      />
    </div>
  );
};
