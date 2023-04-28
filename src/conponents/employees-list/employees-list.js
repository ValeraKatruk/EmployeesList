import EmployeesListItem from "../employees-list-item/employees-list-item"
import styled from "styled-components";

import "./employees-list.css"


const Ul = styled.ul`

text-align: center;
height: 150px;

background: url(https://img3.goodfon.ru/original/1920x1080/4/81/tekstura-fon-siniy-oboi.jpg);
font-size: 24px;

` 
const EmployeesList = ({ data, onDelete, onToggleProp, onChangeSalary}) => {
  const elements = data.map((item) => {
    const { id, ...itemProps } = item;
    return (
      <EmployeesListItem
        key={id}
        {...itemProps}
        onDelete={() => {
          onDelete(id);
        }}
        onToggleProp={(e) => {
          onToggleProp(id, e.currentTarget.getAttribute("data-toggle"));          
        }}
        onChangeSalary={(event)=> {
          onChangeSalary(id, event.target.value)
        }}
      />
    );
  }); 
 
  
  if(elements.length === 0) return <Ul className="app-list list-group">Нет сотрудников</Ul>
  return <ul className="app-list list-group">{elements}</ul>;
};

export default EmployeesList;