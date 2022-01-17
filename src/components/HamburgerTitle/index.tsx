import React from 'react'

interface HamburgerTitleProps {

}

const HamburgerTitle: React.FC<HamburgerTitleProps> = () => {
  return (
    <div className='hamburger-title'>
      <img src="https://static.wanted.co.kr/images/icon-menu.png" alt="hamburger-menu" />

      <img src="/logo.png" className='main-icon' alt="main-icon" />
    </div>
  )
}

export default HamburgerTitle
