import React from 'react';
import {Row,Col} from 'antd';

class DataCosole extends React.Component {

    render(){
        return (<div>DataCosole
            <Row>
      <Col span={6}>col-6</Col>
      <Col span={18}>col-18</Col>
    </Row>
            
    </div>
            );
    };
}

export default DataCosole;