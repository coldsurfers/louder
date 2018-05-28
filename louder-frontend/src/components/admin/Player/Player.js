import React, { Component, Fragment } from 'react';
import styles from './Player.scss';
import classNames from 'classnames/bind';
import ReactAudioPlayer from 'react-audio-player';
import ForwardButton from 'react-icons/lib/md/fast-forward';
import BackwardButton from 'react-icons/lib/md/fast-rewind';
import NonSelectedPlayButton from 'react-icons/lib/md/play-circle-outline';
import SelectedPlayButton from 'react-icons/lib/md/play-circle-filled';
import StopButton from 'react-icons/lib/md/stop';
import PausedCircle from 'react-icons/lib/md/pause-circle-outline';
import SettingButton from 'react-icons/lib/md/settings-applications';
import SettingMenu from 'components/common/SettingMenu/SettingMenu';
import SettingMenuContainer from '../../../containers/SettingMenuContainer';
import {
  ChasingDots,
  Circle,
  CubeGrid,
  DoubleBounce,
  FadingCircle,
  FoldingCube,
  Pulse,
  RotatingPlane,
  ThreeBounce,
  WanderingCubes,
  Wave
} from 'better-react-spinkit'

const cx = classNames.bind(styles);

class Player extends Component {

  
  state = {
    progress: 0,
    album_track_file_length: 0,
    current_track_number: 0,
    album_tracks: [],
    duration: 0,
    currentTime: 0,
    readyState: 0
  };

  StopPlaying = () => {
    this.rap.audioEl.currentTime = 0;
    this.rap.audioEl.pause();
  }

  PausePlaying = () => {
    this.rap.audioEl.pause();
  }

  PlayMusic = () => {
    
    const { setPlaying } = this.props;
    setPlaying();
    if (!this.rap.audioEl.paused) {
      this.PausePlaying();
      return;
    }

    // console.log()
    this.rap.audioEl.play();
    this.setState({
      duration: this.rap.audioEl.duration
    });
  }

  PlayNext = async () => {
    const { album_tracks,
      current_track_number,
      last_track_number,
      onIncrease,
      setToZero,
      setPlaying } = this.props;
      // console.log(album_tracks);
    if (current_track_number === last_track_number) {
      await setToZero();

    } else {
      await onIncrease();
    }

    this.rap.audioEl.src = await `/media/tracks/${album_tracks[this.props.current_track_number]}`;
    await this.rap.audioEl.play();
    if (!this.props.isPlaying) {
      await setPlaying();
    }
    this.setState({
      duration: this.rap.audioEl.duration
    });

  }

  PlayPrev = async () => {
    const { album_tracks,
      current_track_number,
      onDecrease,
      setToLast,
      setPlaying } = this.props;
    if (current_track_number === 0) {
      await setToLast();
    } else {
      await onDecrease();
    }

    this.rap.audioEl.src = await `/media/tracks/${album_tracks[this.props.current_track_number]}`;
    await this.rap.audioEl.play();
    if (!this.props.isPlaying) {
      await setPlaying();
    }
    this.setState({
      duration: this.rap.audioEl.duration
    });
  }

  setProgress = (e) => {
    const target = e.target.id === "played-bar" ? e.target.parentNode : e.target;
    const width = target.clientWidth;
    const rect = target.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const duration = this.rap.audioEl.duration;
    const currentTime = (duration * offsetX) / width;
    const progress = (currentTime * 100) / duration;
    this.rap.audioEl.currentTime = currentTime;
    // console.log(progress);
    console.log(currentTime);

  }

  updateProgress = () => {
    const { duration, currentTime } = this.rap.audioEl;
    const progress = (currentTime * 100) / duration;
    console.log(parseInt(currentTime, 10));

    this.setState({
      progress: progress,
      currentTime: currentTime
    });
  };

  componentDidMount() {
    console.log(this.rap.audioEl);
    this.rap.audioEl.addEventListener('timeupdate', e => {
      this.updateProgress();
    });
    
  }

  

  componentWillUnmount() {
    
    const { onUnmount } = this.props;
    this.rap.audioEl.removeEventListener('timeupdate', e => {
      this.updateProgress();
    });
    onUnmount();

  }

  setCurrentTrackNumber = async (e) => {
    const { setCurrentTrackNumber, album_tracks, setPlaying } = this.props;
    const { id } = e.target;
    await setCurrentTrackNumber({track_number: id});

    this.rap.audioEl.src = await `/media/tracks/${album_tracks[this.props.current_track_number]}`;
    await this.rap.audioEl.play();
    if (!this.props.isPlaying) {
      await setPlaying();
    }
    this.setState({
      duration: this.rap.audioEl.duration
    });
  }

  canPlay = () => {
    this.setState({
      readyState: this.rap.audioEl.readyState
    });
  }

  render() {
    
    const { post } = this.props;
    const { setCurrentTrackNumber, canPlay } = this;

    let playedBarStyle = {
      width: this.state.progress + "%"
    };


    const song_name_arr = post.song_names.split(", ");
    const songList = song_name_arr.map(
      (name, i) => {
        return (
          <div className={cx('song')} key={i} id={i} onClick={setCurrentTrackNumber}>
            {name}
          </div>
        )
      }
    );

    const secondsToTimeString = function (seconds) {

      var ms = Math.floor((seconds * 1000) % 1000);
      var s = Math.floor(seconds % 60);
      var m = Math.floor((seconds * 1000 / (1000 * 60)) % 60);
      var strFormat = "MM:SS";

      if (s < 10) s = "0" + s;
      if (m < 10) m = "0" + m;
      if (ms < 10) ms = "0" + ms;

      strFormat = strFormat.replace(/MM/, m);
      strFormat = strFormat.replace(/SS/, s);
      // strFormat = strFormat.replace(/XX/, ms.toString().slice(0,2));

      return strFormat;
    }

    

    const { PlayMusic, 
            PlayNext, 
            PlayPrev, 
            StopPlaying, 
            PausePlaying, 
            setProgress } = this;
    const { album_tracks, isPlaying, onToggle, settingVisible } = this.props;
    

    return (
      <Fragment>
        {
          this.state.readyState !== 4 && 
          <div className={cx('loading')}>
          <ChasingDots size={100} color='black'/>
          </div>
        }
      <div className={cx('Player')} style={{display: this.state.readyState === 4 ? "block" : "none"}}>
        <ReactAudioPlayer
          onCanPlay={canPlay}
          ref={(element) => { this.rap = element; }}
          src={`/media/tracks/${album_tracks[0]}`} />

        <div className={cx('contents')}>
          <div className={cx('title')}>
            {post.title}
          </div>
          <div className={cx('artist')}>
            {post.artist_name}
          </div>
          <div className={cx('setting-wrapper')}>
            <SettingButton id="settingButton" onClick={onToggle}/>
          </div>
          <div className={cx('menu-wrapper')}>
            {/* <SettingMenu visible={settingVisible}/> */}
            {/* <SettingMenuContainer/> */}
          </div>
          <div className={cx('image')}>
            <img src={post.album_cover} className={cx('cover')} alt="albumCover" />
          </div>
          <div className={cx('progress-wrapper')}>
            <div className={cx('progress-bar')} onClick={setProgress}>
              <div id="played-bar" className={cx('played-bar')} style={playedBarStyle}>
              </div>
            </div>
            <div className={cx('duration-wrapper')}>
              <div className={cx('duration')}>
                {
                  this.state.duration !== 0 &&
                  `${secondsToTimeString(this.state.currentTime)}/${secondsToTimeString(this.state.duration)}`

                }
              </div>
            </div>
          </div>
          <div className={cx('controls')}>
            <div className={cx('prev')} onClick={PlayPrev}>
              <BackwardButton />
            </div>
            <div className={cx('play')} onClick={PlayMusic}>
              {
                isPlaying ?
                  <PausedCircle /> : <NonSelectedPlayButton />
              }
            </div>
            <div className={cx('next')} onClick={PlayNext}>
              <ForwardButton />
            </div>

            {/* <div className={cx('stop')} onClick={StopPlaying}>
              <StopButton />
            </div>
            <div className={cx('stop')} onClick={PausePlaying}>
              Pause
             </div> */}
          </div>
          <div className={cx('song-list')}>
            {
              songList
            }
          </div>
        </div>
      </div>
      </Fragment>
    );
  }
}

export default Player;