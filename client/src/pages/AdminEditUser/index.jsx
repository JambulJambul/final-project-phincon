import { FormattedMessage } from 'react-intl';
import { useForm } from "react-hook-form";
import { doUpdateUser } from './actions';
import { useDispatch, connect, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import { doGetUser } from './actions';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { selectToken } from '@containers/Client/selectors';
import WarningIcon from '@mui/icons-material/Warning';

import encryptPayload from '@utils/encryptionHelper';

import classes from './style.module.scss'

const AdminEditUser = ({ token }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user_id } = useParams();
    const data = { token, user_id }

    const userData = useSelector((state) => state.adminEditUser.userData);

    useEffect(() => {
        dispatch(doGetUser(data))
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    const notifySuccess = (message) => toast.success(message, {
        position: 'bottom-right'
    });

    const notifyError = (message) => toast.error(message, {
        position: 'bottom-right'
    });

    const onSubmit = async (formData) => {
        try {
            const encryptedData = encryptPayload(formData);
            const data = { token, user_id, encryptedData }
            dispatch(doUpdateUser(data,
                async () => {
                    notifySuccess("Account created");
                    await delay(1500);
                    navigate('/admin/user-list');
                },
                (error) => {
                    console.log(error)
                    notifyError(error || "An error occurred");
                }))
        } catch (error) {
            console.error(error);
        }
    };

    const roles = {
        1: 'Admin',
        2: 'Owner',
        3: 'Public',
    };

    const suspensionStatus = {
        1: 'None',
        2: 'Suspended'
    };
    return (
        <>
            <div className={classes['page-container']}>
                <h3>Edit User</h3>
                {userData?.deletedAt &&
                    <div className={classes['deleted-notification-box']}>
                        <WarningIcon />
                        <p><FormattedMessage id='deleted-user-notification' /></p>
                    </div>
                }
                <form onSubmit={handleSubmit(onSubmit)} className={classes["login-form-container"]}>
                    <label htmlFor='email'>Email:</label>
                    <input type='email' id='email' name='email' className={classes['disabled-input']} defaultValue={userData?.user_email} readOnly />
                    <label htmlFor='name'><FormattedMessage id='profile_name' />:</label>
                    <input type='name' id='name' name='user_name' className={classes['disabled-input']} defaultValue={userData?.user_name} readOnly />
                    <label htmlFor="role"><FormattedMessage id='role' /></label>
                    <select id="role" {...register("user_role")}>
                        <option value="" disabled><FormattedMessage id='select_role' /></option>
                        {Object.entries(roles).map(([key, value]) => {
                            if (userData?.user_role == key) {
                                return <option key={key} value={key} selected>{value}</option>;
                            } else {
                                return <option key={key} value={key}>{value}</option>;
                            }
                        })}
                    </select>
                    <label htmlFor="suspension"><FormattedMessage id='suspension' /></label>
                    <select id="suspension" {...register("user_suspension")}>
                        <option value="" disabled><FormattedMessage id='select_suspension' /></option>
                        {Object.entries(suspensionStatus).map(([key, value]) => {
                            if (userData?.user_suspension == key) {
                                return <option key={key} value={key} selected>{value}</option>;
                            } else {
                                return <option key={key} value={key}>{value}</option>;
                            }
                        })}
                    </select>
                    {userData?.deletedAt ? (
                        <>
                            <button className={classes['disabled-button']} disabled type='submit'><FormattedMessage id='not-able-deleted-user' /></button>
                        </>
                    ) : (
                        <>
                            <button type='submit'><FormattedMessage id='edit-profile' /></button>
                        </>
                    )
                    }
                    <Toaster />
                </form>
            </div>
        </>
    )
}

AdminEditUser.propTypes = {
    token: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
    token: selectToken
});


export default connect(mapStateToProps)(AdminEditUser);