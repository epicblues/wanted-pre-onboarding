
export interface BannerProps {
  src: string;
  title: string;
  contents: string;
  current: number;
  index: number
}

export const Banner: React.FC<BannerProps> = ({ src, title, contents, current, index }) => {
  return (<div className="banner" >
    <img src={src} alt={title} />
    <div className="content-box" style={{ opacity: (index + 1) % 6 === current % 6 ? 1 : 0 }}>
      <div className='content-wrapper'>
        <div className="title">{title}</div>
        <div className="contents">{contents}</div>

      </div>
      <div className="link"><div>바로 가기 &gt;</div></div>
    </div>
  </div>);
}