import { Link } from "react-router-dom";
import { BsTools, BsColumns, BsBugFill } from "react-icons/bs";

const ForgotPassword = () => {
   
    return ( 
        <div className="login-cot bg-danger" id="layoutAuthentication">
                    
            <div id="layoutAuthentication_content">
                <main>
                <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-5">
                                <div className="card shadow-lg border-0 rounded-lg mt-5 bg-secondary">
                                    <center><h1 className="bg-warning" style={{padding:"10px",}} ><b><BsBugFill /><BsTools /> <BsColumns />  BFP</b></h1></center>
                                    <div className="card-header"><h3 className="text-center font-weight-light my-1"><b>Password Recovery</b></h3></div>
                                    <div className="card-body">
                                        <div className="small mb-3 text-light">Enter your email address and we will send you Link link to reset your password.</div>
                                        <form>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" id="inputEmail" type="email" placeholder="name@example.com" />
                                                <label for="inputEmail">Email address</label>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                <Link className="small text-light" to="/">Return to login</Link>
                                                <Link className="btn btn-success" to="#">Reset Password</Link>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-footer text-center py-3">
                                        <div className="small"><Link className="text-light" to="/signUp">Need an account? Sign up!</Link></div>
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
 
export default ForgotPassword;