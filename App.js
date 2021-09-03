import "./App.css";
import React from "react";

class FilmItemRow extends React.Component{
  render(){
    return (
      <li>
        <a target='_blank' rel="noreferrer" href={this.props.url}>{this.props.url}</a>
      </li>
    )
  }
}

class StarWars extends React.Component {
  constructor() {
    super();
    this.state = {
      loadedCharacter: false,
      name: null,
      height: null,
      homeworld: null,
      films: [],
    };
  }

  GetNewCharacter() {
    const randomNumber = Math.round(Math.random()*82)
    const url = `https://github.com/akabab/starwars-api/blob/master/api/id/${randomNumber}.json`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          name: data.name,
          height: data.height,
          homeworld: data.homeworld,
          films: data.films,
          loadedCharacter: true,
      
      })
    })
  }

  render() {

    const movies = this.state.films.map((url,i) =>{
      return <FilmItemRow key={i} url={url}/>
    })
    
    return (
      <div>
        {this.state.loadedCharacter && (
          <div>
            <h1>{this.state.name}</h1>
            <p>{this.state.height}cm</p>
            <p><a target='_blank' rel="noreferrer" href={this.state.homeworld}>Homeworld</a></p>
            <ul>
              {movies}
            </ul>
          </div>
        )}
        <button
          type="button"
          className="btn"
          onClick={() => this.GetNewCharacter()}
        >
          Randomize Character
        </button>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <StarWars />
      </header>
    </div>
  );
}

export default App;
