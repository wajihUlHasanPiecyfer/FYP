import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ClassIcon from '@mui/icons-material/Class';
import StyleIcon from '@mui/icons-material/Style';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { useSelector } from "react-redux";
import CommentIcon from '@mui/icons-material/Comment';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { user } = useSelector((state) => state.user)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600); // Adjust the breakpoint as needed
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const renderSidebarContent = () => {
    return (
      <div className="main-sidebar">
        <Link className="brand-link" to={"/"}>
          <img className="brand-image" src={logo} alt="Brand PIC" />
          <span className="brand-text font-weight-light">Lib Mng</span>
        </Link>
        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src="https://www.library-management.com/uploads/default.png"
                className="img-thumbnail border-0 p-0"
                alt="Admin"
              />
            </div>
            <div className="info">
              <span className="badge badge-danger">{user.name}</span>
            </div>
          </div>
          <div className="nav nav-pills nav-sidebar flex-column nav-flat nav-child-indent text-sm">
            <Link className="nav-item" to="/dashboard">
              <p className="nav-link">
                <DashboardIcon /> Dashboard
              </p>
            </Link>
            {user.role && user.role === "admin" ? <Link className="nav-item has-treeview">
              <TreeView
                className="nav-link"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ImportExportIcon />}
              >
                <TreeItem className="nav-item  zull" nodeId="1" label="Manage Books">
                  <Link className="nav-item" to="/admin/books">
                    <TreeItem className="nav-link" nodeId="2" label="All Books" icon={<PostAddIcon />} />
                  </Link>

                  <Link className="nav-item" to="/admin/book/new">
                    <TreeItem className="nav-link" nodeId="3" label="Create Book" icon={<AddIcon />} />
                  </Link>

                  <Link className="nav-item" to="/admin/issue-book">
                    <TreeItem className="nav-link" nodeId="3" label="Issue Book" icon={<LibraryBooksIcon />} />
                  </Link>
                  <Link className="nav-item" to="/admin/issued-books">
                    <TreeItem className="nav-link" nodeId="3" label="Issued Books" icon={<ClassIcon />} />
                  </Link>
                  <Link className="nav-item" to="/admin/reserved-books">
                    <TreeItem className="nav-link" nodeId="3" label="Rerservations" icon={<BookmarkAddedIcon />} />
                  </Link>
                  <Link className="nav-item" to="/admin/requested-books">
                    <TreeItem className="nav-link" nodeId="3" label="Requested Books" icon={<StyleIcon />} />
                  </Link>
                </TreeItem>
              </TreeView>
            </Link> : null}
            {user.role && user.role === "admin" ? <Link className="nav-item" to="/admin/users">
              <p className="nav-link">
                <PeopleIcon /> Users
              </p>
            </Link> : null}
            {user.role && user.role === "admin" ? <Link className="nav-item" to="/admin/feed-backs">
              <p className="nav-link">
                <CommentIcon /> Feedbacks
              </p>
            </Link> : null}
            {user.role && user.role === "user" ? <Link className="nav-item" to="/request-book">
              <p className="nav-link">
                <PeopleIcon /> Request For Books
              </p>
            </Link> : null}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {!isMobile && renderSidebarContent()} {/* Show sidebar for non-mobile screens */}
      {isMobile && (
        <>
          <IconButton className="menu-icon" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Drawer anchor="left" open={isOpen} onClose={toggleDrawer}>
            {renderSidebarContent()}
          </Drawer>
        </>
      )}
    </>
  );
};

export default Sidebar;
