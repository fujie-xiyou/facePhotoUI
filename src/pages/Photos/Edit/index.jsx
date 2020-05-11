import React from 'react';
import {Form, Modal, Input} from "antd";
import {ExclamationCircleOutlined} from '@ant-design/icons';
import {connect} from "dva";

const EditForm = props => {
  const [form] = Form.useForm();
  const {editFormData, dispatch, pageName} = props;
  const {photo} = editFormData;
  if (photo !== undefined)
    form.setFieldsValue({name: photo.name});
  return (
    <Modal
      visible={editFormData.visible}
      title='修改照片'
      icon={<ExclamationCircleOutlined/>}
      forceRender
      okText="确认"
      cancelText="取消"
      onOk={
        () => {
          form
            .validateFields()
            .then(values => {
              console.log("values", values);
              const data = {
                album_id: photo.album_id,
                pageName,
                id: photo.id,
                name: values.name
              };
              dispatch({
                type: 'photo/modify',
                payload: data
              }).then(
                () =>{
                  dispatch({
                    type: 'photo/setEditFormData',
                    payload: {
                      visible: false,
                      photo: undefined
                    }
                  })
                }
              )
            })
            .catch(info => {
              console.log('Validate Failed:', info);
            });
        }
      }
      onCancel={() => {
        dispatch({
          type: 'photo/setEditFormData',
          payload: {
            visible: false,
            photo: undefined
          }
        })
      }}
    >
      <Form
        layout="vertical"
        form={form}
        name="photo"
      >
        <Form.Item
          label="照片名称"
          name="name"
          rules={[{required: true, message: '名称不能为空'}]}
        >
          <Input/>
        </Form.Item>
      </Form>
    </Modal>
  )
};
export default connect(({photo}) => ({
  editFormData: photo.editFormData
}))(EditForm);
