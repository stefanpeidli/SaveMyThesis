import React, { Component } from 'react';
import { Box, Keyboard } from 'grommet';

import Header from './components/Header';
import Editor from './components/Editor';
import Preview from './components/Preview';
import DiffPreview from './components/DiffPreview';
import History from './components/History';

import { fetchHistory } from './services/historyService';
import { postVersion } from './services/versionService';

class App extends Component {
  state = {
    text: '',
    activeVersion: null,
    history: []
  }

  async componentDidMount() {
    const history = await fetchHistory()
    this.setState({ history })
  }

  handleEditorTextChange = editedText => {
    this.setState({ text: editedText })
  }

  handleClickHistoryItem = id => {
    this.setState({ activeVersion: id })
  }

  postVersion = async () => {
    await postVersion(this.state.text, 'Author')
    setTimeout(async () => {
      const history = await fetchHistory()
      this.setState({ history })
    }, 2000)
  }

  render() {
    return (
      <Keyboard
        onTab={this.postVersion}
        target='document'
      >
        <Box>
          <Header />
          <Box direction='row' fill='vertical'>
            {this.state.activeVersion ? (
              <DiffPreview versionId={this.state.activeVersion} />
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
              history={this.state.history}
              onClickItem={this.handleClickHistoryItem}
              />
          </Box>
        </Box>
      </Keyboard>
    );
  }
}

export default App;
