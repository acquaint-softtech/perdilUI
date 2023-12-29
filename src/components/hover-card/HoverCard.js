/**
 * @license
 * Copyright Acquaint softtech. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import { StyledView } from '../../StyledComponentsContstants';

/**
 * This component can be used to display a hover card.
 * It provides a user-friendly interface to present additional information when the user clicks an element (hover cannot works)
 */

const HoverCard = ({visible, cardComponent, children}) => {
  return (
    <StyledView className={styles.container}>
      {children}
      <StyledView className={styles.hoverCardContainer}>
        {visible && (
          <StyledView className={styles.cardContainer}>
            {cardComponent}
          </StyledView>
        )}
      </StyledView>
    </StyledView>
  );
};

const styles = {
  container: 'w-full',
  hoverCardContainer: 'items-center',
  cardContainer: 'absolute top-0 mt-2 z-30',
};

export default HoverCard;
