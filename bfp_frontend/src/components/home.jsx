import NavBar from "./navbar";
import axios from 'axios';
import {useState,useEffect} from "react";
import { Link } from "react-router-dom";

// Home component to get list of all the projects and display them
const Home = () => {
    const [projects, setProjects] = useState([]);
    const [Searchprojects, setSearchProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleSearch = (e) => {
        let value=e.target.value.toLowerCase();
        let result=[];
        result=Searchprojects.filter(project=>{
            return project.projectTitle.toLowerCase().search(value)!=-1;
        });
        setProjects(result);
    }

    
    useEffect(() => {
        // Get all the projects from the database
        axios.get('http://localhost:8080/projects',{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
        .then(res => {
            setProjects(res.data);
            setSearchProjects(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
        });
    }, []);
    
    return (
        <div className="bg">
        <NavBar />
        <div className="container">
            <div className="row">
            <div className="col-md-12">
                <h1>Project Dashboard</h1>
                {/* search bar to filter the projects  */}
                <input type="text" className="form-control" placeholder="Search Projects" onChange={(e) => handleSearch(e)} />
                <Link to="/createProject/add" className="btn btn-lg btn-success">Add Project</Link>
            </div>
            </div>
            <hr></hr>
            <div className="row">
            {
                loading ?
                <div className="col-md-12">
                    <h2>Loading...</h2>
                </div>
                :
                projects.map(project => (
                    <div className="col-lg-6" key={project.projectId}>
                    <div className="card bg-secondary text-light">
                        <div className="card-body">
                        <h5 className="card-title"><b>ProjectID: {project.projectId}</b> | {project.projectTitle}</h5>
                        <Link to={`/projects/${project.projectId}`} className="btn btn-danger">View Project</Link>
                        {/* <a href={project.link} target="_blank" className="btn btn-primary">View Project</a> */}
                        </div>
                    </div>
                    <br></br>
                    </div>
                ))
            }
            </div>
        </div>
        </div>
    );
    }
    export default Home;
