import BetaMark from './BetaMark'
import NewMark from './NewMark'

export interface MenuButtonProps {
  content: string;
  className?: string;
}
const MenuButton: React.FC<MenuButtonProps> = ({ content, className }) => {


  return (
    <div className={"menu-button" + (className ? " " + className : "")}>
      {content}
      {className?.includes('new') && <NewMark />}
      {className?.includes('beta') && <BetaMark />}
    </div>)


}



export default MenuButton