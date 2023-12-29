import React, { useState } from 'react';
import MonacoEditor from './MonacoEditor';

const MonacoEditorView = () => {
  const [content, setContent] = useState('');

  return (
    <MonacoEditor
      height={100}
      value={content}
      onChangeText={text => setContent(text)}
    />
  );
};

export default MonacoEditorView;
