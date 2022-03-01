import React, { Component } from 'react';
import '../styles/header.css';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
import { getUser } from '../services/userAPI';
import LoadingHeader from './LoadingHeader';
import SpotifyLogoHeader from '../images/spotifyLogoHeader.png';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      name: '',
      image: 'https://i.pinimg.com/474x/86/0d/cd/860dcdf5cd536bfd86d8fc86efdbdd18.jpg',
      favoriteSongs: [],
    };

    this.catchUser = this.catchUser.bind(this);
  }

  componentDidMount() {
    this.catchUser();
    this.fetchFavoriteSongs();
  }

  fetchFavoriteSongs = async () => {
    const favSongs = await getFavoriteSongs();
    this.setState({
      favoriteSongs: favSongs,
    });
  }

  async catchUser() {
    this.setState({ isLoading: true });
    const user = await getUser();

    this.setState(() => {
      if (user.image.length > 0) {
        return ({
          isLoading: false,
          name: user.name,
          image: user.image,
        });
      }
      return {
        isLoading: false,
        name: user.name,
      };
    });
  }

  render() {
    const { name, image, isLoading, favoriteSongs } = this.state;

    return (
      <header className="header-hero" data-testid="header-component">
        <div className="header-content">
          <Link to="/search" className="header-link-style">
            <div className="header-title">
              <img src={ SpotifyLogoHeader } alt="Spotify Logo" />
              <h2 className="header-collab">X</h2>
              <h2>neur4l</h2>
            </div>
          </Link>
          {
            isLoading
              ? (
                <div className="loadingHeader">
                  <LoadingHeader />
                </div>
              )
              : (
                <div className="showUserBar">
                  <div className="div-profile-icon">
                    <img
                      src={ image }
                      alt="profile icon"
                      className="image-icon"
                    />
                  </div>
                  <h5 data-testid="header-user-name">{ name }</h5>
                </div>
              )
          }
        </div>

        <div className="navLinks-container">
          <div className="alignNavSideBar">
            <NavLink
              className="navLinks"
              to="/search"
              data-testid="link-to-search"
            >
              <FontAwesomeIcon icon={ faMagnifyingGlass } className="iconSet" />
              Search
            </NavLink>
          </div>

          <div className="alignNavSideBar">
            <NavLink
              className="navLinks"
              to="/favorites"
              data-testid="link-to-favorites"
            >
              <FontAwesomeIcon icon={ faHeart } className="iconSet" />
              Favorites
            </NavLink>
          </div>

          <div className="alignNavSideBar">
            <NavLink
              className="navLinks"
              to="/profile"
              data-testid="link-to-profile"
            >
              <FontAwesomeIcon icon={ faUser } className="iconSet" />
              Profile
            </NavLink>
          </div>
        </div>

        <div className="sidebarDivisor" />

        <div className="sideFavSongsContainer">
          <div className="favList">
            {
              favoriteSongs.map((song) => {
                const { collectionId, trackId, trackName } = song;
                return (
                  <Link
                    to={ `/album/${collectionId}` }
                    key={ trackId }
                    className="sideLinkStyle"
                    onClick={ () => window.location.reload() }
                  >
                    <p className="ellipsis">{trackName}</p>
                  </Link>
                );
              })
            }
          </div>
        </div>
      </header>
    // )
    );
  }
}

export default Header;
