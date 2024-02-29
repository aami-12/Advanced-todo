import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
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
  MDBCardGroup,
} from "mdb-react-ui-kit";
import { useNavigate, useParams } from "react-router-dom";
import { todosBytag } from "../redux/feature/todoSlice";
import { excerpt } from '../utils';
import Spinner from '../components/Spinner';

const TagTodos = () => {
  const dispatch = useDispatch();
  const { tagTodos,loading } = useSelector((state) => ({ ...state.todo }));
  const { tag } = useParams();
  const navigate = useNavigate()
  useEffect(() => {
    if (tag) {
      dispatch(todosBytag(tag));
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tag]);

  if(loading){
    return <Spinner />
  }

  return (
    <div
      style={{
        margin: "auto",
        padding: "120px",
        maxWidth: "900px",
        alignContent: "center",
      }}
    >
            <h3 className="text-center">Notes with tag: {tag}</h3>
            {tagTodos &&
        tagTodos.map((item) => (
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
                      {excerpt(item.description, 40)}
                    </MDBCardText>
                    <div style={{ float: "left", marginTop: "-10px" }}>
                      <MDBBtn
                        size="sm"
                        rounded
                        color="info"
                        onClick={() => navigate(`/todo/${item._id}`)}
                      >
                        Read More
                      </MDBBtn>
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

export default TagTodos;
