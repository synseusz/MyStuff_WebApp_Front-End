import React, { Component } from 'react';
import './Add.css';
import CallAPI from '../../CallAPI';


class AddAdvert extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            categoryValue: '',
            conditionValue: '',
            price: '',
            city: '',
            description: '',
            photo: null,
    
        }

        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleCategoryChange = this.handleCategoryChange.bind(this)
        this.handleConditionChange = this.handleConditionChange.bind(this)
        this.handlePriceChange = this.handlePriceChange.bind(this)
        this.handleCityChange = this.handleCityChange.bind(this)
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
        this.handleFileChange = this.handleFileChange.bind(this)
        this.onClick = this.onClick.bind(this)
    }

    handleTitleChange(e) {
        this.setState({ title: e.target.value })
    }
    handleCategoryChange(e) {
        this.setState({ categoryValue: e.target.value })
    }
    handleConditionChange(e) {
        this.setState({ conditionValue: e.target.value })
    }
    handlePriceChange(e) {
        this.setState({ price: e.target.value })
    }
    handleCityChange(e) {
        this.setState({ city: e.target.value })
    }
    handleDescriptionChange(e) {
        this.setState({ description: e.target.value })
    }
    handleFileChange(e) {
        this.setState({ photo: e.target.files[0] })
    }
    onClick() {
        //author will be the currently logged in user
        const author = localStorage.getItem("MyStuffLogin")

        const fd = new FormData()
        fd.append("author", author)
        fd.append('askingPrice', this.state.price)

        if (this.state.title===''){
            console.log("Please provide a title")
            this.setState({title: "errorMsg"})
        }else{fd.append('title', this.state.title)}

        if (this.state.description===''){
            console.log("Please provide a description")
            this.setState({description: "errorMsg"})
        }else {fd.append('description', this.state.description)}
        
        if(!this.state.photo) {
            console.log("Please upload photo")
            this.setState({photo: "errorMsg"})
        }else{fd.append('photo', this.state.photo, this.state.photo.name)}

        if(this.state.categoryValue === ''){
            console.log("Please provide a category")
            this.setState({categoryValue: "errorMsg"})
        }else{fd.append('category', this.state.categoryValue)}

        if(this.state.conditionValue === ''){
            console.log("Please set the condition of your item")
            this.setState({conditionValue: "errorMsg"})
        }else{fd.append('ItemCondition', this.state.conditionValue)}

        if(this.state.city===''){
            console.log("Please provide a city")
            this.setState({city: "errorMsg"})
        }else{fd.append('city', this.state.city)}
        

        new CallAPI().addAdvert(fd)
        .then(res =>{
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }

    render() {

        return (

            <form className="addAdvertForm">
                <div className="form-group">
                    <label htmlFor="title"><b>Title:</b></label>
                    {this.state.title === "errorMsg" ?<span style={{float: "right", color: "red"}}>Please provide an advert title!</span>: null}
                    <input type="text" onChange={this.handleTitleChange} className="form-control" id="title" name="title" placeholder="Title" required/>
                </div>

                <div className="form-group">
                    <label htmlFor="category"><b>Category:</b></label>
                    {this.state.categoryValue === "errorMsg" ?<span style={{float: "right", color: "red"}}>Please choose an advert category!</span>: null}
                    <select id="category" onChange={this.handleCategoryChange} required >
                        <option>Select</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Books">Books</option>
                        <option value="Vehicles">Vehicles</option>
                        <option value="Clothes">Clothes</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="ItemCondition"><b>Condition:</b></label>
                    {this.state.conditionValue === "errorMsg" ?<span style={{float: "right", color: "red"}}>Please choose item condition!</span>: null}
                    <select id="ItemCondition" onChange={this.handleConditionChange} required >
                        <option>Select</option>
                        <option value="Brand&nbsp;new">Brand new</option>
                        <option value="Manufacturer&nbsp;refurbished">Manufacturer refurbished</option>
                        <option value="Slightly&nbsp;used">Slightly used</option>
                        <option value="Used">Used</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="price"><b>Price (£):</b></label>
                    <input type="number" onChange={this.handlePriceChange} placeholder="0" min="0" step="1" data-number-to-fixed="2" data-number-stepfactor="100" className="price" id="askingPrice" required />
                </div>

                <div className="form-group">
                    <label htmlFor="city"><b>City:</b></label>
                    {this.state.city === "errorMsg" ?<span style={{float: "right", color: "red"}}>Please provide a city where available!</span>: null}
                    <input type="text" onChange={this.handleCityChange} className="form-control" id="city" name="city" placeholder="City" required />
                </div>

                <div className="form-group">
                    <label htmlFor="description"><b>Description:</b></label>
                    {this.state.description === "errorMsg" ?<span style={{float: "right", color: "red"}}>Please provide a description of item!</span>: null}
                    <textarea className="form-control" onChange={this.handleDescriptionChange} type="textarea" id="description" placeholder="Description" maxLength="2000" rows="7"></textarea>
                </div>

                <div>
                    <label htmlFor="photo"><b>Add image:</b></label>
                    {this.state.photo === "errorMsg" ?<span style={{float: "right", color: "red"}}>Please provide a photo!</span>: null}<br />
                    <input type="file" onChange={this.handleFileChange} id="photo" name="photo" required />
                </div>

                <button type="button" id="submit" name="submit" onClick={this.onClick} className="btn">Add Advert</button>
            </form>

        )
    }
}
export default AddAdvert;