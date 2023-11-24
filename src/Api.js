import React, { Component } from 'react';

class App extends Component {
  state = {
    data: [],
    name: '',
  }

  componentDidMount() {
    const url = 'http://127.0.0.1:5000/tasks';

    fetch(url)
      .then((result) => result.json())
      .then((result) => {
        this.setState({
          data: result,
        });
      });
  }

  handlePatch = (entryId, doneValue) => {
    fetch(`http://127.0.0.1:5000/tasks/${entryId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        done: doneValue,
      }),
    })
      .then((result) => result.json())
      .then((updatedEntry) => {
        console.log('Tâche mise à jour :', updatedEntry);
      });
  };

  handleDelete = (entryId) => {
    fetch(`http://127.0.0.1:5000/tasks/${entryId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        console.log('Tâche supprimée avec succès');
      });
  };

  handleInputChange = (event) => {
    this.setState({ name: event.target.value });
  };

  render() {
    const { data, name } = this.state;

    const result = data.map((entry, index) => (
      <li key={index}>
        {entry.title} : {entry.done ? "Tâche faite" : "Tâche à faire"}
        <button onClick={() => this.handlePatch(entry.id, true)}>Marquer comme effectuée</button>
        <button onClick={() => this.handlePatch(entry.id, false)}>Marquer comme non effectuée</button>
        <button onClick={() => this.handleDelete(entry.id)}>Supprimer</button>
      </li>
    ));

    return (
      <div>
        <ul>{result}</ul>
        <label htmlFor="name">Tâche</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={this.handleInputChange} // Ajoutez la gestion de l'événement onChange
        />
        <button
          onClick={() =>
            fetch('http://127.0.0.1:5000/tasks/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ title: name }), // Utilisez directement le state name
            })
          }
        >
          Ajouter
        </button>
      </div>
    );
  }
}

export default App;