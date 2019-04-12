import React, { Component } from 'react';
import { Box } from 'grommet';

import Header from './components/Header';
import Editor from './components/Editor';
import Preview from './components/Preview';
import DiffPreview from './components/DiffPreview';
import History from './components/History';


const mockHistory = [
  {
    id: 1,
    commitTitle: 'Add paragraph about dogs',
    timestamp: 1555083960769,
    author: 'Dong-Ha Kim'
  },
  {
    id: 2,
    commitTitle: 'Change paragraph about cats',
    timestamp: 1555083960769,
    author: 'Dong-Ha Kim'
  },
  {
    id: 3,
    commitTitle: 'Remove errors',
    timestamp: 1555083960769,
    author: 'Dong-Ha Kim'
  }
]

class App extends Component {
  state = {
    text: '',
    activeVersion: null
  }

  handleEditorTextChange = editedText => {
    this.setState({ text: editedText })
  }

  handleClickHistoryItem = id => {
    this.setState({ activeVersion: id })
  }

  render() {
    return (
      <Box>
        <Header />
        <Box direction='row' fill='vertical'>
          {this.state.activeVersion ? (
            <DiffPreview
              oldText={'I am the previous text!'}
              newText={'I am the new text!'}
              versionId={this.state.activeVersion}
            />
          ) : (
            <React.Fragment>
              <Editor
                text={this.state.text}
                onChangeText={this.handleEditorTextChange}
              />
              <Preview rawText={this.state.text} />
            </React.Fragment>
          )}
          <History
            history={mockHistory}
            onClickItem={this.handleClickHistoryItem}
          />
        </Box>
      </Box>
    );
  }
}

export default App;
