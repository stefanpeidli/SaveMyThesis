import React from 'react';
import { Box, Text } from 'grommet';

import HistoryItem from './HistoryItem';

const History = ({ history, onClickItem }) => {
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
          <HistoryItem
            commitTitle='Current version'
            timestamp={new Date().getTime()}
            author={'You'}
            onClick={() => onClickItem(null)}
          />
          {history.map(({ id, commitTitle, timestamp, author }) => (
            <HistoryItem
              key={id}
              commitTitle={commitTitle}
              timestamp={timestamp}
              author={author}
              onClick={() => onClickItem(id)}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
 
export default History;