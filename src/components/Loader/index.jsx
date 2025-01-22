import { Container, Message, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Loader = ({ title, message }) => (
  <Container>
    <Message icon size="big">
      <Icon name="circle notched" loading />
      <Message.Content>
        <Message.Header>{title ? title : 'Just one second'}</Message.Header>
        {message ? message : 'We are fetching that content for you.'}
      </Message.Content>
    </Message>
  </Container>
);

Loader.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string
};

export default Loader;
