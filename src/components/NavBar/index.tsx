import react from 'react'
import HamburgerTitle from '../HamburgerTitle.tsx'
import Menu from '../Menu';

interface NavBarProps {

}

const NavBar: React.FC<NavBarProps> = ({ }) => {
  return (<div className="navbar">
    <HamburgerTitle />
    <Menu />
  </div>);
}

export default NavBar