import { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {
  const [autors, setAutors] = useState([])
  const [newAuthor, setNewAuthor] = useState("")

  const fetchAllAutors = () => {
    axios.get('http://localhost:3004/autors').then((response) => {

      setAutors(response.data)
    });
  }

  // izskauksies vienu reizi uz komponenta ielādi
  useEffect(() => {
    fetchAllAutors()
  }, [])


  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={(e) => {
          e.preventDefault()

          axios.post('http://localhost:3004/autors', {name: newAuthor}).then(() => {
            fetchAllAutors()

            setNewAuthor('')
          });

        }}>
          <input 
            required
            placeholder='Author name...'
            type="text"
            value={newAuthor}
            onChange={(e) => {
              setNewAuthor(e.target.value)
            }}
          /> 
          <br />
          <button>
            Add new author
          </button>
        </form>

        <div>
          {autors.map((autors) => (
            <h2 key={autors.id}>{autors.name}</h2>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
