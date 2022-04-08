import React from 'react';
import { css } from "@emotion/core";
import PropagateLoader from "react-spinners/PropagateLoader";

// const override = css`
//   position: 'absolute';
//   left: '50%';
//   top: '50%';
//   z-index: 1;
// `;

export default class Loading extends React.Component{
  constructor(props) {
    super(props);
  }
 
  render() {
    return (
      <div style={{position: 'absolute', left: '50%', top: '50%', zIndex: 1}}>
        <PropagateLoader
          color={"#416994"}
          loading={this.props.loading}
        />
      </div>
    );
  }
}