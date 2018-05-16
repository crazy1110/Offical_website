import React from 'react';
import ReactDOM from 'react-dom';
import { enquireScreen } from 'enquire-js';
import ScrollAnim from 'rc-scroll-anim';

import Nav from './Nav';
import Content0 from './Content0';
import Content1 from './Content1';
import Content2 from './Content2';
import Content3 from './Content3';
import Footer from './Footer';

import './less/antMotion_style.less';

const scrollScreen = ScrollAnim.scrollScreen;

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
      show: !location.port,
    };
  }

  componentDidMount() {
    // 实现整屏滚动
    const docHeight = ReactDOM.findDOMNode(this).getBoundingClientRect().height;
    scrollScreen.init({ docHeight });
    // 适配手机屏幕;
    enquireScreen((b) => {
      this.setState({ isMobile: !!b });
    });
    // dva 2.0 样式在组件渲染之后动态加载，导致滚动组件不生效；线上不影响；
    if (location.port) {
      // 样式 build 时间在 200-300ms 之间;
      setTimeout(() => {
        this.setState({
          show: true,
        });
      }, 500);
    }
  }

  render() {
    const children = [
      <Nav id="nav_0_0" key="nav_0_0" isMobile={this.state.isMobile}/>,
      <Content0 id="content_1_0" key="content_1_0" isMobile={this.state.isMobile}/>,
      <Content1 id="content_9_0" key="content_9_0" isMobile={this.state.isMobile}/>,
      <Content2 id="content_4_0" key="content_4_0" isMobile={this.state.isMobile}/>,
      <Content3 id="content_8_0" key="content_8_0" isMobile={this.state.isMobile}/>,
      <Footer id="footer_0_0" key="footer_0_0" isMobile={this.state.isMobile}/>,
    ];
    return (
      <div className="templates-wrapper">
        {this.state.show && children}
      </div>
    );
  }
}
