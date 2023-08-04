import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./newBook.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar.js";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import { getUserDetails, updateUser, clearErrors } from "../../actions/userAction";
import { Loader } from "../layout/Loader/Loader";
import Swal from "sweetalert2";


const UpdateUser = () => {
    const dispatch = useDispatch();
    const history = useNavigate();

    const { loading, error, user } = useSelector((state) => state.userDetails);
    const { error: updateError, isUpdated } = useSelector((state) => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [education, setEducation] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");

    const { id } = useParams();
    const userId = id



    useEffect(() => {

        if (user && user._id !== userId) {
            dispatch(getUserDetails(userId));
        } else {
            setName(user.name);
            setEmail(user.email);
            setEducation(user.education);
            setPhoneNumber(user.phoneNumber);
            setAddress(user.address);
            setRole(user.role);

        }
        if (error) {
            Swal.fire("Error!", error, "error");
            dispatch(clearErrors);
        }
        if (updateError) {
            Swal.fire("Error!", updateError, "error");
            dispatch(clearErrors);
        }

        if (isUpdated) {
            Swal.fire("Updated!", "User Updated Successfully", "success");
            history("/admin/users");
            dispatch({ type: UPDATE_USER_RESET });
        }
    }, [dispatch, error, history, updateError, isUpdated, user, userId]);

    const updateUserSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("education", education);
        myForm.set("phoneNumber", phoneNumber);
        myForm.set("address", address);
        myForm.set("role", role);

        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                dispatch(updateUser(userId, myForm));
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
    };



    return (
        <Fragment>
            <MetaData tiltle="Update User -- Admin" />
            <div className="dashboard">
                <Sidebar />

                <div className="newProductContainer">
                    <div className="content">
                        <div className="card">
                            <div className="card-body">
                                {loading ? <Loader /> :
                                    <form
                                        className="createProductForm"
                                        encType="multipart/form-data"
                                        onSubmit={updateUserSubmitHandler}
                                    >
                                        <h1 className="bookCreateHeading">Update User</h1>

                                        <div className="bookCreateMain">
                                            <div className="col-md-12 col-12 mb-10 bookCreateRight">
                                                <div className="row no-gutters">

                                                    <div className="form-group col-md-6 col-12">
                                                        <div className="input-group">
                                                            <div className="input-group-preppend">
                                                                <div className="input-group-text ">Name</div>
                                                            </div>
                                                            <input
                                                                className="form-control"
                                                                type="name"
                                                                required
                                                                value={name}
                                                                onChange={(e) => setName(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group col-md-6 col-12">
                                                        <div className="input-group">
                                                            <div className="input-group-preppend">
                                                                <div className="input-group-text ">Role</div>
                                                            </div>
                                                            <select
                                                                className="form-control"
                                                                type="text"
                                                                required
                                                                value={role}
                                                                onChange={(e) => setRole(e.target.value)}
                                                            >
                                                                <option value="" >Choose Role</option>
                                                                <option value="admin" >Admin</option>
                                                                <option value="user" >User</option>

                                                            </select>
                                                        </div>
                                                    </div>


                                                    <div className="form-group col-md-6 col-12">
                                                        <div className="input-group">
                                                            <div className="input-group-preppend">
                                                                <div className="input-group-text ">Email</div>
                                                            </div>
                                                            <input
                                                                className="form-control"
                                                                type="email"
                                                                required
                                                                value={email}
                                                                onChange={(e) => setEmail(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group col-md-6 col-12">
                                                        <div className="input-group">
                                                            <div className="input-group-preppend">
                                                                <div className="input-group-text ">Phone No.</div>
                                                            </div>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                value={phoneNumber}
                                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>


                                                    <div className="form-group col-md-12 col-12">
                                                        <div className="input-group">
                                                            <div className="input-group-preppend">
                                                                <div className="input-group-text">Education</div>
                                                            </div>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                value={education}
                                                                onChange={(e) => setEducation(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group col-md-12 col-12">
                                                        <div className="input-group">
                                                            <div className="input-group-preppend">
                                                                <div className="input-group-text ">Address</div>
                                                            </div>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                value={address}
                                                                onChange={(e) => setAddress(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>



                                                    <div>
                                                        <button
                                                            className="btn btn-primary createBookBtn"
                                                            type="submit"
                                                            disabled={loading ? true : false || role === "" ? true : false}
                                                        >
                                                            Update
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};



export default UpdateUser