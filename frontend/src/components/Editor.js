import React from 'react';
import { Box, TextArea } from 'grommet';

const Editor = ({ text, onChangeText }) => {
  return (
    <Box
      pad='medium'
      fill='vertical'
      width='40%'
    >
      <TextArea
        placeholder='Start writing your text here!'
        fill
        value={text}
        onChange={event => onChangeText(event.target.value)}
      />
    </Box>
  );
}
 
export default Editor;
