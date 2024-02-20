import { useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

import { fetchPokemon } from './actions';
import { selectPokemon } from './selectors';

import classes from './style.module.scss';

const Home = ({ pokemon }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //  dispatch(fetchPokemon())
  // }, [dispatch]);

  return (
    <div className={classes.home}>
      
    </div>
  );
};

Home.propTypes = {
  pokemon: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  pokemon: selectPokemon
});

export default connect(mapStateToProps)(Home);
