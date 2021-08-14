/* Skill section */
import React ,{ Fragment }from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Table, Button, Icon, Grid,Segment,Menu,Dropdown} from 'semantic-ui-react';

export default class Skill extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editSkillId:"",
            addSkill:{
                id: "",
                Skill:"",
                ExperienceLevel:"",
               
               },
                showEditSection: false,
                addeOrUpdate: "",
            }

            this.openNew = this.openNew.bind(this)
            this.closeEdit = this.closeEdit.bind(this)
            this.saveData=this.saveData.bind(this)
            this.updateStateData = this.updateStateData.bind(this)
            this.handleChange=this.handleChange.bind(this)
            this.openEdit = this.openEdit.bind(this)
      
    }

    openNew() {
       
        console.log("new Open" +this.props.skillData),
        this.setState({
            showEditSection: true,
            addSkill:{
                id: "",
                Skill:"",
                ExperienceLevel:"",
               
               },
         addeOrUpdate:"Create"
        })
       
        
    }


    openEdit(skills) {
     console.log("Skills Not Updated",skills.level)
    
      this.setState({
        editSkillId:skills.id,
          showEditSection: true,
          addSkill:{
            id: skills.id,
            Skill:skills.name,
            ExperienceLevel:skills.level
           
           },
        addeOrUpdate:"Update"
      })
    }

    updateStateData(event) {
      const data = Object.assign({}, this.state.addSkill)
      
       data[event.target.name] = event.target.value
       
       this.setState({
        addSkill:data
         
       })
       console.log("set",data);
   }

   handleChange(event,data) 
   {
         
     const{addSkill}=this.state
     addSkill.ExperienceLevel = data.value
     this.setState({
      addSkill 
  })
       
}
   
    closeEdit() {
        console.log("close")
              this.setState({
                  showEditSection: false,
                  editSkillId:false
                   

              })
          }

          saveData()
          {
              console.log("saveData",this.state.addSkill)
          
              var cookies = Cookies.get('talentAuthToken');
              $.ajax({
                url: 'http://localhost:60290/profile/profile/addSkill',
                headers: {
                    'Authorization': 'Bearer ' + cookies,
                    'Content-Type': 'application/json'
                },
                type: "POST",
                data: JSON.stringify(this.state.addSkill),
                success: function (res) {
      
                console.log("Load Data",res)
                if (res.success == true) {
                  console.log("getDataSkill",res)
                  if (this.state.createOrUpdate === "Create")
                    {
                        TalentUtil.notification.show("Skill added sucessfully", "success", null, null)
                    }                    
                    else
                    {
                        TalentUtil.notification.show("Skill updated sucessfully", "success", null, null)
                    } 
                  this.props.loadData()
      
                  } 
              else {
                  TalentUtil.notification.show("Skill not update successfully", "error", null, null)
              }
               }.bind(this),
                error: function (res, a, b) {
                  console.log(res)
                  console.log(a)
                  console.log(b)
              }  
              }); 
             this.setState({showEditSection: false}) 
             this.setState({editSkillId:""}) 
              }


              deleteLanguage(skillsId) 
              {
    
                var cookies = Cookies.get('talentAuthToken');
                $.ajax({
                    url: 'http://localhost:60290/profile/profile/DeleteSkill',
                    headers: {
                        'Authorization': 'Bearer ' + cookies,
                        'Content-Type': 'application/json'
                    },
                    type: "POST",
                    data: JSON.stringify(skillsId),
                    success: function (res) {
                        console.log(res)
                        if (res.success == true) 
                        { 
                          if (this.state.addeOrUpdate === "Create")
                                {
                                    TalentUtil.notification.show("Language added sucessfully", "success", null, null)
                                }                    
                                else
                                {
                                    TalentUtil.notification.show("Language updated sucessfully", "success", null, null)
                                }                    
                                this.props.loadData()
                            } else {
                                TalentUtil.notification.show("Language did not add successfully", "error", null, null)
                     }
                    }.bind(this),
                    error: function (res, a, b) {
                        console.log(res)
                        console.log(a)
                        console.log(b)
                    }
                })
            }
            
            


    render() {
        return (
            
            this.state.showEditSection ? this.renderNew() : this.renderDisplay()
        )
    }
    renderNew() {

        const options = [
            { key: 1, text: 'Beginner', value:'Beginner'},
            { key: 2, text: 'Intermediate', value:'Intermediate'},
            { key: 3, text: 'Expert', value:'Expert'},
          ]
             
         return(
             <div class='row'>
               <div className='ui sixteen wide column'>
                    <Grid columns='equal'>
                   
                      <Grid.Column>
                      <ChildSingleInput
                        inputType="text"
                        name="Skill"
                        value={this.state.addSkill.Skill}
                        controlFunc={this.updateStateData}
                        maxLength={80}
                        placeholder="Add New Skill"
                        errorMessage="Please enter a valid name"/>
                        </Grid.Column>

                        <Grid.Column> 
                        <Dropdown
                                placeholder='Select Level'
                                fluid
                                selection
                                options={options}
                                value={this.state.addSkill.ExperienceLevel} 
                                onChange={(event,{ value  })=>this.handleChange (event,{ value })}  
                                
                            />

                        </Grid.Column> 
                        <Grid.Column> 
                        <button type="button" className="ui teal button" onClick={this.saveData}>Add</button>
                        <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
                        </Grid.Column>
                        </Grid>
                      {this.renderDisplay()}
                      </div>
                      </div>
                      )
            }
            
   
   renderDisplay()
            {

                const options = [
                    { key: 1, text: 'Beginner', value:'Beginner'},
                    { key: 2, text: 'Intermediate', value:'Intermediate'},
                    { key: 3, text: 'Expert', value:'Expert'},
                  ]
             return (
 
                <div className='ui sixteen wide column'>
                 <h4> </h4>
            <Table> 
            <Table.Header> 
            <Table.Row>
           
            <Table.HeaderCell>Skill</Table.HeaderCell>
            <Table.HeaderCell>Level</Table.HeaderCell>
            <Table.HeaderCell>
            <button type="button" className="ui teal button" onClick={this.openNew}>
            <Icon name='plus'/>
              Add</button>
            </Table.HeaderCell>
              </Table.Row> 
                </Table.Header>
                
            <Table.Body>
                {this.props.skillData.map((skills) => (
                     
                     <Fragment>
                     {this.state.editSkillId===skills.id ?(  
                       
                       <Table.Row>
                       <Table.Cell>
                       
                       <ChildSingleInput
                        inputType="text"
                        name="Skill"
                        value={this.state.addSkill.Skill}
                        controlFunc={this.updateStateData}
                        maxLength={80}
                        placeholder="Add New Skill"
                        errorMessage="Please enter a valid name"/>
                          </Table.Cell>   

                          <Table.Cell>
                          <Dropdown
                                placeholder='Select Level'
                                fluid
                                selection
                                options={options}
                                value={this.state.addSkill.ExperienceLevel} 
                                onChange={(event,{ value  })=>this.handleChange (event,{ value })}  
                                
                            />
                              </Table.Cell> 
                                 
                                 <Table.Cell>
    
                                 <button type="button" class="ui blue basic button" onClick={this.saveData}>Update</button>
                               <button type="button"class="ui red basic button" onClick={this.closeEdit}>Cancel</button>
                           
                               </Table.Cell>
                               </Table.Row>
                              
                              ) :(
                       
                       
                       
                       
                       
                       
                       
                       <Table.Row key={skills.id}>
                       <Table.Cell>{skills.name}</Table.Cell>
                       <Table.Cell>{skills.level}</Table.Cell>
                      <Table.Cell> <Icon name='pencil alternate' onClick={()=>this.openEdit(skills)}/>
                      <i className="delete icon" onClick={()=>this.deleteLanguage(skills.id)}></i></Table.Cell>
                        
                     </Table.Row>
                      ) 
                    }
                    </Fragment>
                  
                 ))} 
                 </Table.Body> 
                </Table>
                </div>
          );

        }
 
}

