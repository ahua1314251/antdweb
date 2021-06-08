// import AsyncCompnent from "../components/common/AsyncComponent";
import DataConsole from "../pages/DataConsole"
import Monitor from "../pages/Monitor"
import DataTemplate from "../pages/DataTemplate"
import * as React from 'react';


// const DataConsole = AsyncCompnent(() => import("../pages/DataConsole"));
// const Monitor = AsyncCompnent(() => import("../pages/Monitor"));

import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    VideoCameraOutlined,
    UploadOutlined,
  } from '@ant-design/icons';

const ROUTES = [
    {
        key: 'DataConsole',
        path: '/DataConsole.html',
        iconType: <MenuUnfoldOutlined />,
        text: '数据库控制台',
        component: DataConsole
    }, 
    {
        key: 'DataTemplate',
        path: '/DataTemplate.html',
        iconType: <VideoCameraOutlined />,
        text: '生成器模板管理',
        component: DataTemplate
    },{
        key: 'Monitor',
        path: '/Monitor.html',
        iconType: <VideoCameraOutlined />,
        text: '监控',
        component: Monitor
    }
];

export { ROUTES };








