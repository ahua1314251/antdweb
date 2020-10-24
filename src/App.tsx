import * as React from 'react';

import './App.css';
import { Layout, Menu } from 'antd';
import { BrowserRouter as Router,Route, Link } from "react-router-dom";
import { browserHistory } from 'react-router'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import DataCosole from './pages/DataConsole';
import Monitor from './pages/Monitor';

const { Header, Sider, Content } = Layout;

class App extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Router history={browserHistory} >
      <Layout className ='fullHeight'>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              {/* <UserOutlined /> */}
              
              <Link  to="/DataCosole"><span>数据库控制台     </span></Link>
         
            </Menu.Item>
            <Menu.Item key="2">
              <VideoCameraOutlined />
              <Link  to="/Monitor"><span>系统监控     </span></Link>
            </Menu.Item>
            <Menu.Item key="3">
              <UploadOutlined />
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout fullHeight">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
          </Header>
          <Content
            className="site-layout-background content"
            style={{
              margin: '24px 16px',
              padding: 24
            }}
          >
             <Route exact path="/DataCosole.html" component={DataCosole} />
             <Route exact path="/" component={Monitor} />
             <Route exact path="/Monitor.html" component={Monitor} />
             


          </Content>
        </Layout>
      </Layout>
      </Router>
    );
  }
}

export default App;
