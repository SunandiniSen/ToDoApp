import React from "react";
/**
 * @summary main UI Component of this app
 */
export default class App extends React.Component {
  /**
   * Render method
   * @return {Object} JSX
   */
  render() {
    return <div className="ReactApp"> {this.props.children} </div>;
  }
}
