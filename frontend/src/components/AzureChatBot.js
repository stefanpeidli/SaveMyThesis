import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';

class SimpleForm extends Component {
  render() {
    return (
      <ChatBot
        floating
        steps={[
          {
            id: '1',
            message: 'What are you searching for?',
            trigger: '2',
          },
          {
            id: '2',
            user: true,
            trigger: '3',
          },
          {
            id: '3',
            message: "I saw that you started about Katie Bouman in: \n Section about 'computer program', 'breakthrough image possible', 'Katie Bouman'",
            end: true,
          },
        ]}
      />
    );
  }
}

export default SimpleForm