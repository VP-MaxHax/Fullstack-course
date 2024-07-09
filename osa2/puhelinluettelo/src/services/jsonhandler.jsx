import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const addName = (newName, newNumber, persons) => {
  const nameExists = persons.some(person => person.name === newName);
  if (nameExists) {
    if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      const person = persons.find(person => person.name === newName);
      const changedPerson = { ...person, number: newNumber };
      return update(person.id, changedPerson);
    }
  } else {
    const nameObject = { name: newName, number: newNumber };
    return create(nameObject);
  }
};

export { getAll, create, update, deletePerson, addName}