import React from "react";
import "./Items.css";

export default class Items extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items
        }
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.items) !== JSON.stringify(nextProps.items)) {
            this.setState({
                items: nextProps.items
            })
        }
    }

    checked(event) {
        let index = parseInt(event.target.attributes.value.nodeValue, 10);
        this.setState({
            items: this.state.items.map((value, ind) => {
                if (ind === index) {
                    value.active = !value.active
                }
                return value;
            })
        }, this.updateParent)
    }

    updateParent() {
        this.props.updateItems(this.state.items);
    }

    cancel(index) {
        this.setState(prevState => {
            prevState.items.splice(index, 1);
        }, this.updateParent)
    }

    render() {
        return(
            <div className="item-container">
                {
                    this.state.items.map((item, index) => {
                        return(
                            <div className={item.display ? "inner-container" : "hide"} key={`item${index}`}>
                                <div className="check-container" > 
                                    <div className={item.active ? "check active" : "check"} onClick={(e) => this.checked(e)} value={index}>
                                        {item.active && <div className="tick" value={index}>L</div>}
                                    </div>
                                </div>
                                <div className={!item.active ? "item" : "item over"} >{item.val}
                                    <span className="cancel" onClick={(e) => this.cancel(index)}>X</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}