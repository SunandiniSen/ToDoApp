import React from "react";
import "./Items.css";

export default class Items extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items,
            activeCount: 0,
            activeFilter: 'All'
        }
    }

    componentDidMount() {
        let count = this.activeCount(this.state.items);
        this.setState({
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

    filterClicked(Obj) {
        let items;    
        items = this.state.items.map(value => {
            if (Obj.clicked === 'All') {
                value.display = true;
            } else if (Obj.clicked === 'Active') {
                if(!value.active) 
                    value.display = true;
                else
                    value.display = false;
            } else if (Obj.clicked === 'Completed') {
                if(value.active) 
                    value.display = true;
                else
                    value.display = false;
            }
            return value
        })

        this.setState({
            activeFilter: Obj.clicked
        })
        this.props.updateItems(items)
    }

    clearCompletedItems() {
        this.setState({
            items: this.state.items.filter(item => item.active === false)
        }, this.updateParent)
    }

    updateParent() {
        this.props.updateItems(this.state.items);
    }

    render() {
        let { activeCount, activeFilter, items } = this.state;
        return(
            <div className="item-container">
                <div className="active-count-panel"> 
                <div className="count">
                    {activeCount} item(s) left
                </div>
                <div className={activeFilter === "All" ? "filter-buttons filter-clicked" : "filter-buttons"} onClick = {(e) => this.filterClicked({clicked: 'All'})}> All </div>
                <div className={activeFilter === "Active" ? "filter-buttons filter-clicked" : "filter-buttons"} onClick = {(e) => this.filterClicked({clicked: 'Active'})}> Active </div>
                <div className={activeFilter === "Completed" ? "filter-buttons filter-clicked" : "filter-buttons"} onClick = {(e) => this.filterClicked({clicked: 'Completed'})}> Completed </div>
                {activeCount !== items.length && <div className={"clear-completed"} onClick = {(e) => this.clearCompletedItems()}> Clear Completed </div>}
            </div>
            </div>
        )
    }
}