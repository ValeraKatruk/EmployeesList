import { Component } from "react";

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

  render() {
    const numberOfEmpoyees = this.state.data.length;
    const numberOfIncrease = this.state.data.filter((item) => item.increase).length;

    return (
      <div className="app">        
        <AppInfo numberOfEmpoyees={numberOfEmpoyees} numberOfIncrease={numberOfIncrease} />
        <div className="search-panel">
          <SearchPanel />
          <div className="btn-group">
            <AppFilter />
          </div>
        </div>
        <EmployeesList
          data={this.state.data}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp} />
        <EmployeesAddForm onAdd={this.addItem} />
      </div>
    );
  }
}

export default App;
