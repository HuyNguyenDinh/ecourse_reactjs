import Header from "./Header"
import Footer from "./Footer"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "../pages/Home/Home"
import Lesson from "../pages/Lesson/Lesson"
import "./layoutStyle/Body.css"
import LessonDetail from "../pages/Lesson/LessonDetail"
import { createContext, useReducer } from "react";
import rootReducer from "../reducers/RootReducer";
import cookies from "react-cookies";
import Login from "../pages/Login"
import Register from "../pages/Register"

export const UserContext = createContext();

export default function Body() {
    const [user, dispatch] = useReducer(rootReducer, cookies.load("current_user"));
    
    return (
        <>
            <BrowserRouter>
                <UserContext.Provider value={[user, dispatch]}>
                    <Header />
                    <Routes>
                        <Route path="/" element={ <Home /> }/>
                        <Route path="/categories"/>
                        <Route path="/courses/:courseId/lessons" element={ <Lesson /> } />
                        <Route path="/lesson/:lessonId/" element={ <LessonDetail /> } />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={ <Register /> } />
                    </Routes>
                    <Footer />
                </UserContext.Provider>
            </BrowserRouter>
        </>
    )
}