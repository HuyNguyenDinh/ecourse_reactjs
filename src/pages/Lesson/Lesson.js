import { useState, useEffect } from "react";
import API, {endpoints} from "../../configs/Apis";
import {useParams} from "react-router-dom";
import ECourseCard from "../../Components/ECourseCard"
import {Spinner} from "react-bootstrap"

export default function Lesson() {

    const [lessons, setLessons] = useState([]);
    const {courseId} = useParams();

    useEffect(() => {
        const loadLessons = async() => {
            try {
                const res = await API.get(endpoints["lessons"](courseId));
                setLessons(res.data);

            } catch (err) {
                console.error(err);
            }
        };

        loadLessons();
    }, []);

    if (lessons.length < 1) {
        return (
            <div className="body">
                <Spinner animation="border" />
            </div>
            
        )
    }

    return (
        <div className="body">
            <h1>DANH MUC CAC BAI HOC CUA KHOA HOC</h1>
            <div className="change-page-buttons">
            </div>
            <div className="course-grid-container">
                {lessons.map(l => <ECourseCard obj={l} type="lesson"/>)}
            </div>
        </div>
    )
}