import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [notes, setNotes] = useState([])

  function fetchNotes() {
    axios.get('http://localhost:3000/api/notes')
      .then((res) => {
        setNotes(res.data.notes)
      })
  }

  useEffect(() => {
    fetchNotes()
  }, [])


  function handleSubmit(e) {
    e.preventDefault()
    const { title, description } = e.target.elements

    axios.post("http://localhost:3000/api/notes", {
      title: title.value,
      description: description.value

    })
      .then((res) => {
        console.log(res.data)

        fetchNotes()
      })
  }

  function handleDeleteNote(noteId) {
    axios.delete("http://localhost:3000/api/notes/" + noteId)
      .then(res => {
        console.log(res.data)
        fetchNotes()
      })
  }

  const [editId, setEditId] = useState(null)
  const [editDescription, setEditDescription] = useState("")

  function handleUpdateNote(noteId) {
    axios.patch("http://localhost:3000/api/notes/" + noteId, {
      description: editDescription
    })
      .then(() => {
        fetchNotes()
        setEditId(null)
        setEditDescription("")
      })
  }



  return (
    <>
      <form className='note-create-form' onSubmit={handleSubmit}>
        <input name='title' type="text" placeholder=' Enter title' />
        <input name='description' type="text" placeholder='Enter desription' />
        <button>Create note</button>
      </form>
      <div className="notes">
        {
          notes.map((note) => {
            return (
              <div className="note" key={note._id}>
                <h2>{note.title}</h2>

                {editId === note._id ? (
                  <input
                    type="text"
                    placeholder="Enter new description"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />
                ) : (
                  <p>{note.description}</p>
                )}

                <button className='red' onClick={() => handleDeleteNote(note._id)}>
                  Delete
                </button>

                {editId === note._id ? (
                  <button className='green' onClick={() => handleUpdateNote(note._id)}>
                    Save
                  </button>
                ) : (
                  <button
                    className='green'
                    onClick={() => {
                      setEditId(note._id)
                      setEditDescription("")
                    }}
                  >
                    Update description
                  </button>
                )}
              </div>
            )
          })

        }

      </div>
    </>
  )
}

export default App
