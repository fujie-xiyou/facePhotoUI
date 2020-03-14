import React from 'react';
import {Button, Modal, Upload, message, Input, Radio} from 'antd';
import {Form} from '@ant-design/compatible'
import {InboxOutlined, UploadOutlined} from '@ant-design/icons';
import {connect} from "dva";

import styles from './index.less';

const {Dragger} = Upload;


const CollectionCreateForm = Form.create({
  name: 'form_in_modal',
})(
  // eslint-disable-next-line
  class extends React.Component {

    render() {
      const {visible, onCancel, onCreate, albumID} = this.props;
      const props = {
        name: 'file',
        multiple: true,
        action: '/api/photo/upload',
        listType: 'picture',
        data: {album_id: albumID},
        onChange(info) {
          const {status} = info.file;
          if (status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (status === 'done') {
            message.success(`文件 ${info.file.name} 上传成功.`);
          } else if (status === 'error') {
            message.error(`文件 ${info.file.name} 上传失败.`);
          }
        },
      };
      return (
        <Modal
          visible={visible}
          title="上传照片"
          okText="完成"
          cancelText="关闭"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined/>
            </p>
            <p className="ant-upload-text">点击或将文件拖拽至此上传</p>
          </Dragger>
        </Modal>
      );
    }
  },
);

class CollectionsPage extends React.Component {
  constructor(props) {
    super(props);
    console.log("CollectionPageProps: ", props)
  }

  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  handleCreate = () => {
    const {form} = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({
        visible: false,
      });
    });
    this.props.dispatch({
      type: 'photo/fetchByAlbum',
      payload: this.props.albumID
    })
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div className={styles.container}>
        <div id="components-form-demo-form-in-modal">
          <div>
            <Button
              type="dashed"
              onClick={this.showModal}
              icon={<UploadOutlined/>}
            >
              上传
            </Button>
            <CollectionCreateForm
              wrappedComponentRef={this.saveFormRef}
              visible={this.state.visible}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
              albumID={this.props.albumID}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(() => ({
}))(CollectionsPage);
