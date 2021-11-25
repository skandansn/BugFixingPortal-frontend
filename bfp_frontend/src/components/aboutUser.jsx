import {useState,useEffect} from "react";
import axios from "axios";
import NavBar from "./navbar";
import { Link } from "react-router-dom";
import Loader from '../routes/Loader';

const AboutUser = (props) => {
    const userData=props.location.state.userData;
    console.log(userData);
  
    //display the user data with css card style
    return (
        <>
        <NavBar></NavBar>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">User Information</h5>
                            <p className="card-text">
                                <div className="row">
                                    
                                    <div className="col-md-6">
                                        <img src={userData.userPic} className="img-thumbnail" alt="User Image"/>
                                        <p>User Handle: {userData.userHandle}</p>
                                        <p>Email: {userData.userEmail}</p>
                                        <p>About: {userData.userBio}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <p>Bug count: {userData.userBugsReported}</p>
                                        <p>User rating: {userData.userRating}/5</p>
                                        <p>Projects added:</p>
                                       {/* card style to display each individual project */}
                                        {userData.projects.map(project => (
                                            <div className="card" key={project.projectId}>
                                                <div className="card-body">
                                                    <Link to={`/projects/${project.projectId}`}>{project.projectTitle}</Link>
                                                </div>
                                            </div>
                                        ))}
                                        <p>Issues added:</p>
                                         {/* card style unordered list to display the issues */}
                                        <ul>
                                            {userData.issues.map(issue => (
                                                <div className="card" key={issue.issueId}>
                                                <div className="card-body">
                                                <Link to={`/projects/${issue.project.projectId}/issues/${issue.issueId}/solutions`}>{issue.issueTitle}</Link>

                                                </div>
                                            </div>
                                            ))}
                                        </ul>

                                        
                                        <p>Solutions added:</p>
                                        <ul>
                                            {userData.solutions.map(solution => (
                                                <div className="card" key={solution.solutionId}>
                                                <div className="card-body">
                                                    <p>{solution.solutionTitle}</p>
                                                </div>
                                            </div>
                                            ))}
                                        </ul>

                                    </div>
                                </div>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div></>
    );
   


}
export default AboutUser;