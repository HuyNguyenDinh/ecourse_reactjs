import React, {useState, useEffect} from "react"
import ECourseCard from "../../Components/ECourseCard";
import API, { endpoints, authAxios } from "../../configs/Apis";
import "./Home.css"
import { useLocation } from "react-router-dom";
import {Spinner} from "react-bootstrap"

export default function Home() {

    const [courses, setCourses] = useState([])
    const [prev, setPrev] = useState(false);
    const [next, setNext] = useState(false);
    const [page, setPage] = useState(1);
    const location = useLocation();

    useEffect(() => {
        let loadCourses = async() => {
            let s = location.search;
            if (s === "")
                s = `?page=${page}`;
            else
                s += `&page=${page}`;
            try {
                let res = await API.get(`${endpoints["courses"]}${location.search}`);
                setCourses(res.data.results)

                setNext(res.data.next !== null);
                setPrev(res.data.previous !== null)
            } catch (err) {
                console.error(err);
            }
        }
        loadCourses();
    }, [location.search, page])

    if (courses.length < 1) {
        return (
            <div className="body">
                <Spinner animation="border" />
            </div>
            
        )
    }

    const paging = (inc) => {
        setPage(page + inc)
    }

    return (
        <div className="body">
            <h3>Homepage</h3>
            <div className="course-grid-container">
                {courses.map(c => <ECourseCard obj={c} type="course"/>)}
            </div>
            <div className="change-page-buttons">
                <button onClick={() => paging(-1)} disabled={!prev}>&lt;&lt;</button>
                <button onClick={() => paging(1)} disabled={!next}>&gt;&gt;</button>
            </div>
        </div>
        
    )
};