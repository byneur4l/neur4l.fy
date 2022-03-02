import { faClock, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ButtonPlay from './ButtonPlay';

class MusicCard extends Component {
  convertMillsToMin = (ms) => {
    const THOUSAND = 1000;
    const SIXTY = 60;

    const minutes = ((ms / THOUSAND) / SIXTY);
    const minutesHouse = Math.trunc(minutes);
    return minutesHouse;
  }

  convertMillsToSeconds = (ms) => {
    const THOUSAND = 1000;
    const SIXTY = 60;

    const seconds = ((ms / THOUSAND) % SIXTY);
    const secondsHouse = Math.round(seconds);

    const TEN = 10;
    if (secondsHouse < TEN) {
      const verifier = [0, secondsHouse];
      return verifier.join('');
    }
    return secondsHouse;
  }

  playAudio = ({ currentTarget }) => {
    const url = currentTarget.attributes.name.value;
    const players = document.querySelectorAll('audio');

    players.forEach((player) => {
      player.pause();
      player.volume = 0.2;
      return player.id === url ? player.play() : null;
    });
  }

  placeSelectedClass = ({ target }) => {
    const classToFind = document.querySelector('.selectedMusic');

    const addClass = target.classList.add('selectedMusic');

    if (classToFind) {
      const excClass = classToFind.classList.remove('selectedMusic');
      return excClass && addClass;
    }
    return addClass;
  }

  render() {
    const {
      albumTracks,
      handleCheck,
      checkedAndFavorite,
      match: { path },
    } = this.props;

    console.log(this.props);
    const favoritesPath = '/favorites';

    return (
      <div className="listMusic">

        <div className="musicRow filterRow">
          <div className="divTrackNumber">
            <p className="withoutHover albumFilters">#</p>
          </div>

          {
            path === favoritesPath
            && (
              <div className="miniAlbumImage" />
            )
          }

          <div className="musicAndArtist">
            <p className="albumFilters">TITLE</p>
          </div>

          {
            path === favoritesPath
              ? (
                <div className="albumFilter">
                  <p className="albumFilters">ALBUM</p>
                </div>
              )
              : (
                <div className="albumFilter" />
              )
          }

          {
            path === favoritesPath
              ? (
                <div className="filterRigth">
                  <div className="previewFavorite" />
                  <div className="timeFilter">
                    <p className="albumFilters">
                      <FontAwesomeIcon icon={ faClock } />
                    </p>
                  </div>
                </div>
              )
              : (
                <div className="filterRigthAlbum">
                  <div className="previewFavorite" />
                  <div className="musicDuration">
                    <p className="albumFilters">
                      <FontAwesomeIcon icon={ faClock } />
                    </p>
                  </div>
                </div>
              )
          }

        </div>
        <hr className="horizontalRow" />

        {
          albumTracks.map((artist, i) => {
            const {
              artistName,
              artworkUrl60,
              collectionName,
              previewUrl,
              trackId,
              trackName,
              trackNumber,
              trackTimeMillis,
            } = artist;
            const minutes = this.convertMillsToMin(trackTimeMillis);
            const seconds = this.convertMillsToSeconds(trackTimeMillis);

            return (
              <div
                className="focusMusicRow"
                role="button"
                key={ trackId }
                tabIndex="-1"
                onClick={ (e) => this.placeSelectedClass(e) }
                onKeyPress={ () => {} }
                aria-hidden="true"
              >
                <div className="musicRow notFocusable">
                  <ButtonPlay
                    path={ path }
                    favoritesPath={ favoritesPath }
                    trackNumber={ trackNumber }
                    previewUrl={ previewUrl }
                    i={ i }
                    playAudio={ this.playAudio }
                  />

                  <div className="miniAlbumImage">
                    <img
                      src={ artworkUrl60 }
                      alt="mini album pic"
                      className="miniAlbumImage"
                    />
                  </div>

                  <div className="musicAndArtist">
                    <div className="divToEllipsis">
                      <p className="ellipsis">{ trackName }</p>
                      <p className="ellipsis">{ artistName }</p>
                    </div>
                  </div>

                  {
                    path === favoritesPath
                    && (
                      <div className="albumFilter">
                        <div className="divToEllipsis">

                          <p className="ellipsis">{collectionName}</p>
                        </div>
                      </div>
                    )
                  }

                  <div className="filterRigth">
                    {
                      checkedAndFavorite.includes(trackId)
                        ? (
                          <label htmlFor={ trackId } className="previewFavorite">
                            <FontAwesomeIcon
                              icon={ faHeart }
                              className="focusable heartColor"
                            />
                            <input
                              type="checkbox"
                              name=""
                              id={ trackId }
                              data-testid={ `checkbox-music-${trackId}` }
                              onChange={ () => {
                                handleCheck(artist, trackId);
                              } }
                              checked={ checkedAndFavorite.includes(trackId) }
                              hidden
                            />
                          </label>
                        )
                        : (
                          <label htmlFor={ trackId } className="previewFavorite">
                            <FontAwesomeIcon icon={ faHeart } className="heartIcon" />
                            <input
                              type="checkbox"
                              name=""
                              id={ trackId }
                              data-testid={ `checkbox-music-${trackId}` }
                              onChange={ () => {
                                handleCheck(artist, trackId);
                              } }
                              checked={ checkedAndFavorite.includes(trackId) }
                              hidden
                            />
                          </label>
                        )
                    }
                    <div className="musicDuration">
                      <p>{ `${minutes}:${seconds}` }</p>
                    </div>
                  </div>

                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  albumTracks: PropTypes.oneOfType([PropTypes.array]),
  checkedAndFavorite: PropTypes.oneOfType([PropTypes.array]),
  handleCheck: PropTypes.func,
  path: PropTypes.string,
}.isRequired;

export default MusicCard;
