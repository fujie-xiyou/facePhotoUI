import React from 'react';
import {Card, Modal} from 'antd';
import {Link} from "umi";
import notFound from '../../../assets/not_found.png'
import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined} from "@ant-design/icons";

const {Meta} = Card;
const {confirm} = Modal;

export default ({id, dispatch, src, name, description, to}) => {
  let ssrc = src;
  if(ssrc && !/^(http)|(https):\/\//.test(ssrc)){
    ssrc = `/static/facePhoto/${ssrc}`
  }else if(!ssrc){
    ssrc = notFound
  }
  function showDeleteConfirm() {
    confirm({
      title: '确认删除相册吗？',
      icon: <ExclamationCircleOutlined/>,
      content: '删除相册同时会删除相册下所有照片，且不可恢复',
      okText: "确认",
      cancelText: "取消",
      onOk() {
        return dispatch({
          type: 'album/del',
          payload: {
            album_id: id
          }
        })
      },
      onCancel() {
      },
    });
  }

  return (
    <Link to={to}>
      <Card
        hoverable
        style={{
          width: 240,
        }}
        cover={
          <div style={{height: 180, background:`url(${encodeURI(ssrc)})`, backgroundSize: 'cover' }}/>
        }
        actions={
            [
              <EditOutlined onClick={() => {
              }}/>,
              <DeleteOutlined onClick={() => {
                showDeleteConfirm()
              }}/>
            ]
        }
      >
        <Meta title={name} description={description || "暂无描述"}/>
      </Card>
    </Link>

  )
}
