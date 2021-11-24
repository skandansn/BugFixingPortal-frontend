import NavBar from "./navbar";
import axios from 'axios';
import {useState,useEffect} from "react";
import { Link } from "react-router-dom";
import * as React from 'react';
// import OpenIconSpeedDial from "./floatingbutton";


// Home component to get list of all the projects and display them
const Home = () => {
    
    const [projects, setProjects] = useState([]);
    const [Searchprojects, setSearchProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [userProjects, setUserProjects] = useState([]);

    const handleSearch = (e) => {
        let value=e.target.value.toLowerCase();
        let result=[];
        result=Searchprojects.filter(project=>{
            return project.projectTitle.toLowerCase().search(value)!=-1;
        });
        setProjects(result);
    }

   

    
    useEffect(() => {
        const token = localStorage.getItem('token');
        // const base64Url = token.split('.')[1];
        // const base64 = base64Url.replace('-', '+').replace('_', '/');
        // const decodedToken = JSON.parse(window.atob(base64));
        // console.log();
        axios.all([
            axios.get('http://localhost:8080/projects', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
            // axios.get(`http://localhost:8080/projects/user/${decodedToken.sub}`, {
            //     headers: {
            //         Authorization: `Bearer ${token}`
            //     }
            // })
        

        ])
        .then(axios.spread((allProjects,userProjectsRes)=>{
            setProjects(allProjects.data);
            setSearchProjects(allProjects.data);
            // setUserProjects(userProjectsRes.data);
            setLoading(false);
        }))
        .catch(err=>{
            console.log(err);
        })
    }, []);

    //     // Get all the projects from the database
    //     axios.get('http://localhost:8080/projects',{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
    //     .then(res => {
    //         setProjects(res.data);
    //         setSearchProjects(res.data);
    //         setLoading(false);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
    // }, []);
    
    return (
        <div className="bg">
        <NavBar />
        {/* <OpenIconSpeedDial></OpenIconSpeedDial> */}
        <div className="container">
            <div className="row">
            <div className="col-md-12">
                <h1 className="mar-top">Project Dashboard</h1>
                {/* search bar to filter the projects  */}
                <input type="text" className="form-control mar-top" style={{width:'30%'}} placeholder="Search Projects" onChange={(e) => handleSearch(e)} />
                <Link to="/createProject/add" className="btn btn-lg btn-success mar-top" >Create New Project</Link>
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
                        <Link to={{pathname:`/projects/${project.projectId}`}} className="btn btn-danger mar-top">View Project</Link>
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
