import { UserContext } from "../layouts/Body";
import {Form, Button} from "react-bootstrap"
import { useState, useContext, useRef } from "react";
import Apis, { endpoints} from "../configs/Apis";
import {Navigate, useLocation, useNavigate} from "react-router-dom";

export default function Register() {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const avatar = useRef();
    let navigate = useNavigate();

    const [user, dispatch] = useContext(UserContext);
    let location = useLocation();

    const register = (event) => {
        event.preventDefault();
        let registerUser = async () => {
            const formData = new FormData();
            formData.append("first_name", firstName);
            formData.append("last_name", lastName);
            formData.append("email", email);
            formData.append("username", username);
            formData.append("password", password);
            formData.append("avatar", avatar.current.files[0]);

            try {
                let res = await Apis.post(endpoints['register'], formData, {
                    headers: {
                        "Content-Type":"multipart/form-data"
                    }
                })
                navigate("/login");
            }
            catch (err) {
                console.log(err);
            }
            
        }

        if (password !== null && password === confirmPassword) {
            registerUser();
        }
    }

    if (user) {
        return <Navigate to="/" state={{from: location}} replace/>
    }
    else {
        return (
            <div className="body">
                <div style={{border: "1vw solid lightblue", borderRadius: "4vw", width: "30vw", padding: "4vw", color: "#0d6efd"}}>
                    <h1 style={{top: "0", textAlign: "center"}}>ĐĂNG KÝ</h1>
                    <Form onSubmit={register}>
                        <RegisterForm id="firstname" 
                                    label="First Name" 
                                    type="text" 
                                    placeholder="Enter your first name"
                                    value={firstName}
                                    change={(event) => setFirstName(event.target.value)} />
                        <RegisterForm id="lastname" 
                                    label="Last Name" 
                                    type="text" 
                                    placeholder="Enter your last name"
                                    value={lastName}
                                    change={(event) => setLastName(event.target.value)} />
                        <RegisterForm id="email" 
                                    label="Email" 
                                    type="email" 
                                    placeholder="Enter your email"
                                    value={email}
                                    change={(event) => setEmail(event.target.value)} />
                        <RegisterForm id="username" 
                                    label="Username" 
                                    type="text" 
                                    placeholder="Enter your username"
                                    value={username}
                                    change={(event) => setUsername(event.target.value)} />
                        <RegisterForm id="password" 
                                    label="Password" 
                                    type="password" 
                                    placeholder="Enter your password"
                                    value={password}
                                    change={(event) => setPassword(event.target.value)} />
                        <RegisterForm id="confirmPassword" 
                                    label="Confirm password" 
                                    type="password" 
                                    placeholder="Enter your password again"
                                    value={confirmPassword}
                                    change={(event) => setConfirmPassword(event.target.value)} />
                        <Form.Group className="mb-3 lg-9" controlId="avatar">
                            <Form.Label>Avatar</Form.Label>
                            <Form.Control required type="file" ref={avatar} />
                        </Form.Group>
                        <div style={{textAlign: "center"}}>
                            <Button variant="primary" type="submit">
                                Đăng ký
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
    
}

export function RegisterForm(props) {
    return (
        <Form.Group className="mb-3 lg-9" controlId={props.id}>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control required type={props.type} 
            placeholder={props.placeholder} 
            value={props.value} 
            onChange={props.change} />
        </Form.Group>
    )
}