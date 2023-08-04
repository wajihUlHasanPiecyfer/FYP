import React, { Fragment, useEffect, useState } from 'react'
import './ForgotPassword.css'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, forgotPassword } from '../../actions/userAction'
import { Loader } from '../layout/Loader/Loader';
import Swal from "sweetalert2";
import MetaData from '../layout/MetaData';
const ForgotPassword = () => {

    const dispatch = useDispatch()
    const { error, message, loading } = useSelector((state) => state.forgotPassword)

    const [email, setEmail] = useState("")


    const forgotPasswordSubmit = (e) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.set("email", email)
        dispatch(forgotPassword(myForm))
    }

    useEffect(() => {

        if (error) {
            Swal.fire("Error!", error, "error");

            dispatch(clearErrors)
        }

        if (message) {
            Swal.fire("Message!", message, "success");
        }

    }, [dispatch, error, message])



  return (
    <Fragment>
    {loading ? <Loader /> : <Fragment>
        <MetaData title="Forgot Password" />
        <div className='forgotPasswordContainer'>
            <div className='forgotPasswordBox'>
                <h2 className='forgotPasswordHeading'>Forgot Password</h2>
                <form
                    className='forgotPasswordForm'
                    onSubmit={forgotPasswordSubmit}
                >
                    <div className='forgotPasswordEmail'>
                        <EmailOutlinedIcon />
                        <input
                            type='email'
                            placeholder='Email Address'
                            required
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}

                        />
                    </div>
                  

                    <input type='submit' value='Send' className='forgotPasswordBtn' />

                </form>
            </div>
        </div>
    </Fragment>}
</Fragment>
  )
}

export default ForgotPassword