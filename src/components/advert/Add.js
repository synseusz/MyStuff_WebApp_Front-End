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
            photo: null
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
        this.setState({ categoryValue: e.target.value})
    }
    handleConditionChange(e) {
        this.setState({ conditionValue: e.target.value})
    }
    handlePriceChange(e) {
        this.setState({ price: e.target.value})
    }
    handleCityChange(e) {
        this.setState({ city: e.target.value})
    }
    handleDescriptionChange(e) {
        this.setState({ description: e.target.value })
    }
    handleFileChange(e) {
        this.setState({ photo: e.target.files[0] })
    }
    onClick(e) {
        e.preventDefault();

        const fd = new FormData()
        fd.append('title', this.state.title)
        fd.append('description', this.state.description)
        fd.append('photo', this.state.photo, this.state.photo.name)
        fd.append('category', this.state.categoryValue)
        fd.append('ItemCondition', this.state.conditionValue)
        fd.append('askingPrice', this.state.price)
        fd.append('city', this.state.city)

        new CallAPI().addAdvert(fd)

    }

    render() {

        return (

            <form>
                <br styles="clear:both" />
                <div className="form-group">
                    <label htmlFor="title"><b>Title</b></label>
                    <input type="text" onChange={this.handleTitleChange} className="form-control" id="title" name="title" placeholder="Title" />
                </div>

                <div className="form-group">
                    <label htmlFor="category"><b>Category</b></label>
                    <select id="category"  onChange={this.handleCategoryChange}>
                        <option>Select</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Books">Books</option>
                        <option value="Vehicles">Vehicles</option>
                        <option value="Clothes">Clothes</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="ItemCondition"><b>Item Condition</b></label>
                    <select id="ItemCondition"  onChange={this.handleConditionChange}>
                        <option>Select</option>
                        <option value="Brand&nbsp;new">Brand new</option>
                        <option value="Manufacturer&nbsp;refurbished">Manufacturer refurbished</option>
                        <option value="Slightly&nbsp;used">Slightly used</option>
                        <option value="Used">Used</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="price"><b>Price (£)</b></label>
                    <input type="number" onChange={this.handlePriceChange} placeholder="0" min="0" step="1" data-number-to-fixed="2" data-number-stepfactor="100" className="price" id="askingPrice" />
                </div>

                <div className="form-group">
                    <label htmlFor="city"><b>City</b></label>
                    <input type="text" onChange={this.handleCityChange} className="form-control" id="city" name="city" placeholder="City" />
                </div>

                <div className="form-group">
                    <label htmlFor="description"><b>Description</b></label>
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