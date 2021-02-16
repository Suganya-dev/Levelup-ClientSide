import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import {EventContext} from "./EventProvider.js"
import {GameContext} from "../game/GameProvider.js"


export const EventForm = () => {
    const history = useHistory()
    const{ createEvent } = useContext(EventContext)
    const{ games, getGames } = useContext(GameContext)

    const [currentEvent,setEvent] = useState({
        gameId: "0",
        description:"",
        date:"",
        time: ""
    })

    useEffect(() => {
        // Get all existing games from API
        getGames()
    }, [])

    const changeEventState = (domEvent) => {
        const newEventState = Object.assign({}, currentEvent)
        newEventState[domEvent.target.name] = domEvent.target.value
        setEvent(newEventState)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select name="gameId" className="form-control"
                        value={ currentEvent.gameId }
                        onChange={ changeEventState }>
                        <option value="0">Select a game...</option>
                        {
                            games.map(gT=> (
                                <option key={gT.id} value={gT.id}>
                                    {gT.title}
                                 </option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="description"> Description: </label>
                    <input type="text" name="description" 
                        value={currentEvent.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="date"> Date: </label>
                    <input type="date" name="date" 
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="time"> Time: </label>
                    <input type="time" name="time" 
                        value={currentEvent.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            {/* Create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    // Create the event
                    const event = {
                        gameId: +(currentEvent.gameId),
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time
                        }
                    // Once event is created, redirect user to event list

                    createEvent(event)
                    .then(() => history.push("/events"))
                }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}