import {useState,useEffect} from "react";
import {useHistory, useParams,Link} from "react-router-dom";
import NavBar from "./navbar";
import axios from 'axios';
import SideNavbar from "./sidenavbar";


const ViewProject = () => {
    const [project, setProject] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [downloadNo, setDownloadNo] = useState(0);
    const history = useHistory();
    const id = useParams()
    const [buttons, setButtons] = useState(false);
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

    //function axios patch to increase download count
    const increaseDownloadCount = () => {
        axios.get(`http://localhost:8080/projects/${id.id}/download`,{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
        .then(res => {
            setDownloadNo('');
        })
        .catch(err => {
            console.log(err);
        })
    }


    useEffect(() => {
        axios.get(`http://localhost:8080/projects/${id.id}`,{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
        .then(res => {
            setProject(res.data);
            setDownloadNo(res.data.projectDownloadNo);
            const token = localStorage.getItem('token');
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            const decodedToken = JSON.parse(window.atob(base64));
            if(decodedToken.sub == res.data.user.userEmail){
                setButtons(<div><Link to={`/createProject/${id.id}`} className="btn btn-success mr-10">Edit Project</Link>
                <button onClick={deleteProject} className="btn btn-dark">Delete Project</button></div>)
        
            } else{
                setButtons(null)
            }
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
        });
    }, [downloadNo]);

    

    return (
        <div>
            <NavBar/>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                
                <div className="desc-page container-fluid px-4 mar-top">
                    <div className="grid-container-desc">
                    <SideNavbar />
                    <div className="grid-chid-b bg-danger" id="desc-container">
                        <div>
                        <div style={{display:"inline"}}>
                        <h1 >{project.projectId} | {project.projectTitle}</h1>
                        </div>
                        
                    <hr></hr>
                    {/* <p>Description: {project.projectDesc}</p> */}
                    {/* <p>Files: {project.projectFiles}</p> */}
                    <button onClick = {increaseDownloadCount} className="btn-warning btn-lg"><a href={project.projectFiles} style={{"text-decoration": "none","color":"black"}}>Download Code</a></button>
                    <p>Download Count: {downloadNo}</p>
                    {/* <Link to={`/createProject/${project.projectId}`} className="btn btn-success">Edit Project</Link> */}
                    {/* <Link to={`/createProject/${project.projectId}i`} className="btn btn-warning">Add Issues</Link> */}
                    {/* <Link to={`/projects/${project.projectId}/issues`} className="btn btn-secondary">View Issues</Link> */}
                    <div>
                        {buttons}
                        </div>
                    {/* <button className="btn btn-danger" onClick={deleteProject} > Delete Project</button> */}

                        </div>
                    </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default ViewProject;