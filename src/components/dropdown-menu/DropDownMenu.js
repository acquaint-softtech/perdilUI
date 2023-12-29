/**
 * @license
 * Copyright Acquaint softtech. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React, { useState } from 'react';
import { StyledView } from '../../StyledComponentsContstants';

/**
 * A component that wraps the whole dropdown.
 * It provides the necessary context and state for the dropdown.
 */

const DropDownMenu = ({children, visible, dropdownButton, width}) => {
  const [innerMenuVisible, setInnerMenuVisible] = useState('');

  const childrenWithProps = React.Children.map(children, child =>
    React.cloneElement(child, {width, innerMenuVisible, setInnerMenuVisible}),
  );

  return (
    <>
      {dropdownButton}
      {visible && (
        <StyledView className={styles.dropdownMenuContainer}>
          <StyledView className={`${styles.dropdownMenu} w-[${width}px]`}>
            {childrenWithProps}
          </StyledView>
        </StyledView>
      )}
    </>
  );
};

const styles = {
  dropdownMenuContainer: 'items-center',
  dropdownMenu:
    'absolute top-0 z-50 mt-1 bg-white border border-neutral-300 rounded-md shadow-md',
};

export default DropDownMenu;
