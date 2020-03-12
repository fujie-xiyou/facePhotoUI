import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import styles from './index.less';
import Photo from './Photo';

export default () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <div className={styles.main}>
      <Photo src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" title="测试标题"/>
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
