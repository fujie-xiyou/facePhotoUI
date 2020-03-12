import React, { useState } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons'

const AlbumsCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="创建相册"
      okText="创建"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item
          name="name"
          label="相册名称"
          rules={[
            {
              required: true,
              message: '请输入相册名称',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="相册描述">
          <Input type="textarea" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const AlbumsCreateButton = () => {
  const [visible, setVisible] = useState(false);

  const onCreate = values => {
    console.log('Received values of form: ', values);
    setVisible(false);
  };

  return (
    <span>
      <Button
        type="dashed"
        icon={<PlusOutlined />}
        onClick={() => {
          setVisible(true);
        }}
      >
        新建
      </Button>
      <AlbumsCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </span>
  );
};

export default AlbumsCreateButton
