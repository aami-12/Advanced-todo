import React, { useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../redux/feature/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { todosBySearch } from "../redux/feature/todoSlice";
import decode from 'jwt-decode'
const Header = () => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState('')
  const navigate= useNavigate()
  const { users } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();

  const token = users?.token

  if(token){
    const decodedToken = decode(token)
    console.log(decodedToken,"token");
    if(decodedToken.exp * 1000 < new Date().getTime()){
      dispatch(setLogout());
    }
  }


  const handleLogout = () => {
    dispatch(setLogout());
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if(search){
      dispatch(todosBySearch(search))
      navigate(`/todo/search?searchQuery=${search}`)
      setSearch('')
    }else{
      navigate('/')
    }
  }

  return (
    <MDBNavbar fixed="top" expand="lg" style={{ backgroundColor: "#f0e6ea" }}>
      <MDBContainer>
        <MDBNavbarBrand
          href="/"
          style={{ color: "#606080", fontWeight: "600", fontSize: "22px" }}
        >
          TaskFusion
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toogle navigation"
          onClick={() => setShow(!show)}
          style={{ color: "#606080" }}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse show={show} navbar>
          <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
            {users?.result?._id && (
                <h5 style={{marginRight:"30px", marginTop:"27px"}}>
                    Logged in as : {users?.result?.name}
                </h5>
            )}
            <MDBNavbarItem>
              <MDBNavbarLink  href="/">
                <p className="header-text">Home</p>
              </MDBNavbarLink>
            </MDBNavbarItem>
            {users?.result?._id && (
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/add-todo">
                    <p className="header-text">Add Todo</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink >
                   <Link to='/dashboard'><p className="header-text">Dashboard</p></Link> 
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </>
            )}
            {users?.result?._id ? (
              <MDBNavbarItem>
                <MDBNavbarLink href="/">
                  <p className="header-text" onClick={handleLogout}>
                    Logout
                  </p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            ) : (
              <MDBNavbarItem>
                <MDBNavbarLink href="/login">
                  <p className="header-text">Login</p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            )}
          </MDBNavbarNav>
          <form className="d-flex input-group w-auto" onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="Search Todo"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div style={{ marginTop: "5px", marginLeft: "5px" }}>
              <MDBIcon fas icon="search" />
            </div>
          </form>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Header;
