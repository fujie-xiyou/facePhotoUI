import React from 'react';
import {Card, Modal, Form, Input} from 'antd';
import {Link} from "umi";
import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import {connect} from 'dva'
import notFound from '../../../assets/not_found.png'

const {Meta} = Card;
const {confirm} = Modal;

const AlbumContent = ({id, dispatch, src, name, description, to, pageName}) => {
  const [form] = Form.useForm();

  let ssrc = src;
  if (ssrc && !/^(http)|(https):\/\//.test(ssrc)) {
    ssrc = `/static/facePhoto/${ssrc}`
  } else if (!ssrc) {
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

  function showModifyModal() {
    form.setFieldsValue({name, description});
    confirm({
      title: '修改相册',
      icon: <ExclamationCircleOutlined/>,
      content:
        <Form
          layout="vertical"
          form={form}
          name="photo"

        >
          <Form.Item
            label="相册名称"
            name="name"
            rules={[{required: true, message: '名称不能为空'}]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="相册描述"
            name="description"
          >
            <Input/>
          </Form.Item>
        </Form>,
      okText: "确认",
      cancelText: "取消",
      onOk() {
        return form
          .validateFields()
          .then(values => {
            const data = {
              album_id: id,
              name: values.name,
              description: values.description,
            };
            if (pageName === "Albums") {
              return dispatch({
                type: 'album/modify',
                payload: data
              })
            }
            if (pageName === "Person") {
              return dispatch({
                type: 'person/modify',
                payload: data
              })
            }
            return dispatch({
              type: 'album/modify',
              payload: data
            })
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      },
      onCancel() {
      },
    });
  }

  const actions = [
    <EditOutlined onClick={() => {
      showModifyModal()
    }}/>
  ];
  if(pageName === "Albums"){
    actions.push(
      <DeleteOutlined onClick={() => {
        showDeleteConfirm()
      }}/>
    )
  }
  return (
    <Card
      hoverable
      style={{
        width: 240,
      }}
      cover={
        <Link to={to}>

          <div style={{height: 180, background: `url(${encodeURI(ssrc)})`, backgroundSize: 'cover'}}/>
        </Link>

      }
      actions={actions}>
      <Meta title={name} description={description || "暂无描述"}/>
    </Card>

  )
};

export default connect()(AlbumContent)
