import React, { useEffect } from "react";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBCardGroup,
} from "mdb-react-ui-kit";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { deleteUsersTodo, getUsersTodos } from "../redux/feature/todoSlice";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

const Dashboard = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { users } = useSelector((state) => ({ ...state.auth }));
  const { userTodos, loading } = useSelector((state) => ({ ...state.todo }));
  const userId = users?.result?._id;

  const excerpt = (str) => {
    if (str.length > 40) {
      str = str.substring(0, 40) + " ...";
    }
    return str;
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this Todo ?")) {
      dispatch(deleteUsersTodo({ id, toast,dispatch, userId }));
    }
  };

  useEffect(() => {
    if (userId) {
      dispatch(getUsersTodos(userId));
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  if (loading) {
    return <Spinner />;
  }

  return (
    // <></>
    <div
      style={{
        margin: "auto",
        padding: "120px",
        maxWidth: "900px",
        alignContent: "center",
      }}
    >
      {userTodos.todo && userTodos.todo.length === 0 && (
        <h3>No todo available with the user: {users?.result?.name}</h3>
      )}

      {userTodos.todo && userTodos.todo.length > 0 && (
        <>
          <h5 className="text-center">Dashboard: {users?.result?.name}</h5>
          <hr style={{ maxWidth: "570px" }} />
        </>
      )}

      {userTodos.todo &&
        userTodos?.todo.map((item) => (
          <MDBCardGroup key={item._id}>
            <MDBCard style={{ maxWidth: "600px" }} className="mt-2">
              <MDBRow className="g-0">
                <MDBCol md="4">
                  <MDBCardImage
                    className="rounded"
                    src={item.imageFile}
                    alt={item.title}
                    fluid
                  />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody>
                    <MDBCardTitle className="text-start">
                      {item.title}
                    </MDBCardTitle>
                    <MDBCardText className="text-start">
                      <small className="text-muted">
                        {excerpt(item.description)}
                      </small>
                    </MDBCardText>
                    <div
                      style={{
                        marginLeft: "5px",
                        float: "right",
                        marginTop: "-60px",
                      }}
                    >
                      <MDBBtn className="mt-1" tag="a" color="none">
                        <MDBIcon
                          fas
                          icon="trash"
                          style={{ color: "#dd4b39" }}
                          size="lg"
                          onClick={() => handleDelete(item._id)}
                        />
                      </MDBBtn>
                      <Link to={`/edit-todo/${item._id}`}>
                        <MDBIcon
                          fas
                          icon="edit"
                          style={{ color: "#55acee", marginLeft: "10px" }}
                          size="lg"
                        />
                      </Link>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCardGroup>
        ))}
    </div>
  );
};

export default Dashboard;
