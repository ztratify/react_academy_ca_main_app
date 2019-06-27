import React from 'react'
import EmployeeApi from '../employee-api/employee-api';
import EmployeeTable from "./employee-table";
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';


export default class Employees extends React.Component {
  state = { employees: [] }

  componentDidMount() {
    this.refreshData();
  }

  // refreshData() {
  //   EmployeeApi.getAllEmployees()
  //     .then(data => {this.setState({ employees: data });})
  //     .catch(err => console.log(err))
  // }
  refreshData = async () => {
    try {
      let data = await EmployeeApi.getAllEmployees();
      this.setState({ employees: data });
    }
    catch (err) {
      console.log(err);
    }
  }

  deleteEmployee = async (id) => {
    try {
      await EmployeeApi.deleteEmployee(id);
      this.refreshData();
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <>
        <h1>Employees</h1>
        <EmployeeTable employees={this.state.employees} delete={this.deleteEmployee} />
        <Link to="/employee">
          <Button color="primary">Create Employee</Button>
        </Link>
      </>
    );
  }
}
