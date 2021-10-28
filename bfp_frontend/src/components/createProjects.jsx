import {useEffect, useState} from "react";
import {useHistory,useParams} from "react-router-dom";
import NavBar from "./navbar";
import axios from 'axios';



// create project which has a form to take 4 inputs
// 1. projectTitle
// 2. projectDesc
// 3. projectFiles
// 4. projectDownloadNo

const CreateProject = () => {
    const [projectTitle, setTitle] = useState('');
    const [projectDesc, setDesc] = useState('');
    const [projectFiles, setFiles] = useState('');
    const [projectDownloadNo, setDownloadsCount] = useState(0);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const history = useHistory();
    const id = useParams();
    const [createOrEdit, setCreateOrEdit] = useState('Create');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id.id!=="add") {
            setLoading(true);
            axios.get(`http://localhost:8080/projects/${id.id}`)
                .then(res => {
                    if (res.data!=="")
                    {
                        setCreateOrEdit("Edit");
                        setLoading(false);
                    }
                    else {
                        setLoading(false);
                        history.push('/');
                    }

                    setTitle(res.data.projectTitle);
                    setDesc(res.data.projectDesc);
                    setFiles(res.data.projectFiles);
                    setDownloadsCount(res.data.projectDownloadNo);
                })
                .catch(err => console.log(err));
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
        console.log(data);
        if (id.id!=="add") {
            axios.patch(`http://localhost:8080/projects/${id.id}`, data,{ headers: { 'Accept': 'application/json',}})
                .then(res => {
                    console.log(res);
                    setSuccess("Project Details successfully updated!");
                })
                .catch(err => {console.log(err)
                    setError('Something went wrong');
                });
        } else {
        axios.post('http://localhost:8080/projects', data,{ headers: { 'Accept': 'application/json',} })
            .then(res => {
                console.log(res);
                history.push('/');
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
                        <h1 className="text-center">{createOrEdit} Project</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="projectTitle">Title</label>
                                <input type="text" className="form-control" id="projectTitle"
                                       value={projectTitle}
                                       onChange={(e) => setTitle(e.target.value)}
                                       placeholder="Enter projectTitle"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="projectDesc">Description</label>
                                <textarea className="form-control" id="projectDesc"
                                          value={projectDesc}
                                            onChange={(e) => setDesc(e.target.value)}
                                            placeholder="Enter description"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="projectFiles">Files</label>
                                <input type="text" className="form-control" id="projectFiles"
                                        value={projectFiles}
                                        onChange={(e) => setFiles(e.target.value)}
                                        placeholder="Enter projectFiles"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="projectDownloadNo">Downloads Count</label>
                                <input type="text" className="form-control" id="projectDownloadNo"
                                        value={projectDownloadNo}
                                        onChange={(e) => setDownloadsCount(e.target.value)}
                                        placeholder="Enter downloads count"/>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
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

