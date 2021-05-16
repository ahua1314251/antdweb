import React from 'react';
import { Row, Col, Table } from 'antd';
import dataBaseApi from '../utils/DataBaseApi'
class DataCosole extends React.Component {

    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            pagination: {
                current: 1,
                pageSize: 10,
              }
        }
    }
     componentDidMount(){
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


    render() {
        const { loading, data } = this.state
        return (<div>
            <Row>
                <Col span={24}>
                    <Table dataSource={data} 
                    rowKey={record => record.tableName} 
                    loading={loading} 
                    onChange={this.handleTableChange} 
                    pagination={ {showSizeChanger: true}}
                    size = {'small'}
                    >
                        <Table.Column title="表名称" dataIndex="tableName" key="tableName" />

                    </Table>
<br/>

                </Col>

            </Row>

        </div>
        );
    };
}

export default DataCosole;