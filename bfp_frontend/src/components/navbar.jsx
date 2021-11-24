import { Link } from "react-router-dom";
import { useState,useEffect } from 'react';
import { BsBugFill, BsTools, BsColumns, BsPersonFill } from "react-icons/bs";
import { DropdownButton, Dropdown } from "react-bootstrap";
import axios from "axios";

const NavBar = () => {
    const [name, setName] = useState('');
    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    function logout() {
        console.log('logout');
        localStorage.removeItem('token');
    }
    if (name=="") {
        const token = localStorage.getItem('token');
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        const decodedToken = JSON.parse(window.atob(base64));
        setName(decodedToken.sub);
    }
    useEffect(() => {
        axios.get('http://localhost:8080/auth/userInfo',{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}}).then(res => {
            setUserData(res.data);
            // console.log(res.data);
            setIsLoading(false);
        }).catch(err => {
            setError(err);
            setIsLoading(false);
        });
     
    }, []);
    return (

            <nav className='sb-topnav navbar navbar-expand bg-warning'>
            <Link  to="/home" className="navbar-brand ps-3 "><h1 className='text-dark'><b> <BsBugFill /><BsTools /> <BsColumns /> BFP </b></h1></Link>
            <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
            </form>
            <DropdownButton id="dropdown-basic-button" title={<BsPersonFill/>} size="lg" className="mr-10"  variant="danger">
            <Dropdown.Item as={Link} to={{pathname:"/aboutUser",state:{userData} }}>{name}</Dropdown.Item>
                <hr />
                <Dropdown.Item onClick={logout} href="/login">Logout</Dropdown.Item>
            </DropdownButton>

        </nav>
    )
}
export default NavBar;