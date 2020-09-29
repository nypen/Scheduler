import React, { Component } from "react";
import EmployeesService from "../services/employee.service";

export default class EmployeeForm extends Component {
    constructor(props) {
        super();
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.addEmployee = this.addEmployee.bind(this);
    
        this.state = {
            employee:{
                name: "",
                description: ""
            },
            errorMesage: ""         
        };
      }

      addEmployee() {

        this.setState({
            errorMesages: []
        })

        if(this.state.employee.name === "")
        {
            this.setState({
                errorMesage: "Employee name cannot be empty!"
            });
        }
        else if(this.state.employee.description === "")
        {
            this.setState({
                errorMesage: "Employee description cannot be empty!"
            });
        }
        else
        {
            EmployeesService.add(this.state.employee)
            this.props.history.push('/employees')
        }
      }
    
      onChangeName(e) {
        const name = e.target.value;
        
        this.setState(prevState => ({
          employee: {
            ...prevState.employee,
            name: name
          }
        }));
      }

      onChangeDescription(e) {
        const description = e.target.value;
        
        this.setState(prevState => ({
            employee: {
              ...prevState.employee,
              description: description
            }
          }));
      }

      render() {
        const { employee, errorMessage } = this.state;
    
        return (
          <div>
              <div className="edit-form">
                <h4>Add a new employee</h4>
                <form>
                  <div className="form-group">
                    <label htmlFor="title">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      value={employee.name}
                      onChange={this.onChangeName}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      value={employee.description}
                      onChange={this.onChangeDescription}
                    />
                  </div>
                </form>
                <button
                  className="btn btn-success"
                  onClick={this.addEmployee}
                >
                  Add
                </button>
                <div>
                    {
                        <div class="invalid-feedback">{errorMessage}</div>
                    }
                </div>
    
              </div>
              </div>
        );
    }
}

