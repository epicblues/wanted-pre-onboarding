import HamburgerTitle from '../HamburgerTitle'
import MainMenu from '../Menu/MainMenu';
import SubMenu from '../Menu/SubMenu';

interface NavBarProps {

}

const NavBar: React.FC<NavBarProps> = () => {
  return (<div className="navbar">
    <HamburgerTitle />
    <MainMenu />
    <SubMenu />
  </div>);
}

export default NavBar