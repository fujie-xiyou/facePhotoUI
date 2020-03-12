import React from 'react';
import { Card } from 'antd';
import styles from './index.less';

const { Meta } = Card;
export default props => {
  const {src, title} = props;

  return (
    <div className={styles.container}>
      <div id="components-card-demo-flexible-content">
        <Card
          hoverable
          style={{
            width: 240,
          }}
          cover={
            <img alt={title} src={src} />
          }
        >
          <Meta title={title} />
        </Card>
      </div>
    </div>
  );
}

