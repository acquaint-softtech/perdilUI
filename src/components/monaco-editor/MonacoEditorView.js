import React, {useState} from 'react';
import MonacoEditor from './MonacoEditor';
import { StyledSafeAreaView } from 'perdil-ui/src/StyledComponentsContstants';

const MonacoEditorView = () => {
  const [content, setContent] = useState('');

  return (
    <StyledSafeAreaView className='flex-1'>
      <MonacoEditor value={content} onChangeText={text => setContent(text)} />
    </StyledSafeAreaView>
  );
};

export default MonacoEditorView;
