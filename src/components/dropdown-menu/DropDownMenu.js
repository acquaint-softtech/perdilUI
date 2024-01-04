/**
 * @license
 * Copyright Acquaint softtech. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React, { useState } from 'react';
import { StyledPressable, StyledView } from '../../StyledComponentsContstants';
import { Platform } from 'react-native';

/**
 * A component that wraps the whole dropdown.
 * It provides the necessary context and state for the dropdown.
 */

const DropDownMenu = ({children, visible, dropdownButton, width, onDismiss}) => {
  const [innerMenuVisible, setInnerMenuVisible] = useState('');

  const childrenWithProps = React.Children.map(children, child =>
    React.cloneElement(child, {width, innerMenuVisible, setInnerMenuVisible}),
  );

  const onBackdropPress = () => {
    if (onDismiss) {
      onDismiss();
    }
    setInnerMenuVisible('');
  };

  return (
    <>
      {visible && (
        <StyledPressable
          onPress={onBackdropPress}
          className="absolute h-full w-full"
        />
      )}
      <StyledView className={Platform.OS === 'android' ? '-shadow' : '-z-[999]'}>
        {dropdownButton}
      </StyledView>
      {visible && (
        <StyledView>
          <StyledView className={`${styles.dropdownMenu} w-[${width}px]`}>
            {childrenWithProps}
          </StyledView>
        </StyledView>
      )}
    </>
  );
};

const styles = {
  dropdownMenu:
    'absolute z-[999] min-w-[8rem] self-center top-0 z-50 mt-1 bg-white border border-neutral-300 rounded-md shadow-md w-60',
};

export default DropDownMenu;
