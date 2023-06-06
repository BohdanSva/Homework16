// Homework 16:
// Recreate the simpsons API project using functional, it should include
// -sort
// -filter
// -like/dislike
// -delete
// You can either convert an existing version or make a whole new one.
// PS, no redux, yet!

import React, { useState } from "react";
import axios from "axios";
import Loading from "./components/Loading";
import Simpsons from "./components/Simpsons";
import "./App.css";

const App = (props) => {
  const [likes, setLikes] = useState(false);
  const { data } = props;

  async componentDidMount() {
    const { data } = await axios.get(
      `https://thesimpsonsquoteapi.glitch.me/quotes?count=10`
    );

      data.forEach((element, index) => { 
        element.id = Math.random() + index; 
      });

    this.setState({ simpsons: data });
  }

  onLikeToggle = (id) => {
    const indexOf = this.state.simpsons.findIndex(char => {
      return char.id === id;
    });
    const simpsons = [...this.state.simpsons];

    simpsons[indexOf].liked = !simpsons[indexOf].liked;
    this.setState({ simpsons });
  }

  onDelete = (id) => { 
    const indexOf = this.state.simpsons.findIndex(char => {
      return char.id === id;
    });

    const simpsons = [...this.state.simpsons];
    simpsons.splice(indexOf, 1); 
    this.setState({ simpsons })
    
  };

  applyFilter = () => {
    const {searchInput, alphaSort} = this.state;

    let filteredList = [...this.state.simpsons];
    console.log(filteredList);

   if(searchInput) { 
    filteredList = filteredList.filter((item) => {
       if (
         item.character.toLowerCase().includes(searchInput.toLowerCase())
         ) {
           return true;
         }
     });
   }

     // Sort by alphabetical order, by character's name:
     if (alphaSort === 'asc') {
      filteredList.sort((itemOne, itemTwo) => {
        if(itemOne.character > itemTwo.character) return 1;
        if(itemOne.character < itemTwo.character) return -1;
      });
     } else if (alphaSort === 'desc') {
      filteredList.sort((itemOne, itemTwo) => {
        if(itemOne > itemTwo) return -1;
        if(itemOne < itemTwo) return 1;
      });
     }
     // Return the result of the filter and the sort:
     return filteredList;
    }

// Filter input controls
onSearchInput = (event) => {
  this.setState({searchInput: event.target.value});
}

onAlphaSort = (event) => {
  this.setState({alphaSort: event.target.value});
}

  render() {

    const { simpsons } = this.state;

    if (!simpsons) return <Loading />;

    if (simpsons.length === 0) return <p>You deleted everything</p>

    // calculate the total
    // I'm not going to save this number in the state, because it's always recalculated

    let total = 0;
    simpsons.forEach(char => {
      if (char.liked) total++;
    })

    return (
      <>
        <h1>Total no of liked chars #{total}</h1>

        <input onInput={this.onSearchInput} type="text"></input>

        <select onChange={this.onAlphaSort}>
          <option value="">Please choose alphabetical character sorting</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>

        <Simpsons 
        // simpsons={simpsons}
        simpsons={this.applyFilter()}
        onAlphaSort={this.onAlphaSort}
        onDelete={this.onDelete}
        onLikeToggle={this.onLikeToggle}/>
      </>
    );
  }
}

export default App;
