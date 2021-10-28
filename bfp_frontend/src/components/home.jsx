import NavBar from "./navbar";
import axios from 'axios';
import {useState,useEffect} from "react";
import { Link } from "react-router-dom";

// Home component to get list of all the projects and display them
const Home = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        // Get all the projects from the database
        axios.get('http://localhost:8080/projects')
        .then(res => {
            setProjects(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
        });
    }, []);
    
    return (
        <div>
        <NavBar />
        <div className="container">
            <div className="row">
            <div className="col-md-12">
                <h1>Projects</h1>
                <Link to="/createProject/add" className="btn btn-primary">Add Project</Link>
            </div>
            </div>
            <br></br>
            <div className="row">
            {
                loading ?
                <div className="col-md-12">
                    <h2>Loading...</h2>
                </div>
                :
                projects.map(project => (
                    <div className="col-md-4" key={project.projectId}>
                    <div className="card">
                        <div className="card-body">
                        <h5 className="card-title">{project.projectId} {project.projectTitle}</h5>
                        <Link to={`/projects/${project.projectId}`} className="btn btn-primary">View Project</Link>
                        {/* <a href={project.link} target="_blank" className="btn btn-primary">View Project</a> */}
                        </div>
                    </div>
                    </div>
                ))
            }
            </div>
        </div>
        </div>
    );
    }
    export default Home;
