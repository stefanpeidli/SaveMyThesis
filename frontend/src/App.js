import React, { Component } from 'react';
import { Box, Keyboard } from 'grommet';

import Header from './components/Header';
import Editor from './components/Editor';
import Preview from './components/Preview';
import DiffPreview from './components/DiffPreview';
import History from './components/History';

<<<<<<< 5079b021665295e43453e280d2e6807b7e0f8d7c
import { postVersion, fetchHistory } from './services/versionService';
=======
import VersionFinderChatBot from './components/VersionFinderChatBot';

import ChatBot from 'react-simple-chatbot';

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
>>>>>>> Chatbot integration

class App extends Component {
  state = {
    text: '',
    activeVersionId: null,
    previousVersionId: null,
    history: []
  }

  async componentDidMount() {
    const history = await fetchHistory()
    this.setState({ history })
  }

  handleEditorTextChange = editedText => {
    this.setState({ text: editedText })
  }

  handleClickHistoryItem = clickedId => {
    const clickedVersionIndex = this.state.history.findIndex(
      ({ _id }) => _id === clickedId
    )
    if (clickedVersionIndex === this.state.history.length - 1) {
      this.setState({
        activeVersionId: clickedId,
        previousVersionId: clickedId
      })
    } else {
      this.setState({
        activeVersionId: clickedId,
        previousVersionId: this.state.history[clickedVersionIndex + 1]._id
      })
    }
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
            {this.state.activeVersionId ? (
              <DiffPreview
                versionId={this.state.activeVersionId}
                previousVersionId={this.state.previousVersionId}
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
              history={this.state.history}
              onClickItem={this.handleClickHistoryItem}
              />
              <VersionFinderChatBot
              />
          </Box>
        </Box>
      </Keyboard>
    );
  }
}

export default App;
