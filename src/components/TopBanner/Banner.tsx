
export interface BannerProps {
  src: string;
  title: string;
  contents: string
}

export const Banner: React.FC<BannerProps> = ({ src, title, contents }) => {
  return (<div className="banner" >
    <img src={src} alt={title} />
    <div className="content-box">
      <div className='content-wrapper'>
        <div className="title">{title}</div>
        <div className="contents">{contents}</div>

      </div>
      <div className="link"><div>바로 가기 &gt;</div></div>
    </div>
  </div>);
}