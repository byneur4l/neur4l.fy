import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import '../styles/search.css';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import ContentResult from '../components/ContentResult';
import Input from '../components/Input';
import fetchAlbum from '../thunk/fetchAlbumInRedux';
import { inputSearchAct } from '../actions';
import TopsideBar from '../components/TopsideBar';
// import FriendsActivity from '../components/FriendsActivity';

class Search extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      inputSearch: '',
      isButtonDisabled: true,
      isLoading: false,
      searchedTest: '',
      searchedMain: '',
      searchResult: [],
    };
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, () => {
      const { inputSearch } = this.state;
      const TWO = 2;
      if (inputSearch.length >= TWO) {
        this.setState({
          isButtonDisabled: false,
        });
      }
    });
  }

  async handleClick() {
    const { inputSearch } = this.state;
    const { inputSearchGlobal, searchAlbumGlobal } = this.props;

    this.setState({
      isLoading: true,
      isButtonDisabled: true,
      searchResult: [],
      searchedMain: `Resultados de ${inputSearch}`,
    });

    const artist = await searchAlbumsAPI(inputSearch);

    if (artist.length === 0) {
      inputSearchGlobal('Nenhum álbum foi encontrado.');
      return this.setState({
        inputSearch: '',
        isLoading: false,
        searchedTest: 'Nenhum álbum foi encontrado',
        searchedMain: `No results found for "${inputSearch}".`, // ponto para diferenciar do searchedTest
      });
    }

    this.setState((prevState) => ({
      inputSearch: '',
      searchResult: artist,
      isLoading: false,
      searchedTest: `Resultados de álbuns de: ${prevState.inputSearch}`,
      searchedMain: `Top results for ${prevState.inputSearch}`,
    }));
    inputSearchGlobal(inputSearch);
    searchAlbumGlobal(inputSearch);
  }

  render() {
    const {
      isLoading,
      inputSearch,
      isButtonDisabled,
    } = this.state;

    console.log(this.props);

    return (
      <div className="headerPattern">
        <Header { ...this.props } />
        {
          isLoading && <Loading />
        }
        <div data-testid="page-search" className="patternPages">
          <TopsideBar />

          <div className="search-hero">
            <form action="">
              <Input
                type="text"
                id="buttonSearch"
                name="inputSearch"
                placeholder="Artists, songs or podcasts..."
                className="inputSearch"
                data-testid="search-artist-input"
                value={ inputSearch }
                onChange={ this.handleChange }
              />
              <button
                className="buttonSearch"
                type="submit"
                data-testid="search-artist-button"
                disabled={ isButtonDisabled }
                onClick={ this.handleClick }
              >
                Search
              </button>
            </form>
          </div>

          <ContentResult { ...this.state } />
        </div>

        {/* FriendsActivity sidebar */}
        {/* <FriendsActivity /> */}

      </div>
    );
  }
}

Search.propTypes = {
  inputSearchGlobal: PropTypes.func,
  searchAlbumGlobal: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  inputSearchGlobal: (inputValue) => dispatch(inputSearchAct(inputValue)),
  searchAlbumGlobal: (inputValue) => dispatch(fetchAlbum(inputValue)),
});

export default connect(null, mapDispatchToProps)(withRouter(Search));
