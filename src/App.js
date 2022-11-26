import './App.css';
import {useState} from 'react';
import AnimalData from "./assets/animals.json";
import AnimalItem from "./components/AnimalItem";

function App() {

  const [fav, setFav] = useState(AnimalData.reduce((o, key) => ({ ...o, [key.name]: -1}), {}));
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState({"active_time": [], "animal_type": []});
  const [filtData, setFiltData] = useState(AnimalData);
  const [sortMethod, setSortMethod] = useState("default");

  const allFilter = [{type: "active_time", value: "Diurnal"}, 
  {type: "active_time", value: "Nocturnal"}, 
  {type: "animal_type", value: "Mammal"}, 
  {type: "animal_type", value: "Bird"}, 
  {type: "animal_type", value: "Marsupial"}, 
  {type: "animal_type", value: "Reptile"}]

  const allSortMethods = {
    default: { method: (a, b) => (parseInt(a.id) < parseInt(b.id) ? -1 : 1)},
    ascending: { method: (a, b) => (parseInt(a.lifespan) < parseInt(b.lifespan) ? -1 : 1) },
    descending: { method: (a, b) => (parseInt(a.lifespan) > parseInt(b.lifespan) ? -1 : 1) },
  };

  // Aggregation
  const updateAvg = (name, lifespan) => {
    let mutFav = fav;
    mutFav[name] = mutFav[name] === 1 ? -1 : 1;
    setTotal(total + mutFav[name] * parseInt(lifespan));
    setFav(mutFav);
  };

  const calcAvg = () => {
    const size = Object.keys(fav).filter(item => fav[item] === 1).length;
    return size === 0 ? 0: Math.round(total / size);
  }

  // Filter
  const updateFilter = (newFilter, filterType) => {
    let mutFiltList = filter[filterType];
    if (mutFiltList.includes(newFilter)) {
      const idx = mutFiltList.indexOf(newFilter);
      mutFiltList.splice(idx, 1);
    } else {
      mutFiltList.push(newFilter);
    }
    let newFilterList = filter;
    filter[filterType] = [...mutFiltList];
    setFilter(newFilterList);
    matchFilter(filterType);
  } 

  const matchFilter = () => {
    const size = filter["active_time"].length + filter["animal_type"].length;
    if (size === 0 || size === allFilter.length) {
      setFiltData(AnimalData);
    } else {
      setFiltData(AnimalData.filter(item => 
        (filter["active_time"].includes(item["active_time"]) || filter["active_time"].length === 0) && 
        (filter["animal_type"].includes(item["animal_type"]) || filter["animal_type"].length === 0)
      ));
    }
  }

  // reset
  const resetPage = () => {
    setFav(AnimalData.reduce((o, key) => ({ ...o, [key.name]: -1}), {}));
    setTotal(0);
    setFilter({"active_time": [], "animal_type": []});
    setFiltData(AnimalData);
    setSortMethod("default");
  }

  return (
    <div className="App">
      <div className="animal-cards">
        <h1>SleepyOwl's Zoo</h1>
        <div className="animal">
          {filtData
            .sort(allSortMethods[sortMethod].method)
            .map((item, index) => (<AnimalItem key={"animal"+index} info={item} liked={fav[item.name]} setStateOfParent={updateAvg}/>
          ))}
        </div>
      </div>

      <div className="fav">
        <div className="sorting">
          <h3>Sort By</h3>
          <select defaultValue={'default'} onChange={(e) => setSortMethod(e.target.value)}>
            <option value="default"> Default </option>
            <option value="ascending"> Lifespan: Ascending </option>
            <option value="descending"> Lifespan: Descending </option>
          </select>
        </div>
        <div className="filtering">
          <h3>Animal Type</h3>
          <input type="checkbox" value="bird" onClick={() => updateFilter("Bird", "animal_type")}/>
          <label> Bird </label><br/>
          <input type="checkbox" value="mammal" onClick={() => updateFilter("Mammal", "animal_type")}/> 
          <label> Mammal </label><br/>
          <input type="checkbox" value="reptile" onClick={() => updateFilter("Reptile", "animal_type")}/> 
          <label> Reptile </label><br/>
          <input type="checkbox" value="marsupial" onClick={() => updateFilter("Marsupial", "animal_type")}/> 
          <label> Marsupial </label><br/>
          <h3>Active Time</h3>
          <input type="checkbox" value="diurnal" onClick={() => updateFilter("Diurnal", "active_time")}/> 
          <label> Diurnal </label><br/>
          <input type="checkbox" value="nocturnal" onClick={() => updateFilter("Nocturnal", "active_time")}/> 
          <label> Nocturnal </label><br/>
        </div>
        <button onClick={() => resetPage()}> Reset </button>
        <div>
          <h3>Favorites</h3>
          <ul>
            {Object.keys(fav)
              .filter(item => fav[item] === 1)
              .map((item, index) => (
                <li key={"fav"+index}>{item.toString()}</li>
              ))}
          </ul>
          <h4>Average Lifespan: {calcAvg()}</h4>
        </div>
      </div>
    </div>
  );
}

export default App;
