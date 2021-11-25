// import { Link } from "react-router-dom";
import { BsJournalText } from "react-icons/bs";
import { BsFileCode } from "react-icons/bs";
import { BsFileEarmarkSpreadsheet } from "react-icons/bs";
import { BsFlag } from "react-icons/bs";
import {useState,useEffect} from "react";
import {useHistory, useParams,Link} from "react-router-dom";
import axios from 'axios';
// import { useState } from 'react';
const SideNavbar = () => {
  // const [proj,setProj] = useState('Project 1');
  const [project, setProject] = useState({});
    const [isLoading, setLoading] = useState(true);
    const history = useHistory();
    const id = useParams()
    useEffect(() => {
        axios.get(`http://localhost:8080/projects/${id.id}`,{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
        .then(res => {
            setProject(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

      return (  
        <div className="grid-chid-a">
                        {/* <h2>
                    <b>{proj}</b> 
                </h2> */}
        <ul className="navi1 bg-warning" id="sm-sd-nav"> 
              <li><Link className="navilist text-dark" to={{pathname:`/projects/${project.projectId}`}}>{<BsJournalText/>}  Description</Link></li>
              <li><Link className="navilist text-dark" to={`/projects/${project.projectId}/code`}>{<BsFileCode/>}  Code</Link></li>
              {/* <Link to={`/projects/${project.projectId}/issues`} className="btn btn-secondary">View Issues</Link> */}
              <li><Link className="navilist text-dark" to={`/projects/${project.projectId}/issues`}>{<BsFlag/>}  Issues</Link></li>
              <li><Link className="navilist text-dark" to='/description'>{<BsFileEarmarkSpreadsheet/>}  Tester Log</Link></li>
            </ul>
        </div>
      );
  }
   
  export default SideNavbar;