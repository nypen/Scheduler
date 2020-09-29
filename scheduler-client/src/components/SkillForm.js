import React, { Component } from "react";
import SkillsService from "../services/skill.service";

export default class SkillForm extends Component {
    constructor(props) {
        super();
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.addSkill = this.addSkill.bind(this);
    
        this.state = {
            skill:{
                name: "",
                description: ""
            },
            errorMesage: ""         
        };
      }

      addSkill() {

        this.setState({
            errorMesages: []
        })

        if(this.state.skill.name === "")
        {
            this.setState({
                errorMesage: "Skill name cannot be empty!"
            });
        }
        else if(this.state.skill.description === "")
        {
            this.setState({
                errorMesage: "Skill description cannot be empty!"
            });
        }
        else
        {
            SkillsService.add(this.state.skill)
            this.props.history.push('/skills')
        }
      }
    
      onChangeName(e) {
        const name = e.target.value;
        
        this.setState(prevState => ({
          skill: {
            ...prevState.skill,
            name: name
          }
        }));
      }

      onChangeDescription(e) {
        const description = e.target.value;
        
        this.setState(prevState => ({
            skill: {
              ...prevState.skill,
              description: description
            }
          }));
      }

      render() {
        const { skill, errorMessage } = this.state;
    
        return (
          <div>
              <div className="edit-form">
                <h4>Add a new skill</h4>
                <form>
                  <div className="form-group">
                    <label htmlFor="title">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      value={skill.name}
                      onChange={this.onChangeName}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      value={skill.description}
                      onChange={this.onChangeDescription}
                    />
                  </div>
                </form>
                <button
                  className="btn btn-success"
                  onClick={this.addSkill}
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

