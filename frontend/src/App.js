import React, { Component } from 'react';
import { Box } from 'grommet';

import Header from './components/Header';
import Editor from './components/Editor';
import Preview from './components/Preview';
import History from './components/History';

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
          <History />
        </Box>
      </Box>
    );
  }
}

export default App;
