import {Form, Button} from "react-bootstrap"
import { useState, useContext } from "react";
import Apis, { endpoints, authAxios } from "../configs/Apis";
import cookies from "react-cookies";
import { UserContext } from "../layouts/Body";
import {Navigate, useLocation} from "react-router-dom";

export default function Login() {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [user, dispatch] = useContext(UserContext);
    let location = useLocation();
    const login = async (event) => {
        event.preventDefault();
        try {
            let info = await Apis.get(endpoints['oauth2-info']);
            let res = await Apis.post(endpoints['login'], {
                grant_type: "password",
                client_id:info.data.client_id,
                client_secret:info.data.client_secret,
                username:username,
                password:password
            })
            if (res.status === 200) {
                cookies.save("token_type", res.data.token_type)
                cookies.save("access_token", res.data.access_token);
                cookies.save("refresh_token", res.data.refresh_token);
                const get_user = await authAxios().get(endpoints["current-user"]);
                cookies.save("current_user", get_user.data);
                dispatch({
                    type: "login",
                    payload: get_user.data,
                });
            }
        } catch(err) {
            console.error(err);
        }
    }
    if (user) {
        return <Navigate to="/" state={{from: location}} replace/>
    }
    else {
        return (
            <div className="body">
                <div style={{border: "1vw solid lightblue", borderRadius: "4vw", width: "30vw", padding: "4vw", color: "#0d6efd"}}>
                    <h1 style={{top: "0", textAlign: "center"}}>ĐĂNG NHẬP</h1>
                    <Form onSubmit={login}>
                        <Form.Group className="mb-3 lg-9" controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control required type="text" placeholder="Enter username" value={username} onChange={(event) => setUsername(event.target.value)} />
                        </Form.Group>
    
                        <Form.Group className="mb-3 lg-9" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
                        </Form.Group>
                        <div style={{textAlign: "center"}}>
                            <Button variant="primary" type="submit">
                                Đăng Nhập
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}