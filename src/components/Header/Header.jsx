const Header = ({ title, highlight }) => {
  return (
    <h2 className="text-5xl font-bold text-center my-5">
      {title} <span className="text-primary">{highlight}</span>
    </h2>
  );
};

export default Header;
