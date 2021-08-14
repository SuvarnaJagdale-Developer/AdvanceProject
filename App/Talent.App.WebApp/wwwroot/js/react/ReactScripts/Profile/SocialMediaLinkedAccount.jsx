/* Social media JSX */
import React from 'react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Popup,Button,Icon} from 'semantic-ui-react';

export default class SocialMediaLinkedAccount extends React.Component {
    constructor(props) {
        super(props);
        const details = props.linkedAccounts ?
        Object.assign({}, props.saveProfileData)
        : {
            linkedIn:"",
            github: ""
          }

        this.state = {
            showEditSection: false,
            newContact: details
        }
        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveContact = this.saveContact.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
    

    }


    openEdit() {
        const details = Object.assign({}, this.props.linkedAccounts)
        
        this.setState({
            showEditSection: true,
            newContact: details
        })
        console.log("Details",this.state.newContact)
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }
    handleChange(event) {
        const data = Object.assign({}, this.state.newContact)
       

        data[event.target.name] = event.target.value
        this.setState({
            newContact: data
        })
    }
    saveContact() {
       
      
        const data = Object.assign({}, this.state.newContact)
      
       
        this.props.saveProfileData(({ linkedAccounts : { linkedIn : data.linkedIn,github:data.github}}));
       
        this.closeEdit()
    }


    componentDidMount() {
        $('.ui.button.social-media')
            .popup();
    }


    render() {
        return (
            
           
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }
   
    renderEdit() {
        
        //let linked = this.props.details ? this.props.details.linkedIn : ""
        

        return (
           
            <div className='ui sixteen wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="LinkedIn"
                    name="linkedIn"
                    value={this.state.newContact.linkedIn}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your LinkedIn Url"
                    errorMessage="Please enter a LinkedIn Url"
                />
                <ChildSingleInput
                    inputType="text"
                    label="GitHub"
                    name="github"
                    value={this.state.newContact.github}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your Github Url"
                    errorMessage="Please enter a valid GitHub Url"
                />
                 <button type="button" className="ui teal button" onClick={this.saveContact}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
 
                </div>
              

)
    }


    renderDisplay() {
        let linkedIn = this.props.linkedAccounts ? this.props.linkedAccounts.linkedIn : ""
        let github = this.props.linkedAccounts ? this.props.linkedAccounts.github : ""
        return (
            <div className='ui sixteen wide column'>
            <div>

            <React.Fragment>
                        <a href={linkedIn} className="ui linkedin button socialMedia">
                            <i className="linkedin icon"></i>
                            LinkedIn
                        </a>
                        <a href={github} className="ui floated teal button socialMedia">
                            <i className="github icon"></i>
                            GitHub
                        </a>
                    </React.Fragment>

               {/*  <Button color='linkedin'>
                <Icon name='linkedin'/> LinkedIn 
                </Button>
                <Button content='Github'secondary > 
                <Icon name='github'/> Github
                </Button> */}
                <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
          </div>
          </div>
         
        )
       

    }

}