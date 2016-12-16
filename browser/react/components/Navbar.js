import React, { Component } from 'react';
import { Link } from 'react-router';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

export default class Navbar extends Component {

  constructor(props){
    super(props);
    this.state = {
      theme: 'light',
      current: '1'
    }
  }

  handleClick(e) {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  render() {
    return (
      <Menu
        theme={this.state.theme}
        onClick={this.handleClick}
        style={{ width: 240 }}
        defaultOpenKeys={['sub1']}
        selectedKeys={[this.state.current]}
        mode="inline"
      >
        <Menu.Item key="home"><span><Icon type="home" /><span><Link to='/'>ホーム</Link></span></span></Menu.Item>
        <SubMenu key="sub1" title={<span><Icon type="book" /><span>季語一覧</span></span>}>
          <SubMenu key="sub3" title="季節別">
            <Menu.Item key="7">春</Menu.Item>
            <Menu.Item key="8">夏</Menu.Item>
            <Menu.Item key="9">秋</Menu.Item>
            <Menu.Item key="10">冬</Menu.Item>
          </SubMenu>
          <SubMenu key="sub5" title="季題別">
            <Menu.Item key="11">人事・風習</Menu.Item>
            <Menu.Item key="12">動物</Menu.Item>
            <Menu.Item key="13">植物</Menu.Item>
            <Menu.Item key="14">自然</Menu.Item>
            <Menu.Item key="15">食べ物</Menu.Item>
          </SubMenu>
          <Menu.Item key="3"><span><Icon type="heart-o" /><span>お気に入り</span></span></Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title={<span><Icon type="appstore-o" /><span>和歌一覧</span></span>}>
          <Menu.Item key="5"><span><Icon type="user" /><span>作家別</span></span></Menu.Item>
          <Menu.Item key="6"><span><Icon type="heart-o" /><span>お気に入り</span></span></Menu.Item>
        </SubMenu>
        <SubMenu key="sub4" title={<span><Icon type="question" /><span>ヘルプメニュー</span></span>}>
          <Menu.Item key="16">このウエブサイトについて</Menu.Item>
          <Menu.Item key="17">和歌友の使い方</Menu.Item>
          <Menu.Item key="18">お問い合わせ</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
};