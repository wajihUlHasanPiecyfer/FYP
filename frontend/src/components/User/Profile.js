import React, { Fragment, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import { Link , useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Loader } from '../layout/Loader/Loader'
import "./Profile.css"

const Profile = () => {

    const history = useNavigate()
    const { user, loading, isAuthenthicated } = useSelector((state) => state.user)

    useEffect(() => {
    if(isAuthenthicated ===false){
        history('/login')
    }
    
    }, [history,isAuthenthicated])
    

    return (
        <Fragment>
            {loading ? <Loader /> : <Fragment>
                <MetaData title={`${user.name}'s Profile`} />
                <div className='profileContainer'>
                    <div>
                        <h1>My Profile</h1>
                        <img src={user.avatar.url ? user.avatar.url : "/Profile.png"} alt={user.name} />
                        <Link to='/profile/update'>Edit Profile</Link>
                    </div>
                    <div>
                        <div>
                            <h4>Full Name</h4>
                            <p>{user.name}</p>
                        </div>
                        <div>
                            <h4>Email</h4>
                            <p>{user.email}</p>
                        </div>
                        <div>
                            <h4>Education</h4>
                            <p>{user.education}</p>
                        </div>
                        <div>
                            <h4>Phone Number</h4>
                            <p>{user.phoneNumber}</p>
                        </div>
                        <div>
                            <h4>Address</h4>
                            <p>{user.address}</p>
                        </div>
                        <div>
                            <h4>Joined On</h4>
                            <p>{String(user.createdAt).substring(0, 10)}</p>
                        </div>
                        <div>
                            { user.role === "user" ? <Link to="/dashboard">My Books</Link> : null}
                            <Link to="/password/update">Change Password</Link>
                        </div>
                    </div>

                </div>
            </Fragment>}
        </Fragment>
    )
}

export default Profile