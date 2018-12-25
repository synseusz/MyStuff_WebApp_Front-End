import React, { Component } from 'react';
import './Add.css';
import CallAPI from '../../CallAPI';


class AddAdvert extends Component {

    constructor(props) {
        super(props);

        this.state = {
          title:'',
          description:'',
          photo: null
        }
        
        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
        this.handleFileChange = this.handleFileChange.bind(this)
        this.onClick = this.onClick.bind(this)
    }

    handleTitleChange(e){
        this.setState({title:e.target.value})
    }
    handleDescriptionChange(e){
        this.setState({description:e.target.value})
    }
    handleFileChange(e){
        this.setState({photo:e.target.files[0]})
    }
    onClick(){
        const fd = new FormData()
        fd.append('title', this.state.title)
        fd.append('description', this.state.description)
        fd.append('photo', this.state.photo, this.state.photo.name)
        
        new CallAPI().addAdvert(fd)

    }

    render() {

        return (

            <form>
            <br styles="clear:both" />
              <div className="form-group">
                <input type="text" onChange={this.handleTitleChange} className="form-control" id="title" name="title" placeholder="Title" required />
              </div>
              
              <div className="form-group">
              <textarea className="form-control" onChange={this.handleDescriptionChange} type="textarea" id="description" placeholder="Description" maxLength="140" rows="7"></textarea>
              </div>

              <div>
                  <input type="file" onChange={this.handleFileChange} id="photo" name="photo" />
              </div>
                 
            <button type="button" id="submit" name="submit" onClick={this.onClick} className="btn btn-primary pull-right">Add Advert</button>
            </form>

        )
    }
}
export default AddAdvert;