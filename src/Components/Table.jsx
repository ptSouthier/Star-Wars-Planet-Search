import React, { useContext } from 'react';
import planetsContext from '../context/planetsContext';
import SearchInput from './SearchInput';
import SortFilter from './SortFilter';
import ValuesFilter from './ValuesFilter';

// Para a implementação deste Componente e de suas lógicas, utilizei como referência o código do colega de Turma, Juan Pablo! PR: https://github.com/tryber/sd-010-a-project-starwars-planets-search/pull/128

function Table() {
  const { data, filters } = useContext(planetsContext);
  const { filterByName: { name } } = filters;
  const { filterByNumericValues } = filters;
  const { order: { column, sort } } = filters;

  const filteredByName = data
    .filter((planet) => planet.name.toLowerCase().includes(name));

  const checkFilters = () => {
    let filteredAPI = filteredByName;
    filterByNumericValues.map((params) => {
      if (params.comparison === 'maior que') {
        filteredAPI = filteredByName.filter((response) => (
          response[params.column] > Number(params.value)));
      } else if (params.comparison === 'menor que') {
        filteredAPI = filteredByName.filter((response) => (
          response[params.column] < Number(params.value)));
      } else if (params.comparison === 'igual a') {
        filteredAPI = filteredByName.filter((response) => (
          response[params.column] === params.value));
      }
      return '';
    });
    return filteredAPI.sort((a, b) => {
      if (column === 'Name' && sort === 'ASC') {
        return a[column.toLowerCase()].localeCompare(b[column.toLowerCase()]);
      }
      if (column === 'Name' && sort === 'DESC') {
        return b[column.toLowerCase()].localeCompare(a[column.toLowerCase()]);
      }
      if (sort === 'ASC') {
        return a[column] - b[column];
      }
      return b[column] - a[column];
    });
  };

  const planetsTable = () => checkFilters().map((planet) => (
    <tr key={ planet.name }>
      <td data-testid="planet-name">{ planet.name }</td>
      <td>{ planet.rotation_period }</td>
      <td>{ planet.orbital_period }</td>
      <td>{ planet.diameter }</td>
      <td>{ planet.climate }</td>
      <td>{ planet.gravity }</td>
      <td>{ planet.terrain }</td>
      <td>{ planet.surface_water }</td>
      <td>{ planet.population }</td>
      <td>{ planet.films }</td>
      <td>{ planet.created }</td>
      <td>{ planet.edited }</td>
      <td>{ planet.url }</td>
    </tr>
  ));

  return (
    <div>
      <SearchInput />
      <SortFilter />
      <ValuesFilter />
      <h1>API - Star Wars Planets</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>{ planetsTable() }</tbody>
      </table>
    </div>
  );
}

export default Table;
