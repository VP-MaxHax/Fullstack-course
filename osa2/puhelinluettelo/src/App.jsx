import { useState, useEffect } from 'react'
import jsonHandler from '/src/components/jsonhandler.jsx';
import axios from 'axios'

const Filter = ({ nameFilter, handleFilterChange }) => {
  return (
    <div>
      filter shown with <input 
      value={nameFilter}
      onChange={handleFilterChange}
      />
    </div>
  )
}

const PersonForm = ({ addName, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addName}>
      <div>
        name: <input 
        value={newName}
        onChange={handleNameChange}
        />
      </div>
      <div>
        number: <input
        value={newNumber}
        onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const ErrorMsg = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const SuccessMsg = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='success'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [nameFilter, setFilter] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)

  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    jsonHandler
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const Persons = ({ persons, nameFilter }) => {
    return (
      <ul>
        {persons.filter(person => 
          person.name.toLowerCase()
          .includes(nameFilter.toLowerCase()))
          .map(person => 
            <li key={person.id}>{person.name} {person.number}
              <button onClick={() => {
                console.log(deletePerson(person.id, person.name))
                }
                }>Delete</button>
            </li>
          )}
      </ul>
    )
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
        axios
        .delete(`http://localhost:3001/persons/${id}`)
        .then(response => {
            console.log(response)
            setPersons(persons.filter(person => person.id !== id))
            setSuccessMessage(`Deleted ${name}`)
        })
        .catch(error => {
            console.log(error)
            setErrorMessage(`Information of ${name} has already been removed from server`)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(person => person.id !== id))
        })
    }
}

  const addName = (event) => {
    event.preventDefault()
    const nameExists = persons.some(person => person.name === newName);
    if (nameExists) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName);
        const changedPerson = { ...person, number: newNumber }
        jsonHandler
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            setSuccessMessage(`Changed ${newName} number`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
        .catch(error => {
          console.log(error)
          setErrorMessage(`Information of ${newName} has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      }
    } else {
      const nameObject = {
        name: newName,
        number: newNumber
      }
      jsonHandler
        .create(nameObject)
        .then(returnedName => {
          setPersons(persons.concat(returnedName))
          setNewName('')
          setNewNumber('')
        })
      setSuccessMessage(`Added ${newName}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>

      <ErrorMsg message={errorMessage} />

      <SuccessMsg message={successMessage} />
      
      <Filter nameFilter={nameFilter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>
      
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h3>Numbers</h3>
      
      <Persons persons={persons} nameFilter={nameFilter} />

    </div>
  )

}

export default App