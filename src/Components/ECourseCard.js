import {Link} from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { useState } from "react";
import { Rating} from '@mui/material';

export default function ECourseCard(props) {
    let path = `/courses/${props.obj.id}/lessons`;
    let rating = 0;
    if (props.type === "lesson") {
        path = `/lesson/${props.obj.id}`;
    }
    else {
        if (props.obj.average_rating)
            rating = props.obj.average_rating;
    }
    
    if (props.type === "course") {
        return (
            <div className="course-grid-items">
                    <Card style={{height: "100%"}}>
                        <Card.Img variant="top" src={props.obj.image} />
                        <Card.Body style={{height: "100%"}}>
                            <Card.Title>{props.obj.subject}</Card.Title>
                            <Card.Text>
                                Ngày tạo: {props.obj.created_date.substring(0, 10)}
                            </Card.Text>
                            <Link to={path}>
                                <Button variant="primary">Learn more</Button>
                            </Link>
                        </Card.Body>
                        <Card.Footer>
                            <Rating value={rating} readOnly />
                        </Card.Footer>
                    </Card>
            </div>
        )
    }
    else {
        return (
            <div className="course-grid-items">
                    <Card style={{height: "100%"}}>
                        <Card.Img variant="top" src={props.obj.image} />
                        <Card.Body style={{height: "100%"}}>
                            <Card.Title>{props.obj.subject}</Card.Title>
                            <Card.Text>
                                Ngày tạo: {props.obj.created_date}
                            </Card.Text>
                            <Link to={path}>
                                <Button variant="primary">Learn more</Button>
                            </Link>
                        </Card.Body>
                    </Card>
            </div>
        )
    }
}