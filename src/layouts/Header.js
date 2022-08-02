import "./layoutStyle/Header.css";
import logoSVG from "../static/logo_brand.svg";
import React, {useState, useEffect, useContext} from "react";
import API, { endpoints, authAxios } from "../configs/Apis";
import {useNavigate, Link} from "react-router-dom";
import {Button, Form, Image} from 'react-bootstrap';
import { UserContext } from "./Body";
import cookies from "react-cookies";


export default function Header() {
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const [next, setNext] = useState(null);
    const [user, dispatch] = useContext(UserContext);

    let login_path = <Link to="/login"><Button>Login</Button></Link>
    let signup = <Link to="/register"><Button>Signup</Button></Link>
    let path_category = null;
    
    useEffect(() => {
        const loadCategories = async() => {
            const res = await API.get(endpoints["categories"]);
            setCategories(res.data.results);
            setNext(res.data.next);
        };

        loadCategories();
    }, []);

    const Logout = (event) => {
        dispatch({
            type: "logout"
        });
        cookies.remove("access_token");
        cookies.remove("current_user");
        cookies.remove("refresh_token");
        cookies.remove("token_type");
    }

    if (user) {
        login_path = <Link to="/"><Image src={user.avatar} roundedCircle={true} style={{height: "5vh"}}/></Link>
        signup = <Button onClick={Logout}>Logout</Button>
    }

    if (next) {
        path_category = <Link to={"/categories"}>Xem them</Link>
    }

    const searching = (event) => {
        event.preventDefault();
        navigate(`/?search=${search}`, {replace: true})
    }
    return (
        <div className="nav-bar">
            <div className="nav-bar-item" id="logo">
                <Link className="navbar-brand" to="/">
                    <Image style={{height: "8vh", marginTop: "auto"}} src={logoSVG} alt="logo"/>
                </Link>
            </div>
            <div className="nav-bar-item item-center">
                <div className="nav-bar-child-item">
                    <Link to="/">Home</Link>
                </div>
                <div className="nav-bar-child-item dropdown">
                    <button className="dropbtn">Category</button>
                    <div className="dropdown-content categories">
                    {categories.map(c => {
                        let path = `/?category_id=${c.id}`
                        return <Link to={path}>{c.name}</Link>
                    })}
                    {path_category}
                    </div>
                </div>
                <div className="nav-bar-child-item">About Us</div>
            </div>
            <div className="nav-bar-item">
                <div className="nav-bar-child-item">
                    <Form className="d-flex" onSubmit={searching} style={{height: "8vh", padding: "1vh"}}>
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            onChange={(event) => setSearch(event.target.value)}
                        />
                        <Button variant="outline-success" onClick={searching}>Search</Button>
                    </Form>
                </div>
                <div className="nav-bar-child-item" style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
                    <div style={{marginRight: "0.5vw", height: "100%"}}>
                        {login_path}
                    </div>
                    <div style={{height: "100%"}}>
                        {signup}
                    </div>
                </div>
                
            </div>
        </div>
    )
}