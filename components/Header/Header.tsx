import Link from "next/link";
import classes from "./header.module.css";

const Header: React.FC = () => {
  return (
    <header className={classes.root}>
      <div className={classes.headerContainer}>
        <Link href="/">Characters</Link>
        <Link href="/movies">Movies</Link>
      </div>
    </header>
  );
};

export default Header;
