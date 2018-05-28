import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as postActions from 'store/modules/post';
import * as baseActions from 'store/modules/base';
import PostDetail from 'components/post/PostDetail/PostDetail';
import storage from 'lib/storage';
import { withRouter } from 'react-router-dom';

class PostDetailContainer extends Component {

    getPostDetail = async () => {
        const { PostActions, id } = this.props;

        let config = null;
        let token = storage.get('token');

        if (token) {
            config = {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Token ${token}`
                }
            };
        };

        try {
            await PostActions.getPostDetail({ id }, config);
        } catch (e) {
            console.log(e);
        }
    }

    checkLogged = async () => {
        const { BaseActions, history } = this.props;

        try {
            let config = null;
            let token = storage.get('token');

            if (token) {
                config = {
                    headers: {
                        'content-type': 'application/json',
                        'Authorization': `Token ${token}`
                    }
                };
            };
            await BaseActions.checkLogged(config);

            if (!this.props.logged) {
                history.push("/auth/login");
            }
            BaseActions.setAuthChecked();

        } catch (e) {
            history.push("/auth/login");
        }
    }


    componentDidMount() {
        this.checkLogged();
        this.getPostDetail();
    }

    playNext = () => {
        const { PostActions } = this.props;
        PostActions.playNext();
        // await this.setPlaying();
    }

    playPrev = () => {
        const { PostActions } = this.props;
        PostActions.playPrev();
        this.setPlaying();
    }

    setPlaying = () => {
        const { PostActions } = this.props;
        PostActions.setPlaying();
    }

    setStop = () => {
        const { PostActions } = this.props;
        PostActions.setStop();
    }

    initialize = () => {
        const { PostActions } = this.props;

        PostActions.initialize();
    }

    componentWillUnmount() {
       
        this.initialize();
    }

    handleSelect = ({ index }) => {
        const { PostActions } = this.props;
        PostActions.selectSong({ index });
    }

    render() {
        const { postDetail, tracks, playing, current, url } = this.props;
        const { playNext, playPrev, setPlaying, setStop, handleSelect } = this;
        if(!this.props.adminChecked) return null;
        return (
            <PostDetail
                post={postDetail}
                tracks={tracks}
                playNext={playNext}
                playPrev={playPrev}
                setPlaying={setPlaying}
                setStop={setStop}
                onSelect={handleSelect}
                playing={playing}
                current={current}
                mediaUrl={url} />
        )
    }
}
export default connect(
    (state) => ({
        postDetail: state.post.get('postDetail'),
        tracks: state.post.get('tracks'),
        playing: state.post.getIn(['player', 'playing']),
        current: state.post.getIn(['player', 'current']),
        url: state.post.getIn(['player', 'url']),
        logged: state.base.get('logged'),
        adminChecked: state.base.get('adminChecked')
    }),
    (dispatch) => ({
        PostActions: bindActionCreators(postActions, dispatch),
        BaseActions: bindActionCreators(baseActions, dispatch)
    })
)(withRouter(PostDetailContainer));