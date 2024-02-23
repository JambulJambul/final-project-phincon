import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectLogin, selectUserDetails } from '@containers/Client/selectors';

const Client = ({ role, login, children, userDetails }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!login) {
      navigate('/login');
    }
  }, [login, navigate]);

  useEffect(() => {
    if (userDetails && userDetails.user_role !== role) {
      navigate('/');
    }
  }, [role, userDetails, navigate]);

  return children;
};

Client.propTypes = {
  login: PropTypes.bool,
  children: PropTypes.element,
  userDetails: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
  userDetails: selectUserDetails
});

export default connect(mapStateToProps)(Client);
