import React from 'react';
import { Box, Markdown } from 'grommet';

const Preview = ({ rawText }) => {
  return (
    <Box
      pad='medium'
      fill='vertical'
      width='40%'
    >
      <Box
        border='all'
        fill='vertical'
        pad='medium'
        overflow={{ vertical: 'scroll' }}
      >
        <Markdown>
          {rawText}
        </Markdown>
      </Box>
    </Box>
  );
}
 
export default Preview;