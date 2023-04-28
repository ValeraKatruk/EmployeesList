import { Component } from "react";
import styled from 'styled-components';

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";

import "./app.css"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { name: "Вася", surname: "Руркин", salary: "1000", increase: false, rise: false, id: 1 },
        { name: "Анна", surname: "Пуркина", salary: "80", increase: false, rise: false, id: 2 },
        { name: "Катя", surname: "Швед", salary: "1500", increase: false, rise: false, id: 3 },
      ],
      term: "",
      filter: "all",
    };
    this.maxId = 4;
  }

  deleteItem = (id) => {
    this.setState(({ data }) => {
      return {
        data: data.filter((item) => item.id !== id),
      };
    });
  };

  addItem = (name, salary) => {
    const newItem = {
      name,
      salary,
      increase: false,
      rise: false,
      id: this.maxId++,
    };
    this.setState(({ data }) => {
      const newArr = [...data, newItem];
      return {
        data: newArr,
      };
    });
  };

  onToggleProp = (id, prop) => {
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return { ...item, [prop]: !item[prop] };
        }
        return item;
      }),
    }));
  };

  searchEmp = (items, term) => {
    if (term.length === 0) return items;

    return items.filter((item) => {
      return item.name.indexOf(term) > -1 || item.surname.indexOf(term) > -1;
    });
  };

  onSearchEmp = (term) => {
    this.setState({ term });
  };

  filterPost = (items, filter) => {
    switch (filter) {
      case "rise":
        return items.filter((item) => item.rise);
      case "more1000$":
        return items.filter((item) => item.salary >= 1000);
      default:
        return items;
    }
  };

  onFilterEmp = (filter) => {
    this.setState({ filter });
  };

  onChangeSalary = (id, event) => {
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          if (event === "" || event === "$" || isNaN(event)) event = 0;
          return { ...item, salary: `${parseInt(event)}` };
        }
        return item;
      }),
    }));
  };

  render() {
    const { data, term, filter } = this.state;
    const numberOfEmpoyees = data.length;
    const numberOfIncrease = data.filter((item) => item.increase).length;
    const visibleEmp = this.filterPost(this.searchEmp(data, term), filter);

    return (
      <div className="app">
        <AppInfo numberOfEmpoyees={numberOfEmpoyees} numberOfIncrease={numberOfIncrease} />
        <div className="search-panel">
          <SearchPanel onSearchEmp={this.onSearchEmp} />
          <div className="btn-group">
            <AppFilter filter={filter} onFilterEmp={this.onFilterEmp} />
          </div>
        </div>
        <EmployeesList
          data={visibleEmp}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp}
          onChangeSalary={this.onChangeSalary}
        />
        <EmployeesAddForm onAdd={this.addItem} />
      </div>
    );
  }
}

export default App;
