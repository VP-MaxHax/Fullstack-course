import { addName } from "../services/jsonhandler"

const PersonForm = ({
    newName,
    handleNameChange,
    newNumber,
    handleNumberChange,
    persons,
    setPersons,
    setNewName,
    setNewNumber,
    setSuccessMessage,
    setErrorMessage
  }) => {
    const handleSubmit = (event) => {
      event.preventDefault();
      addName(newName, newNumber, persons)
        .then(returnedPerson => {
            const updatedPersons = persons.filter(person => person.id !== returnedPerson.id);
            persons = updatedPersons;
            setPersons(persons.concat(returnedPerson));
            setNewName('');
            setNewNumber('');
            setSuccessMessage(`Added/Updated ${newName}`);
            setTimeout(() => {
            setSuccessMessage(null);
            }, 5000);
        })
        .catch(error => {
            console.log(error);
            setErrorMessage(`An error occurred`);
            setTimeout(() => {
            setErrorMessage(null);
            }, 5000);
        });
    };
  return (
    <form onSubmit={handleSubmit}>
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

export { PersonForm }