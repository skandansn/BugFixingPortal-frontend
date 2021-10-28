import { Link } from "react-router-dom";
import { BsTools, BsColumns, BsBugFill } from "react-icons/bs";
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const API_BASE_URL="http://localhost:8080/";
    const [inputs, setInputs] = useState({});
    // const history = useHistory();



    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // axios.post(API_BASE_URL + "login", inputs, { headers: { "Content-Type": "application/json" } }).then(function (res) {
        //     console.log(res)
        //     if (res.data == "success") {
        //         console.log(res);

        //         history.push("/login");

        //     }
        // })
        axios.post(API_BASE_URL+"login",{username:"godskandan@gmail.com",password:"skandan12"},{ headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
        ).then(function (res) {
            console.log(inputs)
            console.log(res)
        })

    }

    return (
        <div className="login-cot bg-danger" id="layoutAuthentication">

            <div id="layoutAuthentication_content">
                <main>
                    <div className="container ">

                        <div className="row justify-content-center ">

                            <div className="col-lg-5 ">

                                <div className="card shadow-lg border-0 rounded-lg mt-5 bg-secondary">
                                    <center><h1 className="bg-warning" style={{ padding: "10px", }}><b><BsBugFill /><BsTools /> <BsColumns />  BFP</b></h1></center>
                                    <div className="card-header"><h3 className="text-center my-1"><b>Login</b></h3></div>
                                    <div className="card-body">
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" name="email" type="email" placeholder="name@example.com" value={inputs.email || ""} onChange={handleChange} />
                                                <label for="inputEmail">Email address</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" name="password" type="password" placeholder="Password"  value={inputs.password || ""} onChange={handleChange}/>
                                                <label for="inputPassword">Password</label>
                                            </div>
                                            <div className="form-check mb-3">
                                                <input className="form-check-input" id="inputRememberPassword" type="checkbox" value="" />
                                                <label className="form-check-label" for="inputRememberPassword">Remember Password</label>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                <Link className="small text-light" to="/forgotPassword">Forgot Password?</Link>
                                            <input type="submit" />

                                                {/* <Link className="btn btn-success" >Login</Link> */}
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-footer text-center py-3">
                                        <div className="small"><Link className="text-light" to="/registration">Need an account? Sign up!</Link></div>
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

export default Login;