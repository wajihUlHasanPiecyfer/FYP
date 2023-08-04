// src/FeedbackForm.js

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitFeedback, clearErrors } from "../../actions/userAction";
import Swal from "sweetalert2";
import { SUBMIT_FEEDBACK_RESET } from "../../constants/userConstants";
import "./FeedbackForm.css";

export const FeedbackForm = () => {
  const dispatch = useDispatch();
  const { error, isSubmitted, message } = useSelector(
    (state) => state.feedback
  );

  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (error) {
      Swal.fire("Error!", error, "error");
      dispatch(clearErrors);
    }
    if (isSubmitted) {
      Swal.fire("Success!", message, "success");
      dispatch({ type: SUBMIT_FEEDBACK_RESET });
    }
  }, [dispatch, error, isSubmitted, message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("feedback", feedback);
    myForm.set("email", email);
    myForm.set("name", name);

    dispatch(submitFeedback(myForm));
  };

  return (
    <>
    <div className="feed-container">
      <div className="card">
        <div className="card-header">
          <h2 className="text-center">Feedback Form</h2>
        </div>

        <div className="card-body">
          <div className="row">
            <div className="col">
              <form onSubmit={handleSubmit}>
                <div className="form-group row">
                  <div className="col-md-6 col-12 mb-2">
                    <input
                      className="form-control"
                      type="name"
                      value={name}
                      placeholder="Name"
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6 col-12 mb-2">
                    <input
                      className="form-control"
                      type="email"
                      placeholder="email@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="mb-2 col-12">
                    <textarea
                      className="form-control"
                      type="text"
                      value={feedback}
                      placeholder="Feedback"
                      onChange={(e) => setFeedback(e.target.value)}
                      rows="4"
                      required
                    />
                  </div>
                </div>

                <button className="btn btn-primary createBookBtn" type="submit" disabled={isSubmitted}>
                  {isSubmitted ? "Submitting..." : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default FeedbackForm;
