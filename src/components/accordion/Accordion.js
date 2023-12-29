/**
 * @license
 * Copyright Acquaint softtech. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React, { useState } from 'react';
import { StyledSafeAreaView, StyledView } from '../../StyledComponentsContstants';

/**
 * A component that wraps the whole accordion.
 * It provides the necessary context and state for the accordion.
 */

const Accordion = ({children}) => {
  const [openedElement, setOpenedElement] = useState(null);

  return (
    <StyledSafeAreaView className={styles.container}>
      {React.Children.map(children, (child, index) => (
        <StyledView
          className={
            React.Children.count(children) !== index + 1 && styles.divider
          }>
          {React.cloneElement(child, {openedElement, setOpenedElement})}
        </StyledView>
      ))}
    </StyledSafeAreaView>
  );
};

const styles = {
  container: 'flex item-center m-3 border border-gray-300 rounded-lg',
  divider: 'border-b border-gray-300',
};

export default Accordion;
