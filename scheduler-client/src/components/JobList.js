import React, { Component } from "react";
import JobService from "../services/job.service";
import DepartmentService from "../services/department.service";
import { Link } from "react-router-dom";
import departmentService from "../services/department.service";

export default class JobList extends Component {
  constructor(props) {
    super();
    this.retrieveDepartments = this.retrieveDepartments.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveJob = this.setActiveJob.bind(this);
    this.setActiveDepartment = this.setActiveDepartment.bind(this);

    this.state = {
      departments: [],
      jobs: [],
      currentDepartment: null,
      currentDepartmentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveDepartments();
  }

  retrieveDepartments() {
    departmentService.getAll()
      .then(response => {
        console.log(response.data);
        this.setState({
            departments: response.data,
            currentDepartment: response.data[0],
            currentDepartmentIndex: 0,
            jobs: response.data[0].departmentJobs,
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveJobs();
    this.setState({
      currentJob: null,
      currentJobIndex: -1
    });
  }

  setActiveJob(job, index) {
    this.setState({
      currentJob: job,
      currentJobIndex: index
    });
  }

  setActiveDepartment(event) {
    var index = event.target.value; 
    console.log(this.state.departments)
    console.log('index '+ index)
    this.setState({
      currentDepartmentIndex: index,
      currentDepartment: this.state.departments[index],
      jobs: this.state.departments[index].departmentJobs
    });     
    console.log(this.state.jobs) 
  }

  render() {
    const { departments, jobs, value, currentJobIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="form-group">
            <label form="sel1">Departments:</label>
            <select className="form-control" id="departmentList" value={value} onChange={this.setActiveDepartment}>
              {departments &&
                departments.map((department, index) => (
                  <option key={department.id} value={index}>
                    {department.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="col-md-10">
          <h4>Jobs List</h4>

          <ul className="list-group">
            {jobs &&
              jobs.map((jobObject, index) => (
                <li
                  className={
                    "list-group-item "
                  }
                  key={index}
                >
                  {jobObject.job.name}
                  <div>
                    <small>Skillset:</small>
                  </div>
                  <ul >
                    {jobObject.job.jobSkills &&
                      jobObject.job.jobSkills.map((skillObject,skillIndex) => (
                        <li key = {skillIndex}>
                          <Link
                            to={"/skills/" + skillObject.skill.id}
                          >
                          <small>{skillObject.skill.name}</small>
                          </Link>
                        </li>
                      ))
                    }
                  </ul>
                </li>
              ))}
          </ul>

        </div>
      </div>
    )
  }
}