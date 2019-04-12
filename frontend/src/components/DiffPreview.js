import React, { useEffect, useState } from 'react';
import { Box, Heading, Paragraph, Meter } from 'grommet';
import ReactDiffViewer from 'react-diff-viewer';
import ReactLoading from 'react-loading';

const mockVersion = {
  commitTitle: 'Add hello world!',
  commitText: 'Add new paragraph with hello world. Bla bla.',
  oldText: 'I am OLD',
  newText: 'I am NEW'
}

const DiffPreview = ({ versionId }) => {
  const [ fetching, setFetching ] = useState(true)
  const [ version, setVersion ] = useState({
    commitText: '',
    commitTitle: '',
    oldText: '',
    newText: ''
  })

  useEffect(() => {
    setTimeout(() => {
      // Mock http request
      setVersion(mockVersion)
      setFetching(false)
    }, 2000)
  })

  return (
    <Box
      pad='medium'
      fill='vertical'
      width='80%'
    >
      {fetching ? (
        <Box
          justify='center'
          align='center'
          direction='row'
          fill
        >
          <ReactLoading
            type='spin'
            color='#7D4CDB'
            height='150px'
            width='150px'
          />
        </Box>
      ) : (
        <Box
          border='all'
          fill='vertical'
          pad='medium'
          overflow='scroll'
        >
          <Heading level={3}>
            {`v${versionId} - ${version.commitTitle}`}
          </Heading>
          <Paragraph>{version.commitText}</Paragraph>
          <ReactDiffViewer
            oldValue={version.oldText}
            newValue={version.newText}
          />
        </Box>
      )}
    </Box>
  );
}
 
export default DiffPreview;