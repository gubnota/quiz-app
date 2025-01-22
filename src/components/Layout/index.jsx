import PropTypes from "prop-types";

import Header from "../Header";

const Layout = ({ children, resetQuiz }) => {
  return (
    <>
      <Header resetQuiz={resetQuiz} />
      <main>{children}</main>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  resetQuiz: PropTypes.func,
};

export default Layout;
