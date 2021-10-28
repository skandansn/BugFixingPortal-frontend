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
        axios.delete(`http://localhost:8080/projects/${id.id}`)
        .then(res => {
            console.log(res);
            history.push("/");
        })
        .catch(err => {
            console.log(err);
        })
    }



    useEffect(() => {
        axios.get(`http://localhost:8080/projects/${id.id}`)
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
                    <h1>{project.projectId}</h1>
                    <h1>{project.projectTitle}</h1>
                    <p>{project.projectDesc}</p>
                    <p>{project.projectFiles}</p>
                    <p>{project.projectDownloadNo}</p>
                    <button className="btn btn-danger" onClick={deleteProject} > Delete Project</button>
                    <Link to={`/createProject/${project.projectId}`} className="btn btn-primary">Edit Project</Link>

                </div>
            )}
        </div>
    );
}
export default ViewProject;