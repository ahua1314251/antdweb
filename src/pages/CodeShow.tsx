import React, { useState } from 'react';
import { Row, Col, Input } from 'antd';
import dataBaseApi from '../utils/DataBaseApi'
import {UnControlled as CodeMirror} from 'react-codemirror2'

import 'codemirror/mode/xml/xml';


class CodeShow extends React.Component {
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

    createCode = async () => {
        const param =  this.formRef.current!.getFieldValue();
        const response = await dataBaseApi.createCode(param);
        this.setIsModalVisible(false);
    };


    render() {
        return (
        <div>
            <Row>
                <Col span={24}>qeqwe
                <CodeMirror
  value='<h1>I ♥ react-codemirror2</h1>'
  options={{
    mode: 'xml',
    lineNumbers: true
  }}
  onChange={(editor, data, value) => {
  }}
/>
                </Col>
            </Row>
        </div>
        );
    };
}

export default CodeShow;