/**
 * @license
 * Copyright Acquaint softtech. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React, { useState } from 'react';
import {
  StyledImage,
  StyledText,
  StyledTouchableOpacity,
  StyledView,
} from '../../StyledComponentsContstants';

/**
 * A component for adding items to the dropdown menu.
 * It should be used within a `DropDownMenuSection`.
 */

const DropDownMenuItem = ({
  title = 'Dropdown menu item title',
  onPress,
  leftIcon,
  rightIcon,
  titleClassName = '',
  disabled = false,
  innerMenu,
  ...dropdownSectionProps
}) => {
  const [size, setSize] = useState({
    height: 0,
    width: 0,
  });

  const handlePress = e => {
    if (innerMenu) {
      dropdownSectionProps?.setInnerMenuVisible(
        dropdownSectionProps?.innerMenuVisible === title ? null : title,
      );
    }
    if (onPress) {
      onPress(e);
    }
  };

  return (
    <StyledTouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      onLayout={e =>
        setSize({
          height: Math.round(e.nativeEvent.layout.height).toString(),
          width: Math.round(e.nativeEvent.layout.width).toString(),
        })
      }
      className={`${styles.container} ${disabled && 'opacity-50'}`}>
      <StyledView className={styles.leftIconContainer}>
        {React.isValidElement(leftIcon)
          ? leftIcon
          : leftIcon && (
              <StyledImage source={leftIcon} className={styles.icon} />
            )}
        <StyledText className={`${styles.title} ${titleClassName}`}>
          {title}
        </StyledText>
      </StyledView>
      {React.isValidElement(rightIcon)
          ? rightIcon
          : rightIcon && (
              <StyledImage source={rightIcon} className={styles.icon} />
            )}
      {dropdownSectionProps?.innerMenuVisible === title && (
        <StyledView
          className={`${styles.innerMenuContainer} w-[${size?.width}px] left-[${
            dropdownSectionProps?.width || size?.width
          }px] top-0 `}>
          {innerMenu}
        </StyledView>
      )}
    </StyledTouchableOpacity>
  );
};

const styles = {
  container:
    'flex-row justify-between cursor-default items-center rounded px-2 py-1.5 text-sm outline-none transition-colors',
  leftIconContainer: 'flex-row items-center space-x-2 px-2',
  title: 'text-neutral-700 text-base',
  innerMenuContainer:
    'absolute z-50 text-neutral-800 rounded-md border border-neutral-200/70 bg-white text-base shadow-md',
  icon: 'w-4 h-4',
};

export default DropDownMenuItem;
