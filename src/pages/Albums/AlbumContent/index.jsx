import React from 'react';
import {Card} from 'antd';
import notFound from '../../../assets/not_found.png'
import styles from './index.less';
import {Link} from "umi";

const {Meta} = Card;
export default ({id, src, name, description}) => {
  let ssrc = src;
  if(ssrc && !/^(http)|(https):\/\//.test(ssrc)){
    ssrc = `/static/facePhoto/${ssrc}`
  }else if(!ssrc){
    ssrc = notFound
  }
  return (
    <Link to={`albums/albumphotos/${id}`}>
      <Card
        hoverable
        style={{
          width: 240,
        }}
        cover={
          <div style={{height: 180, background:`url(${encodeURI(ssrc)})`, backgroundSize: 'cover' }}/>
        }
      >
        <Meta title={name} description={description || "暂无描述"}/>
      </Card>
    </Link>

  )
}
