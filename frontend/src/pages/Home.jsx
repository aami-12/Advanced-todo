import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { getTodos, setCurrentPage } from "../redux/feature/todoSlice";
import CardTodo from "../components/CardTodo";
import Spinner from "../components/Spinner";
import { useLocation } from "react-router-dom";
import Pagination from "../components/Pagination";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const dispatch = useDispatch();
  const query = useQuery();
  const location = useLocation();
  const searchQuery = query.get("searchQuery");
  const  {todos, loading, currentPage, numberOfPages} = useSelector((state) => ({...state.todo}))

  useEffect(() => {
    dispatch(getTodos(currentPage));
  }, [currentPage]);

  if(loading) {
    return <Spinner />
  }

  return (
    <div
    style={{
      margin: "auto",
      padding: "15px",
      maxWidth: "1000px",
      alignContent: "center",
    }}
  >
    <MDBRow className="mt-5">
      {todos.length === 0 && window.location.pathname === "/" && (
        <MDBTypography className="text-center mb-0" tag="h2">
          No Notes Found
        </MDBTypography>
      )}

      {todos.length === 0 && location.pathname !== "/" && (
        <MDBTypography className="text-center mb-0" tag="h2">
          We couldn't find any matches for "{searchQuery}"
        </MDBTypography>
      )}

      <MDBCol>
        <MDBContainer>
          <MDBRow className="row-cols-1 row-cols-md-3 g-2">
            {todos &&
              todos?.map((item) => <CardTodo key={item._id} {...item} />)}
          </MDBRow>
        </MDBContainer>
      </MDBCol>
    </MDBRow>
    {todos.length > 0 && !searchQuery && (
      <Pagination
        setCurrentPage={setCurrentPage}
        numberOfPages={numberOfPages}
        currentPage={currentPage}
        dispatch={dispatch}
      />
    )}
  </div>
  );
};

export default Home;
