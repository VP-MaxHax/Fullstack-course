import {deletePerson} from '/src/services/jsonhandler.jsx';

const Persons = ({ persons, nameFilter, setPersons, setSuccessMessage, setErrorMessage }) => {
    const handleDeletePerson = (id, name) => {
      if (window.confirm(`Delete ${name}?`)) {
        deletePerson(id)
          .then(response => {
            setPersons(persons.filter(person => person.id !== id));
            setSuccessMessage(`Deleted ${name}`);
            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000);
          })
          .catch(error => {
            console.log(error);
            setErrorMessage(`Information of ${name} has already been removed from server`);
            setPersons(persons.filter(person => person.id !== id));
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
            // Optionally filter out the person here as well, depending on your app's needs
          });
      }
    };

    return (
      <ul>
        {persons.filter(person => 
          person.name.toLowerCase()
          .includes(nameFilter.toLowerCase()))
          .map(person => 
            <li key={person.id}>{person.name} {person.number}
              <button onClick={() => handleDeletePerson(person.id, person.name)}>Delete</button>
            </li>
          )}
      </ul>
    )
}

export { Persons }