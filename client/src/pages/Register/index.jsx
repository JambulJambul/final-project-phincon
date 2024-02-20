import { FormattedMessage } from 'react-intl';
import { useForm } from "react-hook-form";
import { doRegister } from './actions'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

import encryptPayload from '@utils/encryptionHelper';

import classes from './style.module.scss'

const Register = () => {
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
          await delay(3000);
          navigate('/login');
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
    2: 'Manager',
    3: 'User',
  };

  return (
    <>
      <div className={classes["login-page-wrapper"]}>
        <div className={classes["login-box-container"]}>
          <h3>
            <FormattedMessage id='register_title' />
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className={classes["login-form-container"]}>
            <label htmlFor='email'>Email:</label><br />
            <input type='email' id='email' name='email' required {...register("email")} /><br />
            <label htmlFor='password'>Password:</label><br />
            <input type='password' id='password' name='password' required  {...register("password")} /><br />
            <label htmlFor='confirmPassword'>Confirm Password:</label><br />
            <input type='password' id='confirmPassword' name='confirmPassword' required  {...register("confirmPassword")} /><br />
            <label htmlFor='name'><FormattedMessage id='profile_name' />:</label><br />
            <input type='name' id='name' name='name' required  {...register("name")} /><br />
            <label className={classes["select-role"]} htmlFor="role"><FormattedMessage id='role' /></label>
            <select className={classes["select-role-box"]} id="role" {...register("role")} defaultValue="">
              <option value="" disabled><FormattedMessage id='select_role'/></option>
              {Object.entries(roles).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
            <button type='submit'><FormattedMessage id='register' /></button>
            <Toaster />
          </form>
          <p className={classes["register-text"]}>
            <FormattedMessage id='register_to_login' />&nbsp;
            <Link to="/login"><FormattedMessage id='login_here' /></Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Register