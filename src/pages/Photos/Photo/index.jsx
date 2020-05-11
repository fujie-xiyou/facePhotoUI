import React, {useState} from 'react';
import {Card, Modal} from 'antd';
import Zmage from 'react-zmage'
import {EditOutlined, DeleteOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import {connect} from "dva";

const {Meta} = Card;
const Photo = props => {
  const {photo, dispatch, pageName, hasActions} = props;
  const {confirm} = Modal;

  function showDeleteConfirm() {
    confirm({
      title: '确认删除照片吗？',
      icon: <ExclamationCircleOutlined/>,
      content: '照片将被永久删除，不可恢复',
      okText: "确认",
      cancelText: "取消",
      onOk() {
        return dispatch({
          type: 'photo/del',
          payload: {
            pageName,
            photo_id: photo.id,
            album_id: photo.album_id

          }
        })
      },
      onCancel() {
      },
    });
  }

  function showEditModal() {
    dispatch({
      type: 'photo/setEditFormData',
      payload: {
        visible: true,
        photo,
      }
    })
  }

  const src = /^(http)|(https):\/\//.test(photo.path) ? photo.path : `/static/facePhoto/${encodeURI(photo.path)}`;
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
        actions={
          hasActions ?
            [
              <EditOutlined onClick={() => {
                showEditModal()
              }}/>,
              <DeleteOutlined onClick={() => {
                showDeleteConfirm()
              }}/>
            ]
            : []
        }
      >
        <Meta title={photo.name}/>
      </Card>
    </div>
  );
};
Photo.defaultProps = {
  hasActions: true
};
export default connect()(Photo);
