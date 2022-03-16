export const SEARCH_ALBUM = 'SEARCH_ALBUM';
export const INPUT_SEARCH = 'INPUT_SEARCH';
export const ENABLE_RENDER_AFTER_CLICK_ON_LINK = 'ENABLE_RENDER_AFTER_CLICK_ON_LINK';
export const SORT_MUSIC = 'SORT_MUSIC';
export const RESPONSE_MUSICS = 'RESPONSE_MUSICS';
export const SAVE_FAVORITE_MUSICS = 'SAVE_FAVORITE_MUSICS';
export const SORT_FAV_MUSICS = 'SORT_FAV_MUSICS';

export const inputSearchAct = (inputValue) => ({
  type: INPUT_SEARCH,
  inputValue,
});

export const searchAlbumAct = (response) => ({
  type: SEARCH_ALBUM,
  response,
});

export const enableRenderAlbumAct = (boolStringfied) => ({
  type: ENABLE_RENDER_AFTER_CLICK_ON_LINK,
  boolStringfied,
});

export const responseMusicsAct = (musics) => ({
  type: RESPONSE_MUSICS,
  musics,
});

export const saveFavoriteMusicsAct = (favorites) => ({
  type: SAVE_FAVORITE_MUSICS,
  favorites,
});

export const sortFavoriteMusicsAct = (sortedFav) => ({
  type: SORT_FAV_MUSICS,
  sortedFav,
});

export const sortMusicAct = (sorted) => ({
  type: SORT_MUSIC,
  sorted,
});