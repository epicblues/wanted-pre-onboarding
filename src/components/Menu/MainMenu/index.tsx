import MenuButton, { MenuButtonProps } from './MenuButton'

const btnDatas: MenuButtonProps[] = [
  { content: "홈", className: "home" },
  { content: "채용", },
  { content: "이벤트", },
  { content: "직군별 연봉", className: "sub" },
  { content: "이력서", className: "sub" },
  { content: "커뮤니티", className: "sub new" },
  { content: "프리랜서", className: "sub" },
  { content: "AI 합격예측", className: "sub beta" },

]




const MainMenu = () => {
  return (
    <div className="main-menu">
      {btnDatas.map(props => (<MenuButton {...props} />))}
    </div>
  )
}

export default MainMenu
