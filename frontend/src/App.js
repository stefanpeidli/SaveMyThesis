import React, { Component } from 'react';
import { Box } from 'grommet';

import Header from './components/Header';
import Editor from './components/Editor';
import Preview from './components/Preview';
import History from './components/History';


const mockHistory = [
  {
    id: 0,
    commitTitle: 'Add paragraph about dogs',
    timestamp: 1555083960769,
    author: 'Dong-Ha Kim'
  },
  {
    id: 1,
    commitTitle: 'Change paragraph about cats',
    timestamp: 1555083960769,
    author: 'Dong-Ha Kim'
  },
  {
    id: 2,
    commitTitle: 'Remove errors',
    timestamp: 1555083960769,
    author: 'Dong-Ha Kim'
  }
]

class App extends Component {
  state = {
    text: ''
  }

  handleEditorTextChange = editedText => {
    this.setState({ text: editedText })
  }

  render() {
    return (
      <Box>
        <Header />
        <Box direction='row' fill='vertical'>
          <Editor
            text={this.state.text}
            onChangeText={this.handleEditorTextChange}
          />
          <Preview rawText={this.state.text} />
          <History history={mockHistory}  />
        </Box>
      </Box>
    );
  }
}

export default App;
