/**
 * @license
 * Copyright Acquaint softtech. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React, { useRef } from 'react';
import {
  StyledPressable,
  StyledScrollView,
  StyledText,
  StyledTextInput,
  StyledView,
} from '../../StyledComponentsContstants';

/**
 * A simple code editor component using the Monaco Editor library.
 */

const MonacoEditor = ({value, onChangeText, height}) => {
  const inputRef = useRef(null);
  const lines = value.split('\n');

  return (
    <StyledScrollView className={height && `h-[${height}px]`}>
      <StyledPressable
        onPress={() => inputRef.current?.focus()}
        className={styles.container}>
        <StyledView
          className={`${styles.lineNumberContainer} ${
            lines.length === 1 && 'top-[4px]'
          }`}>
          {lines.map((_, index) => {
            return (
              <StyledView key={index}>
                <StyledText className={styles.lineNumber}>
                  {index + 1}
                </StyledText>
              </StyledView>
            );
          })}
        </StyledView>
        <StyledScrollView horizontal>
          <StyledTextInput
            ref={inputRef}
            autoFocus
            multiline
            value={value}
            className={styles.inputText}
            cursorColor={'white'}
            onChangeText={onChangeText}
          />
        </StyledScrollView>
      </StyledPressable>
    </StyledScrollView>
  );
};

const styles = {
  container: 'flex-row items-start w-full bg-[#0C1021] min-h-[250px] p-3 pl-0',
  lineNumber: 'text-sm font-mono text-white',
  lineNumberContainer: 'min-w-[40px] items-center',
  inputText: 'text-white text-sm font-mono p-0',
};

export default MonacoEditor;
