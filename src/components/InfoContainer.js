import React from "react";
import "./Items.css";

export default class Items extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items,
            activeCount: 0
        }
    }

    componentDidMount() {
        let count = this.activeCount(this.state.items);
        this.setState({
            items: this.state.items,
            activeCount: count
        })
    }

    componentWillReceiveProps(nextProps) {
        let count = this.activeCount(nextProps.items);
        this.setState({
            items: nextProps.items,
            activeCount: count
        })
    }

    activeCount(itemsArray) {
        let active = itemsArray.filter(value => value.active === false);
        return active.length;
    }

    filterClicked() {
        let items;    
        items = this.this.state.items.map(value => {
            if (this.clicked === 'All') {
                value.display = true;
            } else if (this.clicked === 'Active') {
                if(!value.active) 
                    value.display = true;
                else
                    value.display = false;
            } else if (this.clicked === 'Completed') {
                if(value.active) 
                    value.display = true;
                else
                    value.display = false;
            }
            return value
        })
        this.this.props.updateItems(items)
    }

    render() {
        let {items, activeCount} = this.state;
        return(
            <div className="item-container">
                <div className="active-count-panel"> 
                <div className="count">
                    {activeCount} item(s) left
                </div>
                <div className="filter-buttons" onClick = {this.filterClicked.bind({clicked: 'All', this: this})}> All </div>
                <div className="filter-buttons" onClick = {this.filterClicked.bind({clicked: 'Active', this: this})}> Active </div>
                <div className="filter-buttons" onClick = {this.filterClicked.bind({clicked: 'Completed', this: this})}> Completed </div>
            </div>
            </div>
        )
    }
}