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
    // this.setState({
    //   current: e.key,
    // });
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
            <Menu.Item key="7"><Link to={'kigo/season/春'} onClick={()=> this.props.selectSeason('春')}>春</Link></Menu.Item>
            <Menu.Item key="8"><Link to={'kigo/season/夏'} onClick={()=> this.props.selectSeason('夏')}>夏</Link></Menu.Item>
            <Menu.Item key="9"><Link to={'kigo/season/秋'} onClick={()=> this.props.selectSeason('秋')}>秋</Link></Menu.Item>
            <Menu.Item key="10"><Link to={'kigo/season/冬'} onClick={()=> this.props.selectSeason('冬')}>冬</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="sub5" title="季題別">
            <Menu.Item key="19" ><Link to={'kigo/category/生活'} onClick={()=> this.props.selectCategory('生活')}>生活</Link></Menu.Item>
            <Menu.Item key="11" ><Link to={'kigo/category/行事'} onClick={()=> this.props.selectCategory('行事')}>行事</Link></Menu.Item>
            <Menu.Item key="12"><Link to={'kigo/category/動物'} onClick={()=> this.props.selectCategory('動物')}>動物</Link></Menu.Item>
            <Menu.Item key="13"><Link to={'kigo/category/地理'} onClick={()=> this.props.selectCategory('地理')}>地理</Link></Menu.Item>
            <Menu.Item key="14"><Link to={'kigo/category/天文'} onClick={()=> this.props.selectCategory('天文')}>天文</Link></Menu.Item>
            <Menu.Item key="15"><Link to={'kigo/category/時候'} onClick={()=> this.props.selectCategory('時候')}>時候</Link></Menu.Item>
            <Menu.Item key="20"><Link to={'kigo/category/植物'} onClick={()=> this.props.selectCategory('植物')}>植物</Link></Menu.Item>
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