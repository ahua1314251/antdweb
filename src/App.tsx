import React, { Component } from 'react';
import './App.css';
import { Layout, Menu  } from 'antd';
import { Route ,Link,useLocation,withRouter} from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';

import { ROUTES as routes  } from "./config/routes.config.tsx";

const { Header, Sider, Content } = Layout;



class App extends React.Component {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      collapsed: false,
      defaultSelectedKeys:'DataConsole'
    };
 
    let pathname = this.props.location.pathname;
    routes.map((route) =>{
      if(pathname == route.path){
        this.state.defaultSelectedKeys=route.key
    }})
  }


  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  showMenuItem = (route) => {
    if (route.menuShow) {
      return (<Menu.Item key={route.key}>
        {route.iconType}
        <Link to={route.path} > {route.text}</Link>
      </Menu.Item>)
    }
  };

  render() {
    return (
      <Layout className ='fullHeight'>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys = {this.state.defaultSelectedKeys} >
           {
                    routes.map((route) =>{
                    return this.showMenuItem(route);
                    }
                    )
                }
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
        {
                                routes.map((route) =>
                                    <Route exact key={route.key} path={route.path} component={route.component}/>)
             }

          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(App);
