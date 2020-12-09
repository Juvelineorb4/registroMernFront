import React, { Component } from 'react'
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default class createNote extends Component {
    
    state ={
        users:[],
        userSelect:'',
        title:'',
        content:'',
        date: new Date(),
        editing: false,
        _id:""
    }

    async componentDidMount(){
        
        const res = await axios.get('http://localhost:4000/api/users');
        this.setState({users:res.data.map(user=>user.userName)});
       // console.log(this.state.users);
       if(this.props.match.params.id){
           const result = await axios.get('http://localhost:4000/api/notes/' + this.props.match.params.id);
          // console.log(result.data);
           this.setState({
               title: result.data.title,
               content: result.data.content,
               author: result.data.author,
               date: new Date(result.data.date),
                editing:true,
                _id: this.props.match.params.id
            });
       }
    }


    onSubmit = async (e)=>{
        e.preventDefault();
        const newNote ={
            title: this.state.title,
            content: this.state.content,
            author: this.state.userSelect,
            date: this.state.date
            
        };
        if(this.state.editing){
            await axios.put('http://localhost:4000/api/notes/'+ this.state._id,newNote)
        }else{
            await axios.post('http://localhost:4000/api/notes',newNote);
        }
        
       
        window.location.href='/';
    }
    onInputChange=(e)=>{
      this.setState({[e.target.name]: e.target.value});
      
    }
    onChangeDate = date =>{
        this.setState({date});
        //console.log(date);
    }
    
    
    render() {
        return (
            
                <div className="col-md-6 offset-md-3">
                    <div className="card card-body">
                        <h3>Create a Note</h3>
                        {/* SELECT USER*/}
                        <div className="form-group">
                            <select className="form-control"
                                name="userSelect"
                                onChange={this.onInputChange}
                                value={this.state.userSelect}
                                >
                                {
                                    this.state.users.map(user => 
                                    <option key={user} value={user}>
                                       {user}     
                                    </option>)
                                }
                            </select>
                        </div>

                        <div className="form-group">
                            <input 
                            type="text" 
                            className='form-control' 
                            placeholder='title' 
                            name='title'
                            value={this.state.title}
                            onChange={this.onInputChange}
                            required/>
                        </div>

                        <div className="form-group">
                            <textarea name="content" value={this.state.content} placeholder='Content' className="form-control" onChange={this.onInputChange} required></textarea>
                        </div>

                        <div className="form-group">
                        <DatePicker 
                            className="form-control"
                            value={this.state.date}
                            selected={this.state.date} 
                            onChange={this.onChangeDate} />
                        </div>
                        
                        <form onSubmit={this.onSubmit}>
                            <button type="submit" className="btn btn-dark">
                                Guardar
                            </button>
                        </form>
                    </div>
                </div>
            
        )
    }
}
