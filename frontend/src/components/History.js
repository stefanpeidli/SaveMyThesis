import React from 'react';
import { Box, Text } from 'grommet';

import HistoryItem from './HistoryItem';
import AzureChatBot from './AzureChatBot';

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
        overflow={{ vertical: 'scroll' }}
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
          {history.map(({ _id, commitTitle, timestamp, author }) => (
            <HistoryItem
              key={_id}
              commitTitle={commitTitle}
              timestamp={timestamp}
              author={author}
              onClick={() => onClickItem(_id)}
            />
          ))}
        </Box>
      </Box>
      <AzureChatBot />
    </Box>
  );
}
 
export default History;