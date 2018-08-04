import React from "react";
import ItemList from "./Items";
import InfoContainer from "./InfoContainer";
import "./ToDo.css";


export default class ToDo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            selectAll: false
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

    keyPress(e) {
        if (e.charCode === 13 && this.refs.inputBox.value && this.refs.inputBox.value.trim().length > 0) {
            this.addItem(e)
        }
    }

    updateItems(itemList) {
        this.setState({
            items: itemList
        })
    }

    selectAll() {
        this.setState({
            items: this.state.items.map(item => {
                item.active = !this.state.selectAll;
                return item;
            }),
            selectAll: !this.state.selectAll
        })
    }

    render() {
        let { items } = this.state;
        return(
            <div className="to-do"> 
                <div className="title-bar"> to-dos </div>
                <div className="input-box-container">
                    {items.length > 0 && <span className="select-all" onClick={(e) => this.selectAll(e)}></span>}
                    <input className="input-box" ref="inputBox" placeholder="What needs to be done ?" onKeyPress={(e) => this.keyPress(e)}/> 
                    <span className="check-button" role="img" aria-label="Plus" onClick={(e) => this.addItem(e)}> &#x2795; </span>
                </div>
                <ItemList items={items} updateItems={(items) => this.updateItems(items)}/>
                {items.length > 0 && <InfoContainer items={items} updateItems={(items) => this.updateItems(items)}/>}
            </div>
        )
    }
}