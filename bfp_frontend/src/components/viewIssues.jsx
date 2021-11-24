import {useState,useEffect} from "react";
import {useHistory, useParams,Link} from "react-router-dom";
import NavBar from "./navbar";
import axios from 'axios';
import SideNavbar from "./sidenavbar";

const ViewIssues = () => {
    const [issues, setIssues] = useState([]);
    // const [project, setProject] = useState({});
    const [isLoading, setLoading] = useState(true);
    const history = useHistory();
    const id = useParams()
    // const [isLoading, setLoading] = useState(true);
    // const history = useHistory();
    // const id = useParams()
    useEffect(() => {
        axios.get(`http://localhost:8080/projects/${id.id}/issues`,{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
        .then(res => {
            setIssues(res.data);
            setLoading(false);
            // setProject(res.data);
            // setLoading(false);
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
                            <Link to={`/createProject/${id.id}i`} className="btn btn-success">Add Issues</Link>
                            <table className="table table-striped bg-light mar-top">
              <thead>
                  <tr>
                      <th scope="col">#</th>
                      <th scope="col">Title</th>
                      <th scope="col">Description</th>
                      <th scope="col">Files</th>
                      <th scope="col">Created By</th>
                      <th scope="col">Solutions</th>

                  </tr>
              </thead>
              <tbody>
                  {/* map through issues and display them */}
                  {issues.map((issue, index) => {
                      return (
                          <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>{issue.issueTitle}</td>
                              <td>{issue.issueDesc}</td>
                              <td>{issue.issueFiles}</td>
                              <td>{issue.assignedTo}</td>
                              <td>{issue.user.userHandle}</td>
                                <td>
                                <Link to={`/createProject/s${issue.issueId}p${id.id}`}>
                                        <button className="btn btn-warning mr-10">Give Solution</button>
                                    </Link>
                                    <Link to={`/projects/${id.id}/issues/${issue.issueId}/solutions`}>
                                        <button className="btn btn-warning">View Solutions</button>
                                    </Link>
                                </td>
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
export default ViewIssues;