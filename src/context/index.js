import React from 'react'

const InstaShareContext = React.createContext({
  searchInput: '',
  isMenuOpened: false,
  isMobileSearchBarOpened: false,
  searchCount: 0,
  SearchedList: [],
  isDarkTheme: false,
  count: 0,

  changeTheme: () => {},

  changeSearchInput: () => {},
  changeIsMenuOpened: () => {},
  changeIsMobileSearchBarOpened: () => {},
  changeSearchCount: () => {},
  changeSearchedList: () => {},
  changeCount: () => {},
})

export default InstaShareContext
