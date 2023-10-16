import React from 'react'

const InstaShareContext = React.createContext({
  searchInput: '',
  isMenuOpened: false,
  isMobileSearchBarOpened: false,
  searchCount: 0,
  SearchedList: [],
  storiesList: [],
  isDarkTheme: false,
  count: 0,

  changeTheme: () => {},

  changeSearchInput: () => {},
  changeIsMenuOpened: () => {},
  changeIsMobileSearchBarOpened: () => {},
  changeSearchCount: () => {},
  changeSearchedList: () => {},
  changeCount: () => {},
  changeStoriesList: () => {},
})

export default InstaShareContext
