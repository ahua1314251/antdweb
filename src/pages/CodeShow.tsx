import React, { useState } from 'react';
import { Row, Col, Input } from 'antd';
import CodeMirror from '@uiw/react-codemirror';
import dataBaseApi from '../utils/DataBaseApi'
import 'codemirror/lib/codemirror.js'
@import 'codemirror/lib/codemirror.css';

//导入使用的语言语法定义文件
require("codemirror/mode/python/python.js");
require("codemirror/mode/javascript/javascript.js");
require("codemirror/mode/clike/clike.js");
require("codemirror/mode/shell/shell.js");
//导入选中的theme文件
require("codemirror/theme/blackboard.css");
//导入自动提示核心文件及样式
require("codemirror/addon/hint/show-hint.css");
require("codemirror/addon/hint/show-hint.js");
//导入指定语言的提示文件
require("codemirror/addon/hint/javascript-hint.js");



// 主题风格
import 'codemirror/theme/solarized.css';
// 代码模式，clike是包含java,c++等模式的
import 'codemirror/mode/clike/clike.js';
import 'codemirror/mode/css/css.js';
//ctrl+空格代码提示补全
@import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/anyword-hint.js';
//代码高亮
import 'codemirror/addon/selection/active-line.js';


class CodeShow extends React.Component {

    constructor(props: Readonly<{}>) {
        super(props);
        const paramsString = props.location.search.substring(1)
        const searchParams = new URLSearchParams(paramsString)
        const param = JSON.parse(searchParams.get('param'));
        this.createCode(param);
        this.instance = null;
    }
    state = {
        data: []
    }

    createCode = async (param) => {
        const response = await dataBaseApi.createCode(param);
        this.setState({ data: response.data })
    };

    showMirrors = (templates, options) => {
        let res =[];  
           {templates.forEach(item => {
                console.log(item);
                res.push(
                <Col span={6}>
                    {item.templateName}
                    <CodeMirror value={item.result} options={options} height={400} />
                </Col>)
            })}
        return res
    
    }


    render() {
        const { data } = this.state;
        const options = {

            height: 100,
            mode: { name: 'text/x-java' },
            line: true,
            theme: 'solarized dark',
            autofocus: true,//自动获取焦点
            styleActiveLine: true,//光标代码高亮
            lineNumbers: true, //显示行号
            smartIndent: true,  //自动缩进
            //start-设置支持代码折叠
            lineWrapping: true,
            foldGutter: true,
            gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],//end
            extraKeys: {
                "Ctrl": "autocomplete",
                "Ctrl-S": function (editor) {
                    that.codeSave(editor)
                },
                "Ctrl-Z": function (editor) {
                    editor.undo();
                },//undo
                "F8": function (editor) {
                    editor.redo();
                },//Redo
            },
            matchBrackets: true,  //括号匹配，光标旁边的括号都高亮显示
            autoCloseBrackets: true //键入时将自动关闭()[]{}''""
        }
        return (
            <div>

<Row>
                {this.showMirrors(data,options)}
                </Row>
            </div>

        );
    };
}

export default CodeShow;