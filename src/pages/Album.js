import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import '../styles/album.css';
import AlbumHeader from '../components/AlbumHeader';

class Album extends Component {
  constructor() {
    super();

    this.handleCheck = this.handleCheck.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    this.fetchMusic = this.fetchMusic.bind(this);
    this.fetchFavoriteSongs = this.fetchFavoriteSongs.bind(this);
    this.handleReload = this.handleReload.bind(this);

    this.state = {
      isLoading: true,
      album: {},
      albumTracks: [],
      checked: [],
      favoriteSongs: [],
      checkedAndFavorite: [],
      albumTrackTime: [],
      forceReload: false,
      isHeaderLoading: false,
    };
  }

  async componentDidMount() {
    const { checked } = this.state;

    const music = await this.fetchMusic();
    const idFavoriteSongs = await this.fetchFavoriteSongs();

    this.setState({
      album: music[0], // sempre o primeiro item do array é o album com as infos
      albumTracks: music.slice(1), // a partir daqui é apenas música
      isLoading: false,
      favoriteSongs: idFavoriteSongs,
      checkedAndFavorite: [...idFavoriteSongs, ...checked],
    });
  }

  handleLoad() {
    this.setState((prevState) => ({
      isLoading: !prevState.isLoading,
    }));
  }

  handleReload() {
    this.setState((prevState) => ({
      forceReload: !prevState.forceReload,
    }));
  }

  async handleCheck(artist, id) {
    const { checkedAndFavorite } = this.state;
    if (checkedAndFavorite.includes(id)) {
      // bool
      const filter = this.filterChecked(checkedAndFavorite, id); // dentro do setState novo

      // this.handleLoad();
      await removeSong(artist);
      // this.handleLoad(); // poderei tirar esse loading daqui

      this.setState({
        checkedAndFavorite: filter,
      });
    } else {
      // this.handleLoad();
      await addSong(artist);
      // this.handleLoad();

      this.setState((prevState) => ({
        checkedAndFavorite: [...prevState.checkedAndFavorite, id],
      }));
    }
  }

  async fetchMusic() {
    const { match: { params: { id } } } = this.props;
    const search = await getMusics(id);
    return search;
  }

  async fetchFavoriteSongs() {
    const favorites = await getFavoriteSongs();
    const idFavoriteSongs = favorites.map(({ trackId }) => trackId);
    return idFavoriteSongs;
  }

  filterChecked(arr, id2) {
    const filtered = arr.filter((musicId) => musicId !== id2);
    return filtered;
  }

  render() {
    const { album: { artistName }, isLoading } = this.state;

    return (
      <div className="headerPattern">
        <Header
          { ...this.props }
          { ...this.state }
          handleReload={ this.handleReload }
        />
        {
          isLoading
            ? <Loading />
            : (
              <section data-testid="page-album" className="album">
                <AlbumHeader { ...this.state } />

                <section className="patternPages albumContent gradContent">
                  <p data-testid="artist-name" hidden>{ `Artist Name ${artistName}`}</p>
                  <MusicCard
                    { ...this.state }
                    { ...this.props }
                    handleCheck={ this.handleCheck }
                    handleLoad={ this.handleLoad }
                    handleReload={ this.handleReload }
                  />
                </section>
              </section>
            )
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.oneOfType([
    PropTypes.object,
  ]).isRequired,
};

export default Album;
