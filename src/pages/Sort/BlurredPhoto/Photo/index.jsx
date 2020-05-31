import React from 'react';
import {Card, Modal} from 'antd';
import Zmage from 'react-zmage'
import {DeleteOutlined, ExclamationCircleOutlined, InfoCircleOutlined} from '@ant-design/icons';
import {connect} from "dva";

const {Meta} = Card;
const Photo = props => {
  const {photo, dispatch} = props;
  const {confirm} = Modal;

  function showDeleteConfirm() {
    confirm({
      title: '确认删除该模糊照片吗？',
      icon: <ExclamationCircleOutlined/>,
      content: '照片将被永久删除，不可恢复',
      okText: "确认",
      cancelText: "取消",
      onOk() {
        return dispatch({
          type: 'photo/delBlurry',
          payload: photo.id,
        })
      },
      onCancel() {
      },
    });
  }
  function showUnMark() {
    confirm({
      title: '该照片不是模糊照片吗？',
      icon: <ExclamationCircleOutlined/>,
      content: '如果您认为该照片不是模糊照片，请点击"确定"按钮，该照片将不会再出现在模糊照片列表中。',
      okText: "确认",
      cancelText: "取消",
      onOk() {
        return dispatch({
          type: 'photo/unmarkBlurred',
          payload: photo.id,
        })
      },
      onCancel() {
      },
    });
  }


  const src = /^(http)|(https):\/\//.test(photo.path) ? photo.path : `/static/facePhoto/${encodeURI(photo.path)}`;
  const actions = [
    <DeleteOutlined onClick={() => showDeleteConfirm()}/>,
    <InfoCircleOutlined onClick={() => showUnMark()}/>
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
