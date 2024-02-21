import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';


import classes from './style.module.scss';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className={classes.home}>

    </div>
  );
};

export default Home
