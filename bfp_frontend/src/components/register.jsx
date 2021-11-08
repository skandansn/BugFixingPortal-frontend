import { Link,useHistory } from "react-router-dom";
import { BsTools, BsBugFill, BsColumns } from "react-icons/bs";
import axios from 'axios';
import { useState } from 'react';


const Register = () => {
    const history = useHistory();
    const API_BASE_URL="http://localhost:8080/";
    const [inputs, setInputs] = useState({});
    const [error, setError] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
        inputs["userRating"] = 0;
        inputs["userBugsReported"]=0;
        console.log(inputs);

        axios.post(API_BASE_URL+"auth/register",inputs)
        .then(res => {
            if(res.data === "User registered successfully"){
                history.push("/login");    
            }
            else{
                setError(res.data);
            }
        })
        .catch(err => {
            console.log(err);
            setError(err.response.data);
        });
    }




    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

 
  


    return (
        <div className="login-cot bg-danger" id="layoutAuthentication">

            <div id="layoutAuthentication_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-7">
                                <div className="card shadow-lg border-0 rounded-lg mt-5 bg-secondary">
                                    <center><h1 className="bg-warning" style={{ padding: "10px", }} ><b><BsBugFill /><BsTools /> <BsColumns />  BFP</b></h1></center>
                                    <div className="card-header"><h3 className="text-center font-weight-light my-1"><b>Create Account</b></h3></div>
                                    <div className="card-body">


                                        <form onSubmit={handleSubmit}>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <div className="form-floating mb-3 mb-md-0">
                                                        <input className="form-control" name="userEmail"  type="email"  value={inputs.userEmail || ""} onChange={handleChange}  />
                                                        <label>Email</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-floating">
                                                    <input className="form-control" name="userHandle"  type="text"  value={inputs.userHandle || ""} onChange={handleChange}  />
                                                        <label >Username</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-floating mb-3">
                                            <input className="form-control" name="userBio"  type="text" value={inputs.userBio || ""} onChange={handleChange}  />
                                                <label >Information about you</label>
                                            </div>
                                            <div className="col-md-6">
                                                    <div className="form-floating mb-3 mb-md-0">
                                                        <input className="form-control"   name="userPic"  type="text" value={inputs.userPic || ""} onChange={handleChange}  />
                                                        <label >User Picture </label>
                                                    </div>
                                                </div>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <div className="form-floating mb-3 mb-md-0">
                                                        <input className="form-control"  name="userPassword"   type="password"  value={inputs.userPassword || ""} onChange={handleChange} />
                                                        <label >Password</label>
                                                    </div>
                                                </div>
                                          
                                            </div>
                                            <div className="mt-4 mb-0">
                                            <input type="submit" />
                                                {/* <button className="btn btn-success" onClick={createAccount}>Save</button> */}

                                                {/* <div className="d-grid"><Link className="btn btn-success btn-block">Create Account</Link></div> */}
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-footer text-center py-3">
                                        <div className="small"><Link className="text-light" to="/login">Have an account? Go to login</Link></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Register;