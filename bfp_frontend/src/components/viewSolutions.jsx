import {useState,useEffect} from "react";
import {useHistory, useParams,Link} from "react-router-dom";
import NavBar from "./navbar";
import axios from 'axios';
import Loader from "../routes/Loader";
import SideNavbar from "./sidenavbar";


//card component to get solutions from api and display them

const ViewSolutions = () => {
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const {id, id2} = useParams()
  const history = useHistory();
  useEffect(() => {
    axios.get(`http://localhost:8080/projects/${id}/issues/${id2}/solutions`,{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
    .then(res => {
        setSolutions(res.data);
        setLoading(false);
    })
    .catch(err => {
        console.log(err);
    });
  }, []);

  return (
    <div>
    <NavBar />
    <div className="desc-page container-fluid px-4 mar-top">
                <div className="grid-container-desc ">
                    <SideNavbar />
                    <div className="grid-chid-b bg-danger " id="desc-container">
                        <div>
                        <button className="btn btn-success" onClick={() => history.goBack()}>Go Back</button>
                        {/* <Link to={`/createProject/${id.id}i`} className="btn btn-success">Add Issues</Link> */}
                        <table className="table table-striped bg-light mar-top">
              <thead>
                  <tr>
                      <th scope="col">#</th>
                      <th scope="col">Title</th>
                      <th scope="col">Description</th>
                      <th scope="col">Files</th>
                      <th scope="col">Created By</th>

                  </tr>
              </thead>
              <tbody>
                  {/* map through solutions and display them */}
                  {solutions.map((solution, index) => {
                      return (
                          <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>{solution.solutionTitle}</td>
                              <td>{solution.solutionDesc}</td>
                              <td>{solution.solutionFiles}</td>
                              <td>{solution.assignedTo}</td>
                              <td>{solution.createdBy}</td>
                          </tr>
                      );
                  })}
              </tbody>
          </table>
                        </div>
                            </div>
                            </div>
          </div></div>


  );
};
export default ViewSolutions;