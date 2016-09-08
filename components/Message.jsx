import React from 'react'
import * as emoji from 'node-emoji';

const Message = React.createClass({
  propTypes: {
    message: React.PropTypes.object
  },

  render() {
    const{key, name, message} = this.props.message;
    const emojifiedString = emoji.emojify(message);

    return <p key={key}>{name}: {emojifiedString}</p>;
  }
});

export default Message;
