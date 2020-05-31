import React, {useState} from 'react';
import {Form, Modal, Radio} from "antd";
import {connect} from "dva";

const StyleModal = props => {
  const [form] = Form.useForm();
  const {styleModalData, dispatch, pageName} = props;
  const {photo} = styleModalData;
  const [confirmLoading, setConfirmLoading] = useState(false);
  form.setFieldsValue({style_type: null});
  return (
    <Modal
      visible={styleModalData.visible}
      confirmLoading={confirmLoading}
      title='风格化照片'
      forceRender
      okText="确认"
      cancelText="取消"
      onOk={
        () => {
          form
            .validateFields()
            .then(values => {
              setConfirmLoading(true);
              console.log("values", values);
              const data = {
                pageName,
                album_id: photo.album_id,
                style_type: values.style_type,
                id: photo.id,
              };
              dispatch({
                type: 'photo/style',
                payload: data
              }).then(
                () =>{
                  setConfirmLoading(false);
                  dispatch({
                    type: 'photo/setStyleModalData',
                    payload: {
                      visible: false,
                      photo: undefined
                    }
                  })
                }
              )
            })
            .catch(info => {
              setConfirmLoading(false);
              console.log('Validate Failed:', info);
            });
        }
      }
      onCancel={() => {
        dispatch({
          type: 'photo/setStyleModalData',
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
          label="照片风格"
          name="style_type"
          rules={[{required: true, message: '请选择一种风格'}]}
        >
          <Radio.Group>
            <Radio.Button value="grays">黑白</Radio.Button>
            <Radio.Button value="sketch">素描</Radio.Button>
            <Radio.Button value="starry_night">星夜</Radio.Button>
            <Radio.Button value="la_muse">缪斯</Radio.Button>
            <Radio.Button value="candy">糖果</Radio.Button>
            <Radio.Button value="the_scream">呐喊</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  )
};
export default connect(({photo}) => ({
  styleModalData: photo.styleModalData
}))(StyleModal);
