import React from "react"
import { Route } from "react-router-dom"
import { GameProvider } from "./game/GameProvider.js"
import {GameList} from "./game/GameList.js"
import {GameForm} from "./game/GameForm.js"
import {EventProvider} from "./events/EventProvider.js"
import {EventList} from "./events/EventList.js"
import {EventForm} from "./events/EventForm.js"


export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            backgroundColor: "lightgoldenrodyellow"
        }}>
            <GameProvider>
                <Route exact path="/">
                    <GameList />
                </Route>

                <Route exact path="/games/new">
                    <GameForm />
                </Route>
            </GameProvider>

            <EventProvider>
            <GameProvider>
                <Route exact path="/events">
                    <EventList />
                </Route>

                <Route exact path="/events/new">
                    <EventForm/>
                </Route>
            </GameProvider> 
            </EventProvider>

        </main>
    </>
}
