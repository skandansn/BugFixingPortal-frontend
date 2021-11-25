import {useState,useEffect} from "react";
import {useHistory, useParams,Link} from "react-router-dom";
import NavBar from "./navbar";
import axios from 'axios';
import Loader from "../routes/Loader";
import SideNavbar from "./sidenavbar";


const ViewTesters = () =>{
    const [testers, setTesters] = useState([]);
    const [loading, setLoading] = useState(true);
    const id = useParams()
    const history = useHistory();
    useEffect(() => {
        axios.get(`http://localhost:8080/projects/${id.id}/testerlog`,{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
        .then(res => {
            setTesters(res.data);
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
                            <table className="table table-striped bg-light mar-top">
              <thead>
                  <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Handle</th>
                      <th scope="col">Projects Collaborated</th>
                      <th scope="col">Issues Reported in this Project</th>
                      <th scope="col">Solutions Provided in this Project</th>


                  </tr>
              </thead>
              <tbody>
                  {/* map through issues and display them */}
                  {testers.map((tester, index) => {
                      return (
                          <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>{tester.testerHandle}</td>
                              <td>{tester.testerProjects}</td>
                              <td>{tester.testerIssues}</td>
                              <td>{tester.testerSolutions}</td>
                              <td>{tester.testerRating}</td>
                          </tr>
                      );
                  })}
              </tbody>
          </table>
                            </div>
                        </div>
                    </div>
          
        </div>
          
    </div>


  );
};
export default ViewTesters;