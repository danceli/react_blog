import React from 'react';
import './index.css';
import 'aplayer/dist/APlayer.min.css';
import APlayer from 'aplayer';
import { getMusic } from '@/http/Home'
class Audio extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      player: null,
    }
  }
  async componentDidMount() {
    const datas = await this.getFormatData();
    this.initMusic(datas);
  }
  componentWillUnmount() {
    this.state.player = null;
    this.el = null;
  }
  async getFormatData() {
    return await getMusic();
  }
  initMusic(datas) {//初始化音乐播放器
    //1.得到后台数据http://localhost:8080/mp3/川井憲次 - 潇湘子.mp3
    if(!this.el) return;
    this.setState({ player: new APlayer({
      container: this.el,
      audio: [...datas]
    }) })
  }
  render() {
    return (
      <div id="audio-container">
        <div id="player-wrap" ref={ el => this.el = el }></div>
      </div>
    )
  }
}

export default Audio;