
export interface BannerProps {
  src: string;
  title: string;
  contents: string
}

export const Banner: React.FC<BannerProps> = ({ src, title, contents }) => {
  return (<div className="banner" >
    <img src={src} alt={title} />
  </div>);
}