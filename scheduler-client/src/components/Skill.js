import React, { Component } from "react";
import SkillsService from "../services/skill.service";

export default class Skill extends Component {
    constructor(props) {
        super();
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.getSkill = this.getSkill.bind(this);
        this.updateSkill = this.updateSkill.bind(this);
        this.deleteSkill = this.deleteSkill.bind(this);
        this.setUpdate = this.setUpdate.bind(this);
    
        this.state = {
          currentSkill: {
            id: null,
            name: "",
            description: "",
            creationDate: ""
          },
          update: false,
          message: ""
        };
      }

      componentDidMount() {
        this.getSkill(this.props.match.params.id);
      }

      getSkill(id) {
        SkillsService.get(id)
          .then(response => {
            this.setState({
              currentSkill: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }

      setUpdate(){
        if(this.state.update)   //send update req
        {
            this.updateSkill()
        }

        this.setState({
            update: !this.state.update
        })
      }

      onChangeTitle(e) {
        const title = e.target.value;
    
        this.setState(function(prevState) {
          return {
            currentSkill: {
              ...prevState.currentSkill,
              title: title
            }
          };
        });
      }
    
      onChangeName(e) {
        const name = e.target.value;
        
        this.setState(prevState => ({
          currentSkill: {
            ...prevState.currentSkill,
            name: name
          }
        }));
      }

      onChangeDescription(e) {
        const description = e.target.value;
        
        this.setState(prevState => ({
          currentSkill: {
            ...prevState.currentSkill,
            description: description
          }
        }));
      }

      updateSkill() {
        SkillsService.update(
          this.state.currentSkill.id,
          this.state.currentSkill
        )
        .then(response => {
            console.log('update :'+ JSON.stringify(response.data));
            this.setState({
                currentSkill: response.data,
                message: "The skill was updated successfully!"
            });
        })
        .catch(e => {
            this.setState({
                message: "The skill could not be updated!"
            });
            console.log(e);
        });
      }

      deleteSkill() {    
        SkillsService.delete(this.state.currentSkill.id)
          .then(response => {
            console.log('delete : '+JSON.stringify(response.data));
            this.props.history.push('/')
          })
          .catch(e => {
            console.log(e);
          });
      }

      render() {
        const { currentSkill, update } = this.state;
    
        return (
          <div>
            <h4>Skill</h4>
            {
                update?(
                    <div className="card">
                        <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Name</label>
                                <input
                                type="text"
                                className="form-control"
                                id="title"
                                value={currentSkill.name}
                                onChange={this.onChangeName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                type="text"
                                className="form-control"
                                id="description"
                                value={currentSkill.description}
                                onChange={this.onChangeDescription}
                                />
                            </div>
                            <button
                            className="badge badge-secondar mr-2"
                            onClick={this.setUpdate}
                            >
                            Cancel
                            </button>
                            <button
                            type="submit"
                            className="badge badge-success mr-2"
                            onClick={this.setUpdate}
                            >
                            Update
                            </button>
                        </form>   
                        </div>
                    </div>
                ) : (
                    <div className="card">
                        <div className="card-header">
                            {currentSkill.name}
                        </div>
                        <div className="card-body">
                            <small className="text-muted">{this.state.message}</small>
                            <p>
                                Description: {currentSkill.description}
                            </p>
                            <p>
                                Creation Date: {currentSkill.creationDate}
                            </p>
                            <button
                            className="badge badge-danger mr-2"
                            onClick={this.deleteSkill}
                            >
                            Delete
                            </button>
                            <button
                            type="submit"
                            className="badge badge-primary mr-2"
                            onClick={this.setUpdate}
                            >
                            Update
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
        );
    }
}

