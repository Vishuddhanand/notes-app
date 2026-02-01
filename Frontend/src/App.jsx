import React, { useState } from 'react'
import axios from 'axios'

const App = () => {
  const [notes, setNotes] = useState([
    {
      title: "test title 1",
      description: "test description 1"
    },
    {
      title: "test title 1",
      description: "test description 1"
    },
    {
      title: "test title 1",
      description: "test description 1"
    },
    {
      title: "test title 1",
      description: "test description 1"
    },
  ])

  axios.get('http://localhost:3000/api/notes')
    .then((res) => {
      setNotes(res.data.notes)
    })
  return (
    <>
      <div className="notes">
        {
          notes.map((note) => {
            return <div className="note">

              <h2>{note.title}</h2>
              <p>{note.description}</p>

            </div>

          })
        }

      </div>
    </>
  )
}

export default App
