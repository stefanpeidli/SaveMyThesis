import React from 'react';
import { Box, Text } from 'grommet';

import HistoryItem from './HistoryItem';

const History = ({ history }) => {
  return (
    <Box
      pad='medium'
      fill='vertical'
      width='20%'
    >
      <Box
        fill='vertical'
        pad='medium'
        elevation='medium'
      >
        <Text color='brand' weight='bold'>
          History
        </Text>
        <Box pad={{ vertical: 'small' }}>
          {history.map(({ id, commitTitle, timestamp, author }) => (
            <HistoryItem
              key={id}
              commitTitle={commitTitle}
              timestamp={timestamp}
              author={author}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
 
export default History;