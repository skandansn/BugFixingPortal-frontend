import { Link,useHistory } from "react-router-dom";
import { BsTools, BsBugFill, BsColumns } from "react-icons/bs";
import axios from 'axios';
import { useState } from 'react';


const Register = () => {
    const API_BASE_URL="http://localhost:8080/";
    const [inputs, setInputs] = useState({});
    const history = useHistory();


  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(API_BASE_URL+"registration",inputs,{headers:{"Content-Type" : "application/json"}}).then(function (res) {
        console.log(res)
        if (res.data=="success")
        {
            console.log(res);

            history.push("/login");

        }
            })

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
                                                        <input className="form-control" name="firstName"  id="firstName" type="text" placeholder="Enter your first name" value={inputs.firstName || ""} onChange={handleChange}  />
                                                        <label for="inputfirstName">First name</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-floating">
                                                        <input className="form-control" name="lastName"  id="lastName" type="text" placeholder="Enter your last name" value={inputs.lastName || ""} onChange={handleChange} />
                                                        <label for="inputLastName">Last name</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input className="form-control"  name="email"  id="email" type="email" placeholder="name@example.com" value={inputs.email || ""} onChange={handleChange}/>
                                                <label for="inputEmail">Email address</label>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <div className="form-floating mb-3 mb-md-0">
                                                        <input className="form-control"  name="password"  id="password" type="password" placeholder="Create Link password" value={inputs.password || ""} onChange={handleChange} />
                                                        <label for="inputPassword">Password</label>
                                                    </div>
                                                </div>
                                                {/* <div className="col-md-6">
                                                    <div className="form-floating mb-3 mb-md-0">
                                                        <input className="form-control" id="inputPasswordConfirm" type="password" placeholder="Confirm password" />
                                                        <label for="inputPasswordConfirm">Confirm Password</label>
                                                    </div>
                                                </div> */}
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