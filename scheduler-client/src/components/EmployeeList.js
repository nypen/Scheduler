import React, { Component } from "react";
import EmployeeService from "../services/employee.service";
import { Link } from "react-router-dom";

export default class EmployeeList extends Component {
  constructor(props) {
    super();
    this.retrieveEmployees = this.retrieveEmployees.bind(this);
    this.refreshList = this.refreshList.bind(this);

    this.state = {
      employees: [],
      currentEmployee: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.retrieveEmployees();
  }

  retrieveEmployees() {
    EmployeeService.getAll()
      .then(response => {
        this.setState({
            employees: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveEmployees();
    this.setState({
      currentEmployee: null,
      currentIndex: -1
    });
  }

  render() {
    const { employees} = this.state;

    return (
        <div>
          <h4>Employees List</h4>

          <ul className="list-group">
            {employees &&
              employees.map((employee, index) => (
                <li
                  className=
                  "list-group-item "
                  key={index}
                >
                <Link to={"/employee/" + employee.id}>
                    {employee.name + " " + employee.surname}
                </Link>
                </li>
              ))}
          </ul>
          <Link to="/employeeform">
          <button  type="button" className="btn btn-primary" style={{marginTop:5}}>
            Add Employee
          </button>
        </Link>

        </div>
    )
  }
}