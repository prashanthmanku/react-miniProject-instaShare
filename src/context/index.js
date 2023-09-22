import React from 'react'

const InstaShareContext = React.createContext({
  searchInput: '',
  isMenuOpened: false,
  isMobileSearchBarOpened: false,
  searchCount: 0,
  SearchedList: [],
  isDarkTheme: false,

  changeTheme: () => {},

  changeSearchInput: () => {},
  changeIsMenuOpened: () => {},
  changeIsMobileSearchBarOpened: () => {},
  changeSearchCount: () => {},
  changeSearchedList: () => {},
})

export default InstaShareContext
