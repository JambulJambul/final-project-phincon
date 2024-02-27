import { useEffect } from 'react'
import { useDispatch, connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { selectToken, selectUserDetails } from '@containers/Client/selectors';
import { doOwnerArena } from './actions';

import defaultArenaImg from '@static/images/arena-default.jpg';

import classes from './style.module.scss'

const OwnerHome = ({ token, userDetails }) => {
    const dispatch = useDispatch();

    const user_id = userDetails?.user_id
    const user_name = userDetails?.user_name;
    const data = { token, user_id };


    useEffect(() => {
        dispatch(doOwnerArena(data))
    }, [token]);

    const arenaList = useSelector((state) => state.ownerHomepage.ownerArena);

    return (
        <>
            <div className={classes["page-container"]}>
                <h3>Hi, {user_name}</h3>
                <div className={classes[""]}>
                    <h4>Your Arenas</h4>
                </div>
                <div className={classes['arena-row']}>
                    {
                        arenaList?.map((item, index) => {
                            return (
                                <>
                                    <div key={index}>
                                        <Link to={`/owner/arena-details/${item.arena_id}`}>
                                            <div className={classes["arena-card"]}>
                                                <img src={item.arena_img_url && item.arena_img_url[0] ? item.arena_img_url[0] : defaultArenaImg} alt="arena-hero" />
                                                <p>{item.arena_name}</p>
                                            </div>
                                        </Link>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </div>
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