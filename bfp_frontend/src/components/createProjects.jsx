import {useEffect, useState} from "react";
import {useHistory,useParams} from "react-router-dom";
import NavBar from "./navbar";
import axios from 'axios';

const CreateProject = () => {
    const [projectTitle, setTitle] = useState('');
    const [projectDesc, setDesc] = useState('');
    const [projectFiles, setFiles] = useState('');
    const projectDownloadNo = 0;
    const [userId, setUserId] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const history = useHistory();
    const id = useParams();
    const [createOrEdit, setCreateOrEdit] = useState('Create Project');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id.id!=="add" && id.id[id.id.length - 1]!=="i" && id.id[0]!=="s") {
            setLoading(true);
            axios.get(`http://localhost:8080/projects/${id.id}`,{ headers: { 'Accept': 'application/json','Authorization': 'Bearer ' + localStorage.getItem('token') }})
                .then(res => {
                    if (res.data!=="")
                    {
                        setCreateOrEdit("Edit Project");
                        setLoading(false);
                    }
                    else {
                        setLoading(false);
                        history.push('/home');
                    }

                    setTitle(res.data.projectTitle);
                    setDesc(res.data.projectDesc);
                    setFiles(res.data.projectFiles);
                    // setDownloadsCount(res.data.projectDownloadNo);
                })
                .catch(err => console.log(err));
        }
        else if(id.id[id.id.length - 1]   === 'i'){
            setCreateOrEdit("Add Issue for Project "+id.id.substring(0,id.id.length-1));
        }  
        else if (id.id[0]==='s'){
            setCreateOrEdit("Add Solution for Issue "+id.id[1]);
        }
        
    }, []);

    const handleSubmit = (e) => {
  
        e.preventDefault();
        const data = {
            projectTitle,
            projectDesc,
            projectFiles,
            projectDownloadNo
        };
        const token = localStorage.getItem('token');
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        const decodedToken = JSON.parse(window.atob(base64));
        data['userId'] = decodedToken.sub;
        if(id.id[id.id.length - 1]   === 'i') 
        {
            axios.post(`http://localhost:8080/projects/${id.id.substring(0,id.id.length-1)}/issues`, {issueTitle:projectTitle,issueDesc:projectDesc,issueFiles:projectFiles,userId:decodedToken.sub},{ headers: { 'Accept': 'application/json','Authorization': 'Bearer ' + localStorage.getItem('token') }})
                .then(res => {
                    setSuccess("Issue added successfully!");
                })
                .catch(err => {
                    setError('Something went wrong');
                });
        }
        else if (id.id[0]==='s')
        {
            axios.post(`http://localhost:8080/${id.id[3]}/issues/${id.id[1]}/solutions`, {solutionTitle:projectTitle,solutionDesc:projectDesc,solutionFiles:projectFiles,userId:decodedToken.sub},{ headers: { 'Accept': 'application/json','Authorization': 'Bearer ' + localStorage.getItem('token') }})
                .then(res => {
                    setSuccess("Solution added successfully!");
                })
                .catch(err => {
                    setError('Something went wrong');
                });
        }

        // else if (id.id[0]   === 's') 
        // {

        //     // axios.post(`http://localhost:8080/projects/${id.id.substring(0,id.id.length-1)}/issues/${id.id.substring(0,id.id.length-1)}/solutions`, {solutionTitle:projectTitle,solutionDesc:projectDesc,solutionFiles:projectFiles,userId:decodedToken.sub},{ headers: { 'Accept': 'application/json','Authorization': 'Bearer ' + localStorage.getItem('token') }})
        //     //     .then(res => {
        //     //         setSuccess("Solution added successfully!");
        //     //     })
        //     //     .catch(err => {
        //     //         setError('Something went wrong');
        //     //     });
        // }
        else if (id.id!=="add") {
            axios.patch(`http://localhost:8080/projects/${id.id}`, data,{ headers: { 'Accept': 'application/json','Authorization': 'Bearer ' + localStorage.getItem('token') }})
                .then(res => {
                    setSuccess("Project Details successfully updated!");
                })
                .catch(err => {console.log(err)
                    setError('Something went wrong');
                });
        } else {
        axios.post('http://localhost:8080/projects', data,{ headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')} })
            .then(res => {
                console.log(res);
                history.push('/home');
            })
            .catch(err => {
                console.log(err);
                setError('Something went wrong');
            });
    };
    }
    return (
        <div>
            <NavBar/>
            {
                loading?  <div className="col-md-12">
                    <h2>Loading...</h2>
                </div>
                :
            
            <div className="container">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <h1 className="text-center">{createOrEdit}</h1>
                        <hr></hr>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="projectTitle">Title</label>
                                <input type="text" className="form-control" id="projectTitle"
                                       value={projectTitle}
                                       onChange={(e) => setTitle(e.target.value)}
                                       placeholder="Enter Title"/>
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label htmlFor="projectDesc">Description</label>
                                <textarea className="form-control" id="projectDesc"
                                          value={projectDesc}
                                            onChange={(e) => setDesc(e.target.value)}
                                            placeholder="Enter description"/>
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label htmlFor="projectFiles">Files</label>
                                <input type="text" className="form-control" id="projectFiles"
                                        value={projectFiles}
                                        onChange={(e) => setFiles(e.target.value)}
                                        placeholder="Add Files"/>
                            </div>
                            <br></br>
                            {/* <div className="form-group">
                                <label htmlFor="projectDownloadNo">Downloads Count</label>
                                <input type="text" className="form-control" id="projectDownloadNo"
                                        value={projectDownloadNo}
                                        onChange={(e) => setDownloadsCount(e.target.value)}
                                        placeholder="Enter downloads count"/>
                            </div>
                            <br></br> */}
                            <button type="submit" className="btn btn-success">Submit</button>
                        </form>
                        {error && <div className="alert alert-danger">{error}</div>}
                        {success && <div className="alert alert-success">{success}</div>}

                    </div>
                </div>
            </div>
}
        </div>
    );
};

export default CreateProject;

