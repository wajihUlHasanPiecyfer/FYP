import React, { Fragment, useEffect, useState } from 'react'
import './UpdateProfile.css'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FaceIcon from '@mui/icons-material/Face';
import SchoolIcon from '@mui/icons-material/School';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, loadUser, updateProfile } from '../../actions/userAction'
import { Loader } from '../layout/Loader/Loader';
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import MetaData from '../layout/MetaData';
const UpdateProfile = () => {

    const dispatch = useDispatch()
    const history = useNavigate()

    const { user } = useSelector((state) => state.user)
    const { error, isUpdated, loading } = useSelector((state) => state.profile)


    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [education, setEducation] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [address, setAddress] = useState("")
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

    const updateProfileSubmit = (e) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.set("name", name)
        myForm.set("email", email)
        myForm.set("education", education)
        myForm.set("phoneNumber", phoneNumber)
        myForm.set("address", address)
        myForm.set("avatar", avatar)

        dispatch(updateProfile(myForm))
    }

    const updateProfileDataChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }

        reader.readAsDataURL(e.target.files[0])
    }


    useEffect(() => {

        if (user) {
            setName(user.name)
            setEmail(user.email)
            setEducation(user.education)
            setPhoneNumber(user.phoneNumber)
            setAddress(user.address)
            setAvatarPreview(user.avatar.url)
        }
        if (error) {
            Swal.fire("Error!", error, "error");
            dispatch(clearErrors)
        }

        if (isUpdated) {
            Swal.fire("Updated!", "Profile Updated Successfully", "success");
            dispatch(loadUser())
            history("/profile")

            dispatch({
                type: UPDATE_PROFILE_RESET
            })
        }

    }, [dispatch, error, history, user, isUpdated])



    return (
        <Fragment>
            {loading ? <Loader /> : <Fragment>
                <MetaData title="Update Profile" />
                <div className='updateProfileContainer'>
                    <div className='updateProfileBox'>
                        <h2 className='updateProfileHeading'>Update Profile</h2>
                        <form
                            className='updateProfileForm'
                            encType='multipart/form-data'
                            onSubmit={updateProfileSubmit}
                        >
                            <div className='updateProfileName'>
                                <FaceIcon />
                                <input
                                    type='text'
                                    placeholder='Name'
                                    required
                                    name='name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}

                                />
                            </div>
                            <div className='updateProfileEmail'>
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
                            <div className='updateProfileName'>
                                <SchoolIcon />
                                <input
                                    type='text'
                                    placeholder='Education'
                                    required
                                    name='education'
                                    value={education}
                                    onChange={(e) => setEducation(e.target.value)}

                                />
                            </div>
                            <div className='updateProfileName'>
                                <PhoneIcon />
                                <input
                                    type='text'
                                    placeholder='Phone Number'
                                    required
                                    name='phoneNumber'
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}

                                />
                            </div>
                            <div className='updateProfileName'>
                                <HomeIcon />
                                <input
                                    type='text'
                                    placeholder='Address'
                                    required
                                    name='address'
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}

                                />
                            </div>

                            <div id='updateProfileimage'>
                                <img src={avatarPreview} alt="Avatar Preview" />
                                <input
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={updateProfileDataChange}
                                />
                            </div>

                            <input type='submit' value='Update' className='updateProfileBtn' />

                        </form>
                    </div>
                </div>
            </Fragment>}
        </Fragment>
    )
}

export default UpdateProfile