import React from 'react'

// Local imports
import PersonSidebarDisplay from './personSidebarDisplay';

const peopleBar = (props) => {
    // Generate the list of people
    let peopleList = props.people.map((person) => {
        return <PersonSidebarDisplay person={person}/>
    })

    return (
        <div>
            <h1>People</h1>
            {peopleList}
        </div>
    )
}

export default peopleBar;