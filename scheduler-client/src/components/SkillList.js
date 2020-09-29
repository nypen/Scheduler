import React, { Component } from "react";
import SkillService from "../services/skill.service";
import { Link } from "react-router-dom";

export default class SkillList extends Component {
  constructor(props) {
    super();
    this.retrieveSkills = this.retrieveSkills.bind(this);
    this.refreshList = this.refreshList.bind(this);

    this.state = {
      skills: [],
    };
  }

  componentDidMount() {
    this.retrieveSkills();
  }

  retrieveSkills() {
    SkillService.getAll()
      .then(response => {
        console.log(response.data);
        this.setState({
            skills: response.data,
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveSkills();
  }

  render() {
    const { skills } = this.state;

    return (
    
      <div>
        <div className="card">

          <div className="card-header">
            <h4>Skills List</h4>
          </div>

          <ul className="list-group">
            {skills &&
              skills.map((skill, index) => (
                <li
                  className={
                    "list-group-item "
                  }
                  key={index}
                >
                  <Link
                    to={"/skills/" + skill.id}
                  >
                    {skill.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
        <Link to="/skillform">
          <button  type="button" className="btn btn-primary" style={{marginTop:5}}>
            Add Skill
          </button>
        </Link>
      </div>
    )
  }
}