import React from 'react';
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import SkillList from './components/SkillList';
import EmployeeList from './components/EmployeeList';
import JobList from './components/JobList';
import Skill from './components/Skill';
import SkillForm from './components/SkillForm';
import EmployeeForm from './components/EmployeeForm';
import Employee from './components/Employee';

function App() {
  return (
    <div>
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <a href="/jobs" className="navbar-brand">
        Scheduler
      </a>
      <div className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to={"/employees"} className="nav-link">
            Employees
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/skills"} className="nav-link">
            Skills
          </Link>
        </li>
      </div>
    </nav>

    <div className="container mt-3">
      <Switch>
          <Route exact path={["/", "/jobs"]} component={JobList} />
          <Route exact path="/skills/" component={SkillList}/>
          <Route exact path="/skills/:id" component={Skill}/>
          <Route exact path="/skillform" component={SkillForm}/>
          <Route exact path="/employees" component={EmployeeList} /> 
          <Route exact path="/employees/:id" component={Employee} /> 
          <Route exact path="/employeeform" component={EmployeeForm} /> 
      </Switch>
    </div>
  </div>
  );
}

export default App;
