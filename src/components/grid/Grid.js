import React, { Component } from 'react';

import './Grid.css';
import Advert from '../advert/Advert';

class Grid extends Component {
  

    GridRow(adverts, id){
         
        //if null recieved for adverts return to avoid runtime errors
         if(adverts == null){
            return null;
        }
    
        //if the total elements did not fill the whole grid

		let fillEmptySpace;
		
        let colUnit = parseInt(this.props.colClass.substr(-1));

        let colClassType = this.props.colClass.substr(0, this.props.colClass.length - 1);

        if(this.props.rowLength * colUnit < 12){
            
            let centerSpace = Math.floor((12 - (this.props.rowLength * colUnit)) / 2);
            let colClass_temp = colClassType + centerSpace;
            fillEmptySpace = (<div className={colClass_temp}>&nbsp;</div>);
            
        }
        else{
            fillEmptySpace = null;
        }

        return (
            <div className="row" key={id}>
                {fillEmptySpace}
                {adverts.map((advert, index) =>
                    <div className={this.props.colClass} key={advert.id}>
                        <Advert   image={advert.photo} 
                                title={advert.title} 
                                description={advert.description} 
                                onClick = {this.props.onClick}
                                id ={advert.id}
                        />
                    </div>
                )}  
            </div>
        );
    }

    render() {

        console.log("Current adverts displayed: " + this.props.adverts.length);

        if(this.props.adverts == null){
            return null;
        }

        var allRows = [];
        //total length of adverts
        var len = this.props.adverts.length;
        //total number of rows
        var totalRows = len / this.props.rowLength;
        //how many rows we ve got so far
        var countRows = 0;

        while(countRows < totalRows){
            
            let newRow = [];

            for (var i = 0; i < this.props.rowLength; i++){
                
                let currentIndex = i + (countRows * this.props.rowLength);
                
                if(currentIndex < len)
                    newRow.push(this.props.adverts[currentIndex]);
               
            }
            //increment the rows counter
            countRows++;
            allRows.push( this.GridRow(newRow, countRows) );
        }
    
        return (
            <div>
                {allRows} 
            </div>
        );
    }
}
export default Grid;