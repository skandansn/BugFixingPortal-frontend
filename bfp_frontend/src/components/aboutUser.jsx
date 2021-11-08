import {useState,useEffect} from "react";
import axios from "axios";
import NavBar from "./navbar";

const AboutUser = () => {
    //get the user data from api
    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/auth/userInfo',{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}}).then(res => {
            setUserData(res.data);
            setIsLoading(false);
        }).catch(err => {
            setError(err);
            setIsLoading(false);
        });
     
    }, []);

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
                                        <p>Projects added: {userData.projects}</p>
                                        <p>Issues added: {userData.issues}</p>
                                        <p>Solutions added: {userData.solutions}</p>

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