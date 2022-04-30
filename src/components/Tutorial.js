import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TutorialDataService from "../services/TutorialService"

const Tutorial = props => {

    const { id } = useParams();
    let navigate = useNavigate();

    const initialTutorialState = {
        id: null,
        title: "",
        description: "",
        published: false
    }

const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
const [message, setMessage] = useState("");

const getTutorial = id => {
    TutorialDataService.get(id)
        .then(response => {
            setCurrentTutorial(response.data);
            console.log(response.data)
        })
        .catch((e) => {
            console.log(e)
        });
};
    useEffect(() => {
        if (id) {
            getTutorial(id);
        }
    }, [id]);

    const handledInputChange = event => {
        const { name, value } = event.target
        setCurrentTutorial({...currentTutorial, [name]: value})
    }

const updatePublished = status => {
    var data = {
        id: currentTutorial.id,
        title: currentTutorial.title,
        description: currentTutorial.description,
        published: status
    };
    TutorialDataService.update(currentTutorial.id, data)
        .then(response => {
            setCurrentTutorial({...currentTutorial, published:status})
        })
        .catch(e => {
            console.log(e)
        })
}





};

export default Tutorial;