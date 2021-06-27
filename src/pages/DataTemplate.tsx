import React, { useState } from 'react';
import { Row, Col, Table, Modal, Button, Form, Space, Checkbox,Input } from 'antd';
import dataBaseApi from '../utils/DataBaseApi'
import TextArea from '_antd@4.2.5@antd/lib/input/TextArea';
import { FormInstance } from 'antd/lib/form';
class DataTemplate extends React.Component {
    formRef = React.createRef<FormInstance>();
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            isModalVisible: false,
            data: [],
            loading: false,
            pagination: {
                current: 1,
                pageSize: 10,
            }
        }
    }
    
    componentDidMount() {
        this.getTableList(null);
    }
    handleTableChange = (pagination, filters, sorter) => {
        console.log(pagination);
        this.getTableList(pagination);
    }

    getTableList = async (pagination) => {
        this.setState({ loading: true })
        const response = await dataBaseApi.getTemplatelist({});
        this.setState({ loading: false, data: response.data })
    }

    showModal = (record) => {
        this.setIsModalVisible(true);
        this.formRef.current!.setFieldsValue(record);
    }

    handleOk = async() => {
        const param = this.formRef.current!.getFieldValue();
        if(param.id != null){
        const response = await dataBaseApi.updateTemplate(param);
        }else 
        {
        const response = await dataBaseApi.createTemplate(param);
        }
        this.setIsModalVisible(false);
        this.getTableList(null);

    }


    handleCancel = () => {
        this.setIsModalVisible(false);
        this.formRef.current!.resetFields();
    }

    setIsModalVisible = (isModalVisible) => {
        this.setState({ isModalVisible: isModalVisible })
    }

    showAction = (record) => {
        return (<Button  size="small" type="primary" onClick={()=>{this.showModal(record)} }>修改</Button>)
    }



    render() {
        const { loading, data } = this.state;

        return (<div>
            <Row>
                <Col span={24}>
                <Space style={{ marginBottom: 16 }}>
          <Button type="primary" size="small" danger onClick={()=>{this.showModal({})}>新增</Button>
        </Space>
                    <Table dataSource={data}
                        rowKey={record => record.tableName}
                        loading={loading}
                        onChange={this.handleTableChange}
                        pagination={{ showSizeChanger: true }}
                        size='small'
                    >
                        <Table.Column title="模板名称" dataIndex="templateName" key="templateName" />
                        <Table.Column title="数据库类型" dataIndex="dbType" key="dbType" />
                        <Table.Column title="模板类型" dataIndex="templateType" key="templateType" />
                        {/* <Table.Column title="建表语句" dataIndex="sql" key="sql" /> */}
                        <Table.Column title="修改时间" dataIndex="gmtModified" key="gmtModified" />
                        <Table.Column title="操作" key="action" render={(text, record)=>this.showAction(record)} />
                    </Table>
                    <br />

                </Col>

            </Row>
<Form name="validate_other" layout={'vertical'}  ref={this.formRef} >
<Modal title="模板编辑" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel} width={800} 
maskClosable = {false}
>

<Form.Item name="id" label="id" hidden={true}>
<Input />
</Form.Item>
<Form.Item name="templateName" label="模板名称">
<Input />
</Form.Item>
<Form.Item name="templateType" label="模板类型">
<Input />
</Form.Item>
<Form.Item name="dbType" label="数据库类型">
<Input />
</Form.Item>
<Form.Item name="content" label="模板内容">
<TextArea  rows={4} />
</Form.Item>

</Modal>
</Form>
        </div>
        );
    };
}

export default DataTemplate;