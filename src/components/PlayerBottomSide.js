import {
  faBackwardStep, faForwardStep, faHeart,
  faPause, faPlay, faRepeat, faShuffle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { setSongPlayedAct } from '../actions';
import '../styles/playerBottomSide.css';

export const PlayerBottomSide = () => {
  // const [isPlaying, setIsPlaying] = useState(false);
  // const [isFavorite, setIsFavorite] = useState(false);
  const state = useSelector((globalState) => ({
    musicsToPlayer: globalState.musicsToPlayer,
    played: globalState.musicsToPlayer.played,
  }));
  const { musicsToPlayer, played } = state;

  // useEffect(() => {}, [played.status]);

  console.log(state);
  const dispatch = useDispatch();
  const setPlayedSongs = (objInsidePlayed) => dispatch(setSongPlayedAct(objInsidePlayed));

  // https://www.youtube.com/watch?v=sqpg1qzJCGQ - building some parts of this player with Amy's help
  const audioPlayer = useRef(); // reference for our audio component

  const play = () => {
    audioPlayer.current.play();
    setPlayedSongs({ ...played, status: true });
  };

  const pause = () => {
    audioPlayer.current.pause();
    setPlayedSongs({ ...played, status: false });
  };

  const handlePlayButton = () => {
    // setIsPlaying(!isPlaying);

    console.log(played.status);
    return played.status ? pause() : play();
  };

  return (
    <div className="player-container">
      <div className="music-player-info">
        <div className="artist-infos">
          <p className="music-name-player tdh tc">Music name</p>
          <p className="artist-name-player tdh tc">Artist</p>
        </div>
        <div className="favorite-player-container">
          {/* <label htmlFor="fav-button-player"> */}
          <label htmlFor="fbp">
            <input type="checkbox" id="fbp" name="" id="" />
            <FontAwesomeIcon icon={ faHeart } className="heartIcon-player" />
          </label>
          {/* </label> */}
        </div>
      </div>

      <div className="central-player-buttons">
        <audio ref={ audioPlayer } src="" />
        <div className="tsp-w mb-5">
          <div className="tsp">
            <button
              type="button"
              className="control-player-buttons"
            >
              <FontAwesomeIcon
                icon={ faShuffle }
                className="tsp-i"
              />
            </button>

            <button
              type="button"
              className="control-player-buttons"
            >
              <FontAwesomeIcon
                icon={ faBackwardStep }
                className="tsp-i"
              />
            </button>

            <button
              type="button"
              className="control-player-buttons pb"
              onClick={ handlePlayButton }
            >
              {
                played.status
                // isPlaying
                  ? <FontAwesomeIcon className="pbcs" icon={ faPause } />
                  : <FontAwesomeIcon className="pbcs" icon={ faPlay } />
              }
            </button>

            <button
              type="button"
              className="control-player-buttons"
            >
              <FontAwesomeIcon
                icon={ faForwardStep }
                className="tsp-i"
              />
            </button>

            <button
              type="button"
              className="control-player-buttons"
            >
              <FontAwesomeIcon
                icon={ faRepeat }
                className="tsp-i"
              />
            </button>
          </div>
        </div>

        <div className="bsp">

          {/* duration before */}
          <div className="dfs mr-5">
            0:00
          </div>

          <input type="range" className="progress-bar" id="" />

          {/* duration total */}
          <div className="dfs ml-5">
            5:00
          </div>
        </div>
      </div>

      <div className="right-player-buttons">
        <div>buttons / volume</div>
      </div>
    </div>
  );
};

export default PlayerBottomSide;
