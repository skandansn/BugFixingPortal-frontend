import {useState,useEffect} from "react";
import {useHistory, useParams,Link} from "react-router-dom";
import NavBar from "./navbar";
import axios from 'axios';


const ViewProject = () => {
    const [project, setProject] = useState({});
    const [isLoading, setLoading] = useState(true);
    const history = useHistory();
    const id = useParams()


    //delete project
    const deleteProject = () => {
        axios.delete(`http://localhost:8080/projects/${id.id}`,{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
        .then(res => {
            history.push("/home");
        })
        .catch(err => {
            console.log(err);
        })
    }



    useEffect(() => {
        axios.get(`http://localhost:8080/projects/${id.id}`,{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
        .then(res => {
            setProject(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    return (
        <div>
            <NavBar/>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <h1>{project.projectId} | {project.projectTitle}</h1>
                    <hr></hr>
                    <p>Description: {project.projectDesc}</p>
                    <p>Files: {project.projectFiles}</p>
                    <p>Download Count: {project.projectDownloadNo}</p>
                    <Link to={`/createProject/${project.projectId}`} className="btn btn-success">Edit Project</Link>
                    <Link to={`/createProject/${project.projectId}i`} className="btn btn-warning">Add Issues</Link>
                    <Link to={`/projects/${project.projectId}/issues`} className="btn btn-secondary">View Issues</Link>


                    


                    

                    <br></br>
                    <br></br>
                    <button className="btn btn-danger" onClick={deleteProject} > Delete Project</button>

                </div>
            )}
        </div>
    );
}
export default ViewProject;