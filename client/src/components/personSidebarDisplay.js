import React from 'react'

const personSidebarDisplay = (props) => {
    return (
        <li>
            {props.person.name}
        </li>
    )
}

export default personSidebarDisplay