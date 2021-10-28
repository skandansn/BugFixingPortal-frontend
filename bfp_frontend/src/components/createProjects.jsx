import {useState} from "react";
import {useHistory} from "react-router-dom";
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
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            projectTitle,
            projectDesc,
            projectFiles,
            projectDownloadNo
        };
        console.log(data);
        axios.post('http://localhost:8080/projects', JSON.stringify(data))
            .then(res => {
                console.log(res);
                history.push('/');
            })
            .catch(err => {
                console.log(err);
                setError('Something went wrong');
            });
    };

    return (
        <div>
            <NavBar/>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <h1 className="text-center">Create Project</h1>
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateProject;

