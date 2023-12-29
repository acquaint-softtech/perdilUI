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
import Images from '../../assets/Images';

/**
 * This component represents an individual item within the context menu.
 * It should be used within the `ContextMenuSection` component.
 */

const ContextMenuItem = ({
  title = 'Context menu item title',
  disabled = false,
  defaultSelected,
  onPressItem,
  containerClass = '',
  titleClassName = '',
  rightSideIcon,
  innerMenu,
  ...contextMenuSectionProps
}) => {
  const [selectedItem, setSelectedItem] = useState(defaultSelected || false);
  const [size, setSize] = useState({
    height: 0,
    width: 0,
  });

  const onPress = e => {
    if (onPressItem) {
      onPressItem({...e, title: title});
    }
    if (innerMenu) {
      contextMenuSectionProps?.setInnerMenuVisible(
        contextMenuSectionProps?.innerMenuVisible === title ? null : title,
      );
    }
    if (contextMenuSectionProps?.multipleSelection) {
      contextMenuSectionProps?.selection && setSelectedItem(!selectedItem);
    } else {
      contextMenuSectionProps?.selection &&
        contextMenuSectionProps?.setSelected(
          contextMenuSectionProps?.selected === title ? null : title,
        );
    }
  };

  return (
    <StyledTouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      disabled={disabled}
      onLayout={e =>
        setSize({
          height: e.nativeEvent.layout.height,
          width: e.nativeEvent.layout.width,
        })
      }
      className={`${styles.contextMenuItemContainer} ${containerClass} ${
        disabled && 'opacity-50'
      }`}>
      <>
        {contextMenuSectionProps?.multipleSelection
          ? contextMenuSectionProps?.selection &&
            selectedItem && (
              <StyledImage source={Images.right} className={styles.rightIcon} />
            )
          : contextMenuSectionProps?.selection &&
            contextMenuSectionProps?.selected === title && (
              <StyledImage source={Images.dot} className={styles.dotIcon} />
            )}
        <StyledText
          className={`${styles.contextMenuItemTitle} ${titleClassName}`}>
          {title}
        </StyledText>
      </>
      {rightSideIcon && rightSideIcon}
      {contextMenuSectionProps?.innerMenuVisible === title && (
        <StyledView
          className={`${styles.innerMenuContainer} w-[${size?.width}px] left-[${
            contextMenuSectionProps?.width || size?.width
          }px]`}>
          {innerMenu}
        </StyledView>
      )}
    </StyledTouchableOpacity>
  );
};

const styles = {
  contextMenuItemContainer:
    'flex-row items-center justify-between rounded px-2 py-1.5 pl-8',
  contextMenuItemTitle: 'text-black',
  rightIcon: 'absolute left-2 flex h-3.5 w-3.5 items-center justify-center',
  dotIcon: 'absolute left-2 flex h-2 w-2 items-center justify-center',
  innerMenuContainer:
    'absolute z-50 min-w-[8rem] text-neutral-800 rounded-md border border-neutral-200/70 bg-white text-base shadow-md top-0',
};

export default ContextMenuItem;
