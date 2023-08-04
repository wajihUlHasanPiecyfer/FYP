import React, { Fragment, useState } from 'react'
import './Header.css'
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useNavigate } from 'react-router-dom';
import { withStyles } from '@mui/styles';
import Swal from "sweetalert2";
import 'react-toastify/dist/ReactToastify.css';
import { logout } from '../../../actions/userAction';
import { useDispatch } from 'react-redux';



const StyledSpeedDial = withStyles({
  root: {
    // Set the desired color
    '& .MuiSpeedDial-fab': {
      backgroundColor: 'white',
      boxshadow: 'none',
      marginTop: 8,
      width: 40,
      height: 40,
    }
  },
})(SpeedDial);

const UserOptions = ({ isAuthenticated, user }) => {

  const [open, setOpen] = useState(false)
  const history = useNavigate()
  const dispatch = useDispatch()
  const options = [
    { icon: <DashboardIcon />, name: "Dashboard", func: dashboard },
    { icon: <PersonIcon />, name: "Profile", func: account, },
    { icon: <LogoutIcon />, name: "Logout", func: logoutUser },
  ]


  function dashboard() {
    history("/dashboard")
  }

  function account() {
    history("/profile")
  }

  function logoutUser() {
    dispatch(logout())
    Swal.fire("Logded Out!", "Logged out successfully", "success");
    history("/")
  }
  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: '10', position: "fixed" }} />
      <StyledSpeedDial
        ariaLabel="Profile Options"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction='down'
        sx={{
          position: "fixed",
          right: '16px',
          transform: 'translateY(38%)',
          color: 'ThreeDHighlight'

        }}

        icon=
        {
          <img className='speedDialIcon'
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt='Profile'
          />
        }
      >
        {options.map((item) => {
          return (
            <SpeedDialAction
              key={item.name}
              icon={item.icon}
              tooltipTitle={item.name}
              onClick={item.func}
            />
          )
        })
        }


      </StyledSpeedDial>
    </Fragment>
  )
}

export default UserOptions