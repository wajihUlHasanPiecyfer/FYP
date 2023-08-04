import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserChats, clearErrors, deleteChat } from '../../actions/userAction';
import './Notifications.css'; // Import your CSS file
import Swal from "sweetalert2";
import MetaData from '../layout/MetaData';
import { Loader } from '../layout/Loader/Loader';
import { DELETE_CHAT_RESET } from '../../constants/userConstants';

const Notifications = () => {
    const dispatch = useDispatch();
    const { chats, loading, error } = useSelector((state) => state.userChats);
    const { message, error:deleteError ,isDeleted} = useSelector((state) => state.deleteChats);

    useEffect(() => {
        if (error) {
            Swal.fire(error, "error");
            dispatch(clearErrors)
        }
        if (deleteError) {
            Swal.fire(deleteError, "error");
            dispatch(clearErrors)
        }

        if(isDeleted){
            Swal.fire(message,"success")
            dispatch({type: DELETE_CHAT_RESET})
        }

        dispatch(fetchUserChats());
    }, [dispatch, error,isDeleted, message, deleteError]);


    const handleDeleteChat = (chatId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(deleteChat(chatId));
            }
          });
      };

    return (
        <>
            {loading ? <Loader /> :
                <>
                    <MetaData title="Notifications" />
                    <div className="chat-container">
                        <h3 className="chat-heading">Notifications:</h3>
                        <ul className="chat-list">
                            {chats && chats.length !== 0 ? chats.map((chat) => (
                                <li key={chat._id} className="chat-item">
                                    <span className="chat-message">{chat.message}</span>
                                    <button
                                        className="delete-button"
                                    onClick={() => handleDeleteChat(chat._id)}
                                    >
                                        Delete
                                    </button>
                                </li>
                            )) : <span className="chat-message">No chat messages found.</span>
                            }
                        </ul>
                    </div>
                </>
            }
        </>
    )
}

export default Notifications;
