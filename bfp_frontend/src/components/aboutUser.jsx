import {useState,useEffect} from "react";
import axios from "axios";
import NavBar from "./navbar";
import { Link } from "react-router-dom";
import Loader from '../routes/Loader';

const AboutUser = (props) => {
    const userData=props.location.state.userData;
  
    //display the user data with css card style
    return (
        <>
        <NavBar></NavBar>
        <div className="container">
        <div className="desc-page container-fluid px-4 mar-top">
                            <h5 className="card-title">User Information</h5>
                            <p className="card-text">
                            <div className="bg-danger user-div">
                                         <img src={userData.userPic} className="img-thumbnail" alt="User Image"/>
                                        <p><b>User Handle: {userData.userHandle}</b> </p>
                                        <p><b>Email: {userData.userEmail}</b> </p>
                                        <p><b>About: {userData.userBio}</b> </p>
                                        <p><b>Bug count: {userData.userBugsReported}</b> </p>
                                        <hr />
                                        <p><b>Projects added:</b> </p>
                                       {/* card style to display each individual project */}
                                       
                                       <ul>
                                        {userData.projects.map(project => (
                                            <div className="card bg-warning mar-top " key={project.projectId}>
                                                <div className="card-body">
                                                    <Link  className="link-dec text-dark" to={`/projects/${project.projectId}`}>{project.projectTitle}</Link>
                                                </div>
                                            </div>
                                        ))}
                                        </ul>
                                        <hr />
                                        <p><b>Issues added:</b></p>
                                         {/* card style unordered list to display the issues */}
                                        <ul>
                                            {userData.issues.map(issue => (
                                                <div className="card  bg-warning mar-top " style={{"width":"50%"}} key={issue.issueId}>
                                                <div className="card-body">
                                                <Link className="link-dec text-dark" to={`/projects/${issue.project.projectId}/issues/${issue.issueId}/solutions`}>{issue.issueTitle}</Link>
                                                </div>
                                            </div>
                                            ))}
                                        </ul>
                                        <hr />
                                    </div>
                            </p>
                        </div>
        </div></>
    );
   


}
export default AboutUser;