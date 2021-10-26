import React, { useState } from 'react';
import { Row, Col, Table, Modal, Button, Form, Select, Checkbox,Input,Space } from 'antd';
import dataBaseApi from '../utils/DataBaseApi'
class DataCosole extends React.Component {
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
        const response = await dataBaseApi.getTablelist({});
        this.setState({ loading: false, data: response.data })
    }

    showModal = (record) => {
        this.setIsModalVisible(true);
        this.formRef.current!.setFieldsValue({sqlId:record.id});
    };

    handleOk = async () => {
        const param =  this.formRef.current!.getFieldValue();
        window.open('/CodeShow.html?param='+ JSON.stringify(param))
        this.setIsModalVisible(false);
    };


    downloadCode = async (record) => {
        this.formRef.current!.setFieldsValue({sqlId:record.id});
        const param =  this.formRef.current!.getFieldValue();
        window.open('/database/downloadCode?param='+ JSON.stringify(param))
        this.setIsModalVisible(false);
    };

    handleCancel = () => {
        this.setIsModalVisible(false);
    };
    setIsModalVisible = (isModalVisible) => {
        this.setState({ isModalVisible: isModalVisible })
    };

    showAction = (record) => {
        return ( <Space size="middle"><div className='ant-space-item' ><Button size="small"  type="primary" onClick={() => { this.showModal(record); } }>生成代码</Button></div>
        
        <div className='ant-space-item' ><Button size="small"  type="primary" onClick={() => { this.downloadCode(record); } }>下载代码</Button></div> </Space>)
    }





    render() {
        const { loading, data } = this.state
        return (<div>
            <Row>
                <Col span={24}>
                    <Table dataSource={data}
                        rowKey={record => record.tableName}
                        loading={loading}
                        onChange={this.handleTableChange}
                        pagination={{ showSizeChanger: true }}
                        size={'small'}
                    >
                        <Table.Column title="数据库名称" dataIndex="dbName" key="dbName" />
                        <Table.Column title="数据库类型" dataIndex="dbType" key="dbType" />
                        <Table.Column title="表名称" dataIndex="tableName" key="tableName" />
                        {/* <Table.Column title="建表语句" dataIndex="sql" key="sql" /> */}
                        <Table.Column title="修改时间" dataIndex="gmtModified" key="gmtModified" />
                        <Table.Column title="操作" key="action"  render={(text, record)=>this.showAction(record)} />

                    </Table>
                    <br />
                </Col>
            </Row>
<Form name="validate_other" layout={'vertical'} ref={this.formRef}
 initialValues={{'templateNames': ['javaDO', 'queryDO','mapperInterface','mapperXml','mapperService','mapperController','antdTable']}}>

<Modal title="Basic Modal" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel} width={800} maskClosable = {false}>

<Form.Item name="sqlId" label="sqlId" hidden={true} >
<Input />
</Form.Item>
<Form.Item name="templateNames" label="生成模板">
<Checkbox.Group>
<Checkbox value="javaDO" style={{ lineHeight: '32px' }}>javaDO</Checkbox>
<Checkbox value="queryDO" style={{ lineHeight: '32px' }}>javaDO</Checkbox>
<Checkbox value="mapperInterface" style={{ lineHeight: '32px' }} >mapperInterface</Checkbox> 
<Checkbox value="mapperXml" style={{ lineHeight: '32px' }} >mapperXml</Checkbox> 
<Checkbox value="mapperService" style={{ lineHeight: '32px' }} >mapperService</Checkbox> 
<Checkbox value="mapperController" style={{ lineHeight: '32px' }} >mapperController</Checkbox> 
<Checkbox value="antdTable" style={{ lineHeight: '32px' }} >antdTable</Checkbox> 
</Checkbox.Group>
</Form.Item>
</Modal>
</Form>
        </div>
        );
    };
}

export default DataCosole;