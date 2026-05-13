type LogoProps = {
  width?: number | string;
  height?: number | string;
};

const Logo = ({ width, height }: LogoProps) => {
  return <img src="/assets/logo.png" alt="logo" width={width} height={height}/>;
};

export default Logo;
