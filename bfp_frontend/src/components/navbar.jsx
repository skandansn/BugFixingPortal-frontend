import { Link } from "react-router-dom";
import { useState } from 'react';
import { BsBugFill, BsTools, BsColumns, BsPersonFill } from "react-icons/bs";
import { DropdownButton, Dropdown } from "react-bootstrap";

const NavBar = () => {
    const [name, setName] = useState('Shakthi Saravanan');
    return (

            <nav className='sb-topnav navbar navbar-expand bg-warning'>
            <Link  to="/" className="navbar-brand ps-3 "><h1 className='text-dark'><b> <BsBugFill /><BsTools /> <BsColumns /> BFP </b></h1></Link>
            <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                <div className="input-group">
                    <input className="form-control" id="searchBar" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" onkeyup="searchFunction()" />
                    <button className="btn btn-danger" id="btnNavbarSearch" type="button">Search</button>
                </div>
            </form>
            <DropdownButton id="dropdown-basic-button" title={<BsPersonFill/>} className="mr-10" variant="danger">
                <Dropdown.Item href="#/action-1">{name}</Dropdown.Item>
                <hr />
                <Dropdown.Item href="#/action-2">Logout</Dropdown.Item>
            </DropdownButton>

        </nav>
    )
}
export default NavBar;