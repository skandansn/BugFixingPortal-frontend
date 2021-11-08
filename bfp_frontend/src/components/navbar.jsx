import { Link } from "react-router-dom";
import { useState } from 'react';
import { BsBugFill, BsTools, BsColumns, BsPersonFill } from "react-icons/bs";
import { DropdownButton, Dropdown } from "react-bootstrap";

const NavBar = () => {
    const [name, setName] = useState('');
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
   
    return (

            <nav className='sb-topnav navbar navbar-expand bg-warning'>
            <Link  to="/home" className="navbar-brand ps-3 "><h1 className='text-dark'><b> <BsBugFill /><BsTools /> <BsColumns /> BFP </b></h1></Link>
            <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
            </form>
            <DropdownButton id="dropdown-basic-button" title={<BsPersonFill/>} className="mr-10" variant="danger">
            <Dropdown.Item as={Link} to="/aboutUser">{name}</Dropdown.Item>
                <hr />
                <Dropdown.Item onClick={logout} href="/login">Logout</Dropdown.Item>
            </DropdownButton>

        </nav>
    )
}
export default NavBar;