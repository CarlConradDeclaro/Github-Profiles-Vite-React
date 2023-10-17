import React from 'react';
import axios from 'axios'; // Import Axios
import './style.css';

const dataSet= [
   {avatar_url :  "https://avatars.githubusercontent.com/u/116258847?v=4", name : "ShinjiCodeEVA" , id :" 116258847" ,  followers: "13",following: "5", public_repos: "37"},
   {avatar_url :  "https://avatars.githubusercontent.com/u/113151776?v=4", name : "	Leander Lubguban" , id :" 113151776", followers: "12", following: "18", public_repos: "15"},
   {avatar_url :  "https://avatars.githubusercontent.com/u/133208566?v=4", name : "EvanBatac" , id :" 133208566", followers: "2" , following: "4", public_repos: "4"},
  
]; 

const CardList = (props) =>(
    <div>
      {props.profiles.map(profile => <Card key = {profile.id} {...profile}/>)}
    </div>
)
 

class Form extends React.Component{
  state = {userName : ''}
  // userNameInput =React.createRef();
  handleSubmit = async (event)=> {
      event.preventDefault();
      // console.log(this.userNameInput.current.value);
      // console.log(this.state.userName);
       const resp = await
        axios.get(`https://api.github.com/users/${this.state.userName}`);
       this.props.onSubmit(resp.data);
       this.setState({ userName : ''});
       console.log(resp);
  };

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input 
          type="text"  
          placeholder="Search for Username" 
          value={this.state.userName}
          onChange={event => this.setState({userName : event.target.value})}
          // ref={this.userNameInput} 
          required
          className="input" />
          <button> Add User</button>
        </form>
      </div>
    )
  }

}

class Card extends React.Component{
  
  render(){
    const info = this.props;
    return(
      <div className="gitHub-proFile">
        <img src={info.avatar_url}   /> 
        <div className="info">
          <div className="name">{info.name}</div>
          <div className="id">Id:{info.id}</div>

          <div className="follower-following">
              <div className="followers">Followers:{info.followers}</div>
              <div className="following">Following:{info.following}</div>
          </div>
           
          <div className="id">Public Repos: {info.public_repos}</div>

        </div>
      </div>
    )
  }
}



class App extends React.Component{
   
  state = {

    profiles : dataSet,
  }
  
  addNewProfile =(profileData) => {
       this.setState(prevState => ({
     profiles:[...prevState.profiles,profileData ],

       }))
  }

    
  render(){
    return(
      <div className="github-page">      
        <div className="header">{this.props.title} </div>
        <Form  onSubmit={this.addNewProfile}/>
        <CardList profiles ={this.state.profiles}  />
      </div>
    )
  }

} 

export default App
 