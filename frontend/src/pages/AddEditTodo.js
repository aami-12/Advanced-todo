import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBValidation,
  MDBBtn,
  MDBInput,
  MDBValidationItem,
  MDBSpinner,
  MDBTextArea,
} from "mdb-react-ui-kit";
import ChipInput from "material-ui-chip-input";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { createTodo, updateUsersTodo } from "../redux/feature/todoSlice";

const initialState = {
  title: "",
  description: "",
  tags: [],
};

const AddEditTodo = () => {
  const [todoData, setTodoData] = useState(initialState);
  const dispatch = useDispatch();
  const { userTodos, loading, errors } = useSelector((state) => ({
    ...state.todo,
  }));
  const { users } = useSelector((state) => ({ ...state.auth }));
  const navigate = useNavigate();
  const { id } = useParams();
  const { title, description, tags } = todoData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTodoData({ ...todoData, [name]: value });
  };

  useEffect(() => {
    if (id) {
      const singleTodo = userTodos.todo.find((todo) => todo._id === id); 
      setTodoData({ ...singleTodo });
    }
  }, [id,dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && description && tags) {
      const updatedTodoData = { ...todoData, name: users?.result?.name };

      if (!id) {
        dispatch(createTodo({ updatedTodoData, navigate, toast }));
      } else {
        dispatch(updateUsersTodo({ id, updatedTodoData, toast, navigate }));
      }

      handleClear();
    }
  };

  const handleAddTag = (tag) => {
    setTodoData({ ...todoData, tags: [...todoData.tags, tag] });
  };
  const handleDeleteTag = (deleteTag) => {
    setTodoData({
      ...todoData,
      tags: todoData.tags.filter((tag) => tag !== deleteTag),
    });
  };
  const handleClear = () => {
    setTodoData({
      title: "",
      description: "",
      tags: [],
    });
  };

  useEffect(() => {
    errors && toast.error(errors);
  }, [errors]);
  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "500px",
        alignContent: "center",
        marginTop: "120px",
      }}
      className="container"
    >
      <MDBCard alignment="center">
        <h5 className="mt-3">{id ? "Update Notes" : "Add Notes"}</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <div className="col-md-12">
              <MDBValidationItem feedback="Please provide Title." invalid>
                <MDBInput
                  value={title}
                  placeholder="Enter Title"
                  name="title"
                  onChange={handleInputChange}
                  id="validationCustom03"
                  required
                  label="Title"
                />
              </MDBValidationItem>
            </div>
            <div className="col-md-12">
              <MDBValidationItem feedback="Please provide description." invalid>
                <MDBTextArea
                label='Message' id='textAreaExample' rows={4}
                  value={description}
                  // placeholder="Enter Description"
                  name="description"
                  onChange={handleInputChange}
                  // id="validationCustom03"
                  // textarea
                  // rows={4}
                  required
                  // label="Description"
                />
              </MDBValidationItem>
            </div>
            <div className="col-md-12">
              <ChipInput
                name="tags"
                variant="outlined"
                placeholder="Enter Tag"
                fullWidth
                value={tags}
                onAdd={(tag) => handleAddTag(tag)}
                onDelete={(tag) => handleDeleteTag(tag)}
              />
            </div>
            <div className="d-flex justify-content-start">
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setTodoData({ ...todoData, imageFile: base64 })
                }
              />
            </div>
            <div className="col-md-12">
              <MDBBtn type="submit" color="primary" className="w-100 mt-2">
                 {loading && <MDBSpinner size="sm" />} {id ? "Update Todo" :"Add Todo"}
              </MDBBtn>
              <MDBBtn
                color="danger"
                className="w-100 mt-2"
                onClick={handleClear}
              >
                {/* {loading && <MDBSpinner size="sm" />}  */}Clear
              </MDBBtn>
            </div>
          </MDBValidation>
          <br />
          {/* <GoogleLogin
              clientId=""
              render={(renderProps) => {
                <MDBBtn
                style={{width:"100%"}}
                  className="w-100 mt-2"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                 <MDBIcon size="1x" className="me-2" fab icon="google" /> Login with Google
                </MDBBtn>;
              }}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            /> */}
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default AddEditTodo;
