import React from 'react'

const InstaShareContext = React.createContext({
  searchInput: '',
  isMenuOpened: false,
  isMobileSearchBarOpened: false,

  changeSearchInput: () => {},
  changeIsMenuOpened: () => {},
  changeIsMobileSearchBarOpened: () => {},
})

export default InstaShareContext
