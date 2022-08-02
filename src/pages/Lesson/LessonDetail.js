import { useEffect, useState } from "react";
import { Spinner, Row, Col, Image } from "react-bootstrap";
import Badge from 'react-bootstrap/Badge';
import { useParams } from "react-router-dom";
import Apis, { endpoints } from "../../configs/Apis";
// ES Modules
import parse from 'html-react-parser';

// CommonJS


export default function LessonDetail() {
    const [lesson, setLesson] = useState(null);
    const [comments, setComments] = useState([]);
    let {lessonId } = useParams();

    useEffect(() => {
        let loadLesson = async () => {
            try {
                let res = await Apis.get(endpoints["lesson-detail"](lessonId));
                setLesson(res.data);
            }
            catch (err) {
                console.error(err)
            }
        }

        let loadComments = async () => {
            try {
                let res = await Apis.get(endpoints["comments"](lessonId));
                setComments(res.data);
            }
            catch (err) {
                console.error(err);
            }
        }

        loadLesson();
        loadComments();
    }, [])
    if (lesson === null) {
        return (
            <div className="body">
                <Spinner animation="border" />
            </div>
            
        )
    }

    return (
        <div className="body">
            <h1>Chi tiet bai hoc</h1>
            <Row>
                <Col md={4} xs={12}>
                    <Image src={lesson.image} rounded fluid />
                </Col>
                <Col md={8} xs={12}>
                    <h2>{lesson.subject}</h2>
                    <p>Ngày tạo: {lesson.created_date}</p>
                    <p>Ngày cập nhật: {lesson.updated_date}</p>
                    <p>
                        Tag: {lesson.tags.map(t => <Badge bg="secondary">{t.name}</Badge>)}
                    </p>
                </Col>
            </Row>
            <hr />
            <div>
                {parse(lesson.content)}
            </div>
            <div className="comments">
                <h1>Comments</h1>
                {comments.map(c => 
                    <Row>
                    <Col md={1} xs={3}>
                        <Image src={c.creator.avatar} roundedCircle fluid />
                        <p>{c.creator.username}</p>
                    </Col>
                    <Col md={11} xs={9}>
                        <p>{c.content}</p>
                        <p>Thời gian: {c.created_date}</p>
                    </Col>
                </Row>
                )}
            </div>
        </div>
    )
}