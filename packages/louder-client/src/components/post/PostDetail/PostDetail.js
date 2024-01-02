import React, { Fragment, Component } from "react";
import classNames from "classnames/bind";
import PausedCircle from "react-icons/lib/md/pause-circle-outline";
import SettingButton from "react-icons/lib/md/settings-applications";
import ForwardButton from "react-icons/lib/md/fast-forward";
import BackwardButton from "react-icons/lib/md/fast-rewind";
import NonSelectedPlayButton from "react-icons/lib/md/play-circle-outline";
import ReactAudioPlayer from "react-audio-player";
import styles from "./PostDetail.scss";

const cx = classNames.bind(styles);

class PostDetail extends Component {
  state = {
    progress: 0,
    currentTime: 0,
    readyState: 0,
  };

  Play = () => {
    const { setStop, setPlaying, playing } = this.props;
    console.log(playing)
    if (playing) {
      this.rap.audioEl.current.pause();
      setStop();
      return;
    }
    this.rap.audioEl.current.play();
    setPlaying();
  };

  handlePlayNext = async () => {
    const { playNext } = this.props;
    await playNext();
    this.rap.audioEl.current.play();
  };

  handlePlayPrev = async () => {
    const { playPrev } = this.props;
    await playPrev();
    this.rap.audioEl.current.play();
  };

  setProgress = (e) => {
    const target = e.target.id === "played" ? e.target.parentNode : e.target;
    const width = target.clientWidth;
    const rect = target.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const { duration } = this.rap.audioEl.current;
    const currentTime = (duration * offsetX) / width;
    const progress = (currentTime * 100) / duration;
    this.rap.audioEl.current.currentTime = currentTime;
    // console.log(progress);
    // console.log(currentTime);
  };

  updateProgress = () => {
    const { duration, currentTime } = this.rap.audioEl.current;
    const progress = (currentTime * 100) / duration;
    // console.log(parseInt(currentTime, 10));
    this.setState({
      progress,
      currentTime,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.post !== this.props.post) {
      this.rap.audioEl.current.addEventListener("timeupdate", (e) => {
        this.updateProgress();
      });
    }
  }

  handleMouseUp = (e) => {
    const { setPlaying } = this.props;
    document
      .getElementById("play-bar")
      .removeEventListener("mousemove", this.setProgress);
    window.removeEventListener("mouseup", this.handleMouseUp);
    this.rap.audioEl.current.play();
    setPlaying();
  };

  handleMouseDown = (e) => {
    this.rap.audioEl.current.pause();
    document
      .getElementById("play-bar")
      .addEventListener("mousemove", this.setProgress);
    window.addEventListener("mouseup", this.handleMouseUp);
  };

  componentWillUnmount() {
    // const { onUnmount } = this.props;
    this.rap.audioEl.current.removeEventListener("timeupdate", (e) => {
      this.updateProgress();
    });

    // onUnmount();
  }

  canPlay = () => {
    this.setState({
      readyState: this.rap.audioEl.current.readyState,
    });
  };

  handleSelect = async (e) => {
    this.rap.audioEl.current.pause();
    this.rap.audioEl.current.currentTime = 0;
    const { id } = e.target;
    const { onSelect, setPlaying } = this.props;
    await onSelect({ index: id });
    setPlaying();
    this.rap.audioEl.current.play();
  };

  render() {
    const { post, mediaUrl, playing } = this.props;
    const { handlePlayNext, handlePlayPrev, Play, setProgress, handleSelect } =
      this;
    if (post.size === 0) return null;

    const url = post.album_cover

    const songNamesArr = post.song_names;
    const songList = songNamesArr.map((song, i) => (
      <div id={i} key={i} onClick={handleSelect} className={cx("song")}>
        {song}
      </div>
    ));

    const playedBarStyle = {
      width: `${this.state.progress}%`,
    };
    return (
      <Fragment>
        <ReactAudioPlayer
          onCanPlay={this.canPlay}
          ref={(element) => {
            this.rap = element;
          }}
          src={mediaUrl}
        />
        <div className={cx("PostDetail")}>
          <div className={cx("contents")}>
            <div className={cx("title")}>{post.title}</div>
            <div className={cx("artist")}>{post.artist_name}</div>
            <div className={cx("cover-wrapper")}>
              <img src={`${url}`} alt="detailThumbnail" />
            </div>
            <div
              id="play-bar"
              className={cx("play-bar")}
              onMouseDown={this.handleMouseDown}
              onClick={setProgress}
            >
              <div
                id="played"
                className={cx("played")}
                style={playedBarStyle}
              />
            </div>
            <div className={cx("controls")}>
              <div className={cx("prev")}>
                <BackwardButton onClick={handlePlayPrev} />
              </div>
              <div className={cx("play")}>
                {playing ? (
                  <PausedCircle onClick={Play} />
                ) : (
                  <NonSelectedPlayButton onClick={Play} />
                )}
              </div>
              <div className={cx("next")}>
                <ForwardButton onClick={handlePlayNext} />
              </div>
            </div>
            <div className={cx("song-list")}>{songList}</div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default PostDetail;
