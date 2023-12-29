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
 * A provider component for the navigation menu.
 */

const NavigationMenuProvider = ({children, containerWidth}) => {
  const [selectedItem, setSelectedItem] = useState('');

  const childrenWithProps = React.Children.map(children, child =>
    React.cloneElement(child, {selectedItem, setSelectedItem}),
  );

  return (
    <StyledView className={styles.container}>
      <StyledView className={styles.headerContainer}>
        <StyledView className={`${styles.header} w-[${containerWidth}px]`}>
          <StyledView className={styles.headerTitleContainer}>
            {React.Children.map(children, child => {
              const title = child?.props?.title ?? 'Navigation Title';
              return (
                <StyledView className="items-center">
                  <StyledTouchableOpacity
                    onPress={() =>
                      setSelectedItem(prevVal =>
                        prevVal === title ? '' : title,
                      )
                    }
                    className={styles.menuBarButton}>
                    <StyledText className={styles.headerTitleText}>
                      {title}
                    </StyledText>
                    {React.Children.count(child?.props?.children) !== 0 && (
                      <StyledImage
                        source={Images.downArrow}
                        className={`w-3 h-3 ${
                          selectedItem === title && 'rotate-180'
                        }`}
                      />
                    )}
                  </StyledTouchableOpacity>
                  {selectedItem === title && childrenWithProps}
                </StyledView>
              );
            })}
          </StyledView>
        </StyledView>
      </StyledView>
    </StyledView>
  );
};

const styles = {
  container: 'relative top-0 left-0 z-50',
  headerContainer: 'relative top-0 left-0 z-40 w-full min-h-12 h-12',
  header: 'h-full p-2 bg-white border rounded-md border-neutral-200/80',
  headerTitleContainer: 'flex-row justify-between h-full',
  menuBarButton:
    'rounded flex-row items-center justify-center px-3 py-1.5 h-full space-x-2',
  headerTitleText: 'leading-tight text-sm text-neutral-900',
};

export default NavigationMenuProvider;
