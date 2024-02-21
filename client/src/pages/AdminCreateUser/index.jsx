import { FormattedMessage } from 'react-intl';
import { useForm } from "react-hook-form";
import { doRegister } from '@pages/Register/actions'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

import encryptPayload from '@utils/encryptionHelper';

import classes from './style.module.scss'

const AdminCreateUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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

    const onSubmit = async (data) => {
        try {
            const encryptedData = encryptPayload(data);
            dispatch(doRegister({ encryptedData },
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
    return (
        <>
            <div className={classes['page-container']}>
                <h3>Create User</h3>
                <form onSubmit={handleSubmit(onSubmit)} className={classes["login-form-container"]}>
                    <label htmlFor='email'>Email:</label>
                    <input type='email' id='email' name='email' required {...register("user_email")} />
                    <label htmlFor='password'>Password:</label>
                    <input type='password' id='password' name='password' required  {...register("user_password")} />
                    <label htmlFor='confirmPassword'>Confirm Password:</label>
                    <input type='password' id='confirmPassword' name='confirmPassword' required  {...register("confirmPassword")} />
                    <label htmlFor='name'><FormattedMessage id='profile_name' />:</label>
                    <input type='name' id='name' name='user_name' required  {...register("user_name")} />
                    <label className={classes["select-role"]} htmlFor="role"><FormattedMessage id='role' /></label>
                    <select className={classes["select-role-box"]} id="role" {...register("user_role")} defaultValue="">
                        <option value="" disabled><FormattedMessage id='select_role' /></option>
                        {Object.entries(roles).map(([key, value]) => (
                            <option key={key} value={key}>{value}</option>
                        ))}
                    </select>
                    <button type='submit'><FormattedMessage id='register' /></button>
                    <Toaster />
                </form>
            </div>
        </>
    )
}

export default AdminCreateUser

