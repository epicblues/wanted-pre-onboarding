import React from 'react'
import CompanyService from './CompanyService'
import SubButtons from './SubButtons'

const SubMenu = () => {
  return (
    <div className='sub-menu'>
      <SubButtons />
      <CompanyService />
    </div>

  )
}

export default SubMenu
