import React, { Fragment, useEffect, useState } from 'react'
import './ResetPassword.css'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, resetPassword } from '../../actions/userAction'
import { Loader } from '../layout/Loader/Loader';
import { useNavigate , useParams  } from 'react-router-dom'
import MetaData from '../layout/MetaData';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Swal from "sweetalert2";


const ResetPassword = () => {

    const dispatch = useDispatch()
    const history = useNavigate()
    const {token} = useParams()
    const { error, success, loading } = useSelector((state) => state.forgotPassword)


    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);



    const resetPasswordSubmit = (e) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.set("password", password)
        myForm.set("confirmPassword", confirmPassword)

        dispatch(resetPassword(token, myForm))
    }

    useEffect(() => {


        if (error) {
            Swal.fire("Error!", error, "error");
            dispatch(clearErrors)
        }

        if (success) {
            Swal.fire("Updated!", "Password Updated Successfully", "success");
            history("/login")

        }

    }, [dispatch, error, history, success])

    const togglePasswordVisibility = (passwordType) => {
        if (passwordType === 'password') {
            setShowPassword(!showPassword);
        } else if (passwordType === 'confirm') {
            setShowConfirmPassword(!showConfirmPassword);
        }
    };

    return (
        <Fragment>
            {loading ? <Loader /> : <Fragment>
                <MetaData title="Reset Password" />
                <div className='resetPasswordContainer'>
                    <div className='resetPasswordBox'>
                        <h2 className='resetPasswordHeading'>Reset Password</h2>
                        <form
                            className='resetPasswordForm'
                            onSubmit={resetPasswordSubmit}
                        >
                            <div className="resetPassword">
                                <LockOpenIcon />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="New Password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <i
                                    className={`passwordIcon ${showPassword ? 'showIcon' : 'hideIcon'}`}
                                    onClick={() => togglePasswordVisibility('password')}
                                >
                                    {showPassword ? (
                                        <VisibilityOffIcon fontSize="small" />
                                    ) : (
                                        <VisibilityIcon fontSize="small" />
                                    )}
                                </i>
                            </div>
                            <div className="resetPassword">
                                <LockIcon />
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="Confirm Password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <i
                                    className={`passwordIcon ${showConfirmPassword ? 'showIcon' : 'hideIcon'}`}
                                    onClick={() => togglePasswordVisibility('confirm')}
                                >
                                    {showConfirmPassword ? (
                                        <VisibilityOffIcon fontSize="small" />
                                    ) : (
                                        <VisibilityIcon fontSize="small" />
                                    )}
                                </i>
                            </div>


                            <input type='submit' value='Update' className='resetPasswordBtn' />

                        </form>
                    </div>
                </div>
            </Fragment>}
        </Fragment>
    )
}

export default ResetPassword