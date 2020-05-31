import React from 'react';
import {Card, Modal} from 'antd';
import Zmage from 'react-zmage'
import {DeleteOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import {connect} from "dva";

const {Meta} = Card;
const Photo = props => {
  const {photo, dispatch, pageName} = props;
  const {confirm} = Modal;

  function showDeleteConfirm() {
    confirm({
      title: '确认重复删除照片吗？',
      icon: <ExclamationCircleOutlined/>,
      content: '照片将被永久删除，不可恢复',
      okText: "确认",
      cancelText: "取消",
      onOk() {
        return dispatch({
          type: 'photo/delSimilarity',
          payload: {
            pageName,
            photo_id: photo.id,

          }
        })
      },
      onCancel() {
      },
    });
  }


  const src = /^(http)|(https):\/\//.test(photo.path) ? photo.path : `/static/facePhoto/${encodeURI(photo.path)}`;
  const actions = [
    <DeleteOutlined onClick={() => showDeleteConfirm()}/>,
  ];
  return (
    <div>
      <Card
        hoverable
        style={{
          width: 240,
        }}
        cover={
          <Zmage
            src={src} alt={photo.name}
            style={{objectFit: "contain", height: 180}}
            controller={{
              download: true,
            }}
          />
        }
        actions={actions}
      >
        <Meta title={photo.name}/>
      </Card>
    </div>
  );
};

export default connect()(Photo);
