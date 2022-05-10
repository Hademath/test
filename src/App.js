import './App.css';
import React, { useState, useEffect,useMemo } from "react";
// import { Link, Router } from "react-router-dom";
import axios from "axios";
import Table from "./table";
import styled from "styled-components";

// import useStyles;
const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;

      }
    }
  }
 
`;
// style the classNAme pagination

  const pagination = {
    padding: " 0.5rem",
    display: "flex",
    justifyContent: "center",
    margin: "1rem",   
  }
// button styled   
const button = {
  backgroundColor: "green",     
  color: "white", 
  border: "none",
  padding: "5px 10px",
}  




function App() {
  const [state, setState] = useState({
    planets: [],
    currentPage: 1,
    planetsPerPage: 5,
  });
  useEffect(() => {
    axios
      .get(`https://swapi.dev/api/planets/?page=${state.currentPage}`)  // fetching data from swapi.dev
      .then((res) => {  
        setState({ ...state, planets: res.data.results });
        console.log(state.planets) 
      }
    )
  }, [state.currentPage]);

  const handleClick = (e) => {
    setState({ ...state, currentPage: Number(e.target.id)});
  }
  const handleNext = () => {  
    setState({ ...state, currentPage: state.currentPage + 1 }); 
  }
  const handlePrevious = () => {
    if (state.currentPage > 1) {
      setState({ ...state, currentPage: state.currentPage - 1 });
    }
    
  }
  const handleLast = () => {
    setState({ ...state, currentPage: state.planets.length / state.planetsPerPage });   
  }
  const handleFirst = () => {
    setState({ ...state, currentPage: 1 }); 
  }
  // handle search  
  const handleSearch = (e) => {
    setState({ ...state, search: e.target.value });
  }


//  const data = React.useMemo(
//    () => [
//      {
//        col1: "Hello",
//        col2: "World",
//      },
//      {
//        col1: "react-table",
//        col2: "rocks",
//      },
//      {
//        col1: "whatever",
//        col2: "you want",
//      },
//    ],
//    []
//  );
 
  
  const columns = useMemo(
    () => [
          {
            Header: "Name",
            accessor: "name",
            width: 200,
          },
          {
            Header: "Rotation Period",
            accessor: "rotation_period",
            width: 200,
          },
          {
            Header: "Orbital Period",
            accessor: "orbital_period",
            width: 200,
          },
          {
            Header: "Diameter",
            accessor: "diameter",
            width: 200,
          },
          {
            Header: "Climate",
            accessor: "climate",
            width: 200,
          },
          {
            Header: "Gravity",
            accessor: "gravity",
            width: 200,
          },
          {
            Header: "Terrain",
            accessor: "terrain",
            width: 200,
          },
          {
            Header: "Surface Water",
            accessor: "surface_water",
            width: 200,
          },
          {
            Header: "Population",
            accessor: "population",
            width: 200,
      },
      {
        Header: "Residents",    
        accessor: "residents",    
        Cell: ({ row }) => (
          <div>
            <button style={{ backgroundColor: "green", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}    
              onClick={() => {  
                window.location.href = row.original.residents;    
              }
              } 
            >
              Residents
            </button>
          </div>  
        ),
        width: 200,
      },    
    
    ],
    []
  );
  
 
  return (
    <div className="App">
      <Styles>
        <Table columns={columns} data={state.planets} />
      </Styles>
      <div className="pagination" style={pagination}>
        <button onClick={handleFirst}>First</button>
        <button onClick={handlePrevious}>Previous</button>
        <button id="2" onClick={handleClick}>
          2
        </button>
        <button id="3" onClick={handleClick}>
          3
        </button>
        <button id="4" onClick={handleClick}>
          4
        </button>
        <button id="5" onClick={handleClick}>
          5
        </button>

        <button onClick={handleNext}>Next</button>
        <button onClick={handleLast}>Last</button>
      </div>
    </div>
  );

}

export default App;
