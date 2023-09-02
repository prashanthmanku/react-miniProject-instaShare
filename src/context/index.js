import React from 'react'

const InstaShareContext = React.createContext({
  searchInput: '',
  isMenuOpened: false,
  isMobileSearchBarOpened: false,
  searchCount: 0,

  changeSearchInput: () => {},
  changeIsMenuOpened: () => {},
  changeIsMobileSearchBarOpened: () => {},
  changeSearchCount: () => {},
})

export default InstaShareContext
