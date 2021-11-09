import {useState,useEffect} from "react";
import {useHistory, useParams,Link} from "react-router-dom";
import NavBar from "./navbar";
import axios from 'axios';
import Loader from "../routes/Loader";



//card component to get solutions from api and display them

const ViewSolutions = () => {
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const id = useParams()

//   useEffect(() => {
//     axios.get(`http://localhost:8080/projects/${id.id}/issues/solutions`,{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
//     .then(res => {
//         setSolutions(res.data);
//         setLoading(false);
//     })
//     .catch(err => {
//         console.log(err);
//     });
//   }, []);

  return (
      //display solutions
        <div>
            <NavBar/>
            <div className="container">
            <div className="row">
                <div className="col-md-12">
                <div className="card">
                    <div className="card-header">
                    <h4>Solutions</h4>
                    </div>
                    <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                        <div className="table-responsive">
                            <table className="table table-striped">
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>Solution</th>
                                <th>Date</th>
                                <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? <Loader/> : solutions.map((solution, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{solution.solution}</td>
                                    <td>{solution.date}</td>
                                    <td>{solution.status}</td>
                                </tr>
                                ))}
                            </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>


   
  );
};
export default ViewSolutions;