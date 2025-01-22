import PropTypes from "prop-types";
import { Menu, Button } from "semantic-ui-react";

const Header = ({ resetQuiz }) => {
  return (
    <Menu stackable inverted style={{ borderRadius: "0" }}>
      <Menu.Item header>
        <h1>QuizApp</h1>
      </Menu.Item>
      <Menu.Item position="right">
        {resetQuiz && (
          <Button
            color="black"
            icon="redo"
            labelPosition="left"
            content="Back to Menu"
            onClick={resetQuiz}
          />
        )}
      </Menu.Item>
    </Menu>
  );
};

Header.propTypes = {
  resetQuiz: PropTypes.func,
};

export default Header;
