type LogoProps = {
  width?: number | string;
  height?: number | string;
};

const Logo = ({ width, height }: LogoProps) => {
  return <img src="/assets/logo.avif" alt="logo" width={width} height={height}/>;
};

export default Logo;
