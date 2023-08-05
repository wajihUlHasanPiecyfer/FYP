import React, { Fragment, useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./Dhashboard.css";
import { useDispatch, useSelector } from "react-redux"
import { getIssuedBooks, getAdminBook } from "../../actions/bookAction.js"
import { getAllUsers } from '../../actions/userAction.js';
import BorrowedBooksByUser from "./BorrowedBooksByUser.js"
import { Typography } from "@mui/material";
import MetaData from '../layout/MetaData';
import { Link } from "react-router-dom";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { Doughnut, Line } from "react-chartjs-2";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  // registerables,
} from "chart.js";

// export const registerChartJs = () => {
ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip
  // ...registerables,
);
// };

const Dashboard = () => {

  const dispatch = useDispatch()
  const { books } = useSelector((state) => state.books)
  const { users } = useSelector((state) => state.allusers);
  const { issueBooks } = useSelector((state) => state.issuedBooks);
  const { user } = useSelector((state) => state.user);




  let outOfStock = 0;

  books && books.forEach((item) => {
    if (item.quantity === 0) {
      outOfStock += 1
    }
  })

  useEffect(() => {

    if (user && user.role === "admin") {
      dispatch(getAdminBook());
      dispatch(getAllUsers());
      dispatch(getIssuedBooks());
    }
  }, [dispatch,user, user.role])

  const lineState = {
    labels: ["initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "Total Ammount",
        backgroundColor: "#457b9d",
        hoverBackgroundColor: ["tomato"],
        data: [0, 1000, 4000],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#457b9d", "red"],
        hoverBackgroundColor: ["tomato", "aqua"],
        data: [outOfStock, books && books.length - outOfStock],
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    scales: {
      y: {
        type: "linear",
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  return (
    <Fragment>
      <MetaData title="DASHBOARD" />
      <div className="dashboard">
        <Sidebar />

        <div className="dashboardContainer">
          <Typography component="h1">Dashboard
            {user.role === "user" && <Link to="/notifications"> <NotificationsActiveIcon className="noti-btn" /></Link>}
          </Typography>

          {user.role === "admin" ? (
            <div className="dashboardSummaryBox2">
              <Link to="/admin/books">
                <p>Book</p>
                <p>{books && books.length}</p>
              </Link>

              <Link to="/admin/users">
                <p>Users</p>
                <p>{users && users.length}</p>
              </Link>

              <Link to="/admin/issued-Books">
                <p>Issued BOOKS</p>
                <p>{issueBooks && issueBooks.length}</p>
              </Link>
            </div>) : (null)
          }

          <div className="lineChart">
            {user.role === "admin" && <Line data={lineState} options={lineOptions} />}
          </div>
          <div className="doughnutChart">
            {user.role === "admin" &&
              <Doughnut
                data={doughnutState}
              />
            }
          </div>

          {user.role === "user" && <BorrowedBooksByUser />}
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
