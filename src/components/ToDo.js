import React from "react";
import ItemList from "./Items";
import InfoContainer from "./InfoContainer";
import "./ToDo.css";


export default class ToDo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }

    addItem(event) {
        let newItem = {
            val: this.refs.inputBox.value, 
            active: false,
            display: true
        };
        this.refs.inputBox.value = '';
        this.setState(prevState => ({
            items: [...prevState.items, newItem]
        }))
    }

    updateItems(itemList) {
        this.setState({
            items: itemList
        })
    }

    render() {
        let { items } = this.state;
        return(
            <div className="to-do"> 
                <div className="title-bar"> to-dos </div>
                <div className="input-box-container">
                    <input className="input-box" ref="inputBox" placeholder="What needs to be done ?" /> 
                    <span className="check-button" onClick={(e) => this.addItem(e)}> &#x2795; </span>
                </div>
                <ItemList items={items} updateItems={(items) => this.updateItems(items)}/>
                {items.length > 0 && <InfoContainer items={items} updateItems={(items) => this.updateItems(items)}/>}
            </div>
        )
    }
}