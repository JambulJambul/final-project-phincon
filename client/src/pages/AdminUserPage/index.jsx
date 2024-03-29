import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { useDispatch, connect, useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';

import { doGetAllUsers } from "./actions";
import { selectToken } from '@containers/Client/selectors';

import classes from "./style.module.scss";

const AdminUserPage = ({ token }) => {
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(doGetAllUsers(token))
    }, [token]);

    const userList = useSelector((state) => state.adminUserList.userArray);

    return (
        <>
            <div className={classes['page-container']}>
                <h3>Admin User Page</h3>
                <div className={classes['add-new-user-button']}>
                    <Link to={'/admin/create-user'} >Add New User</Link>
                </div>
                <div className={classes["table-container"]}>
                    <table>
                        <tr>
                            <th>User Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Suspension Status</th>
                            <th>Deletion Status</th>
                            <th>Actions</th>
                        </tr>
                        {
                            userList && userList.map((item, index) => {
                                let roleText
                                if (item.user_role === 1) {
                                    roleText = "Admin"
                                } else if (item.user_role === 2) {
                                    roleText = "Owner"
                                } else if (item.user_role === 3) {
                                    roleText = "Public"
                                }
                                let suspenstionText
                                if (item.user_suspension === 1) {
                                    suspenstionText = "None"
                                } else if (item.user_suspension === 2) {
                                    suspenstionText = "Suspended"
                                }
                                return (
                                    <>
                                        <tr key={index}>
                                            <td>{item.user_id}</td>
                                            <td>{item.user_name}</td>
                                            <td>{item.user_email}</td>
                                            <td>{roleText}</td>
                                            <td>{suspenstionText}</td>
                                            <td>{item.deletedAt ? 'Deleted' : 'None'}</td>
                                            <td>
                                                <span>
                                                    <Link to={`/admin/edit-user/${item.user_id}`}>
                                                        <EditIcon />
                                                    </Link>
                                                </span>
                                                <span>
                                                    <Link>
                                                        <DeleteIcon />
                                                    </Link>
                                                </span>
                                            </td>
                                        </tr>
                                    </>
                                )
                            }
                            )
                        }
                    </table>
                </div>
            </div>
        </>
    )
}

AdminUserPage.propTypes = {
    token: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
    token: selectToken
});

export default connect(mapStateToProps)(AdminUserPage);
