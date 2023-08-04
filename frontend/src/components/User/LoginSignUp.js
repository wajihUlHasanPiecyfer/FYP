import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './LoginSignUp.css'
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FaceIcon from '@mui/icons-material/Face';
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, login, register } from '../../actions/userAction'
import { Loader } from '../layout/Loader/Loader';
import Swal from "sweetalert2";
import {useNavigate} from 'react-router-dom'



const LoginSignUp = () => {

    const dispatch = useDispatch()
    const history = useNavigate()

    const { error, loading, isAuthenticated } = useSelector((state) => state.user)

    const loginTab = useRef(null)
    const registerTab = useRef(null)
    const switcherTab = useRef(null)

    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    })
    const { name, email, password } = user

    const loginSubmit = (e) => {
        e.preventDefault()
        dispatch(login(loginEmail, loginPassword))
    }

    const registerSubmit = (e) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.set("name", name)
        myForm.set("email", email)
        myForm.set("password", password)
        dispatch(register(myForm))
    }

    const registerDataChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    useEffect(() => {

        if (error) {
            Swal.fire("Error!", error, "error");
            dispatch(clearErrors)
        }

        if(isAuthenticated){
            history("/profile")
        }

    }, [dispatch, error, history, isAuthenticated])


    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }

    }

    return (
        <Fragment>
            {loading ? <Loader /> : <Fragment>
                <div className='LoginSignUpContainer'>
                    <div className='LoginSignUpBox'>
                        <div>
                            <div className='login_signUp_toggle'>
                                <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                                <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                            </div>
                            <button ref={switcherTab}></button>
                        </div>
                        <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                            <div className='loginEmail'>
                                <EmailOutlinedIcon />
                                <input
                                    type='email'
                                    placeholder='Email Address'
                                    required
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                />
                            </div>
                            <div className='loginPassword'>
                                <LockOpenOutlinedIcon />
                                <input
                                    type='password'
                                    placeholder='Password'
                                    required
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                />
                            </div>
                            <Link to='/password/forget'>Forget Password?</Link>
                            <input type='submit' value='Login' className='loginBtn' />
                        </form>
                        <form
                            className='signUpForm'
                            ref={registerTab}
                            onSubmit={registerSubmit}
                        >
                            <div className='signUpName'>
                                <FaceIcon />
                                <input
                                    type='text'
                                    placeholder='Name'
                                    required
                                    name='name'
                                    value={name}
                                    onChange={registerDataChange}
                                />
                            </div>
                            <div className='signUpEmail'>
                                <EmailOutlinedIcon />
                                <input
                                    type='email'
                                    placeholder='Email Address'
                                    required
                                    name='email'
                                    value={email}
                                    onChange={registerDataChange}
                                />
                            </div>
                            <div className='signUpPassword'>
                                <LockOpenOutlinedIcon />
                                <input
                                    type='password'
                                    placeholder='Password'
                                    required
                                    name='password'
                                    value={password}
                                    onChange={registerDataChange}
                                />
                            </div>

                            <input type='submit' value='Register' className='signUpBtn' />

                        </form>
                    </div>
                </div>
            </Fragment>
            }
        </Fragment>
    )
}

export default LoginSignUp