import React, { useEffect } from "react";
import moment from "moment";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBContainer,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getRelatedTodos, getTodo } from "../redux/feature/todoSlice";
import { useNavigate } from "react-router-dom";
import RelatedTodos from "../components/RelatedTodos";
const SingleTodo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { todo,relatedTodos } = useSelector((state) => ({ ...state.todo }));
  const tags = todo?.tags;

  useEffect(() => {
    if (id) dispatch(getTodo(id));
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (tags) {
      dispatch(getRelatedTodos(tags));
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  return (
    <MDBContainer className="mt-5">
      <MDBCard className="mb-3 mt-5">
        <MDBCardImage
          position="top"
          style={{ width: "100%", maxHeight: "600px" }}
          src={todo?.imageFile}
          alt={todo?.title}
        />
        <MDBCardBody>
          <MDBBtn
            tag="a"
            color="none"
            style={{ float: "left", color: "#000" }}
            onClick={() => navigate("/")}
          >
            {/* <MDBIcon
              fas
              size="lg"
              icon="long-arrow-alt-left"
              style={{ float: "left" }}
            /> */}
            <MDBIcon fas icon="arrow-circle-left" size="2x" />
          </MDBBtn>
          <h3 className="d-flex justify-content-start ms-5 mb-3">
            {todo?.title}
          </h3>
          <span>
            <p className="text-start todoName">Created By: {todo?.name}</p>
          </span>
          <div style={{ float: "left" }}>
            <span className="text-start">
              {todo && todo.tags && todo.tags.map((item) => `#${item} `)}
            </span>
          </div>
          <br />
          <MDBCardText className="text-start mt-2 d-flex justify-content-start align-items-center">
            <MDBIcon
              style={{ float: "left", margin: "5px" }}
              far
              icon="calendar-alt"
              size="lg"
            />
            <small className="text-muted">
              {moment(todo?.createdAt).fromNow()}
            </small>
          </MDBCardText>
          <MDBCardText className="lead mb-0 text-start">
            {todo?.description}
          </MDBCardText>
        </MDBCardBody>
        <RelatedTodos relatedTodos={relatedTodos} todoId={id} />
      </MDBCard>
      {/* <DisqusThread id={id} title={tour.title} path={`/tour/${id}`} /> */}
    </MDBContainer>
  );
};

export default SingleTodo;
