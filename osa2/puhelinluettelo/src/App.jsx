import { useState, useEffect } from 'react'
import { getAll } from '/src/services/jsonhandler.jsx';
import { ErrorMsg, SuccessMsg } from '/src/components/notifications.jsx'
import { Filter } from '/src/components/filter.jsx'
import { PersonForm } from '/src/components/personForm.jsx'
import { Persons } from './components/persons.jsx';

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [nameFilter, setFilter] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)

  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
      getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

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
      
      <PersonForm 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange} 
        persons={persons}
        setPersons={setPersons}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        setSuccessMessage={setSuccessMessage}
        setErrorMessage={setErrorMessage}
      />

      <h3>Numbers</h3>
      
      <Persons 
        persons={persons} 
        nameFilter={nameFilter} 
        setPersons={setPersons} 
        setSuccessMessage={setSuccessMessage} 
        setErrorMessage={setErrorMessage} 
      />

    </div>
  )

}

export default App