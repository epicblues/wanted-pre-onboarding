import React from 'react'
import MainMenu from './MainMenu'
import SubMenu from './SubMenu'
import CompanyService from './SubMenu/CompanyService'

const Menu = () => {
  return (
    <div className="menu">
      <MainMenu />
      <SubMenu />
    </div>
  )
}

export default Menu
