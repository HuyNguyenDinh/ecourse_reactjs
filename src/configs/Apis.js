import axios from "axios";
import cookies from "react-cookies";

export let endpoints = {
    "categories": "/course/category/",
    "courses": "/course/course/",
    "lessons": (courseId) =>  `/course/course/${courseId}/lessons/`,
    "users": "/course/users",
    "lesson-detail" : (lessonId) => `/course/lesson/${lessonId}/`,
    "oauth2-info": "/course/oauth2-info/",
    "login": "/o/token/",
    "current-user": "/course/users/current-user/",
    "register": "/course/users/",
    "comments": (courseId) => `/course/lesson/${courseId}/get-comments/`,
};

export const authAxios = () =>
   axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        Authorization: `${cookies.load("token_type")} ${cookies.load("access_token")}`,
    },
});

export default axios.create({
    baseURL: "http://localhost:8000",
});