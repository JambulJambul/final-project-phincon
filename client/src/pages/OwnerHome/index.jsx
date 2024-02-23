import { useEffect } from 'react'
import { useDispatch, connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';

import { selectToken, selectUserDetails } from '@containers/Client/selectors';
import { doOwnerArena } from './actions';

import classes from './style.module.scss'

const OwnerHome = ({ token, userDetails }) => {
    const dispatch = useDispatch();

    const user_id = userDetails?.user_id
    const data = { token, user_id};

    console.log(data,"HERE")

    useEffect(() => {
        dispatch(doOwnerArena(data))
    }, [token]);

    const userList = useSelector((state) => state.ownerHomepage.ownerArena);


    return (
        <>
            <h3>Owner Home</h3>
        </>
    )
}

OwnerHome.propTypes = {
    token: PropTypes.object,
    userDetails: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
    token: selectToken,
    userDetails: selectUserDetails
});

export default connect(mapStateToProps)(OwnerHome);
