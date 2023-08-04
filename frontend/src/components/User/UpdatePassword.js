import React, { Fragment, useEffect, useState } from 'react'
import './UpdatePassword.css'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, updatePassword } from '../../actions/userAction'
import { Loader } from '../layout/Loader/Loader';
import { useNavigate } from 'react-router-dom'
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import MetaData from '../layout/MetaData';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Swal from "sweetalert2";


const UpdatePassword = () => {

  const dispatch = useDispatch()
  const history = useNavigate()

  const { error, isUpdated, loading } = useSelector((state) => state.profile)


  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);



  const updatePasswordSubmit = (e) => {
    e.preventDefault()
    const myForm = new FormData()
    myForm.set("oldPassword", oldPassword)
    myForm.set("newPassword", newPassword)
    myForm.set("confirmPassword", confirmPassword)

    dispatch(updatePassword(myForm))
  }

  useEffect(() => {


    if (error) {
      Swal.fire("Error!", error, "error");
      dispatch(clearErrors)
    }

    if (isUpdated) {
      Swal.fire("Updated!", "Password Updated Successfully", "success");
      history("/profile")

      dispatch({
        type: UPDATE_PASSWORD_RESET
      })
    }

  }, [dispatch, error, history, isUpdated])

  const togglePasswordVisibility = (passwordType) => {
    if (passwordType === 'old') {
      setShowOldPassword(!showOldPassword);
    } else if (passwordType === 'new') {
      setShowNewPassword(!showNewPassword);
    } else if (passwordType === 'confirm') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <Fragment>
      {loading ? <Loader /> : <Fragment>
        <MetaData title="Change Password" />
        <div className='updatePasswordContainer'>
          <div className='updatePasswordBox'>
            <h2 className='updatePasswordHeading'>Update Profile</h2>
            <form
              className='updatePasswordForm'
              onSubmit={updatePasswordSubmit}
            >
             <div className="updatePassword">
                  <VpnKeyIcon />
                  <input
                    type={showOldPassword ? 'text' : 'password'}
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <i
                    className={`passwordIcon ${showOldPassword ? 'showIcon' : 'hideIcon'}`}
                    onClick={() => togglePasswordVisibility('old')}
                  >
                    {showOldPassword ? (
                      <VisibilityOffIcon fontSize="small" />
                    ) : (
                      <VisibilityIcon fontSize="small" />
                    )}
                  </i>
                </div>
                <div className="updatePassword">
                  <LockOpenIcon />
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <i
                    className={`passwordIcon ${showNewPassword ? 'showIcon' : 'hideIcon'}`}
                    onClick={() => togglePasswordVisibility('new')}
                  >
                    {showNewPassword ? (
                      <VisibilityOffIcon fontSize="small" />
                    ) : (
                      <VisibilityIcon fontSize="small" />
                    )}
                  </i>
                </div>
                <div className="updatePassword">
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


              <input type='submit' value='Change' className='updatePasswordBtn' />

            </form>
          </div>
        </div>
      </Fragment>}
    </Fragment>
  )
}

export default UpdatePassword