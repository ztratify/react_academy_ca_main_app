import React from 'react';
import EmployeeApi from '../employee-api/employee-api';
import { Table } from 'reactstrap';
// import Employee from './employee';

export default class Employees extends React.Component {
  state = {
    employees: []
  };

  componentDidMount() {
    EmployeeApi.getAllEmployees().then(data => this.setState({employees: data}))
  }

  render = () => (
    <>
      <h1>List of Employees</h1>
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {this.state.employees.map((e, index) => (
            <tr>
              <td></td>
              <td key={index}>{e.firstName}</td>
              <td key={index}>{e.lastName}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}