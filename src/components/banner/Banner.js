/**
 * @license
 * Copyright Acquaint softtech. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import { Platform, UIManager } from 'react-native';
import {
  StyledImage,
  StyledSafeAreaView,
  StyledText,
  StyledTouchableOpacity,
  StyledView,
} from '../../StyledComponentsContstants';
import Images from '../../assets/Images';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

/**
 * This component is designed to draw the user's attention and guide them towards a specific action.
 * It remains fixed at the top of the page, ensuring visibility regardless of the user's scroll position.
 */

const Banner = ({
  heading = 'Heading of banner',
  headingImage,
  message = 'Message of banner',
  onPressBanner,
  visible,
  onPressClose,
}) => {
  return (
    <StyledSafeAreaView
      className={`${!visible && 'hidden'} ${styles.container}`}>
      <StyledView className={styles.bannerContainer}>
        <StyledTouchableOpacity
          onPress={onPressBanner}
          className={styles.bannerButton}>
          <StyledView className={styles.bannerHeadingContainer}>
            {React.isValidElement(headingImage)
              ? headingImage
              : headingImage && (
                  <StyledImage
                    source={headingImage}
                    className={styles.bannerHeadingImage}
                  />
                )}
            <StyledText className={styles.bannerHeadingText}>
              {heading}
            </StyledText>
          </StyledView>
          <StyledText className={styles.bannerMessage}>{message}</StyledText>
        </StyledTouchableOpacity>
        <StyledTouchableOpacity
          onPress={onPressClose}
          className={styles.cancelButton}>
          <StyledImage source={Images.cancel} className={styles.cancelImage} />
        </StyledTouchableOpacity>
      </StyledView>
    </StyledSafeAreaView>
  );
};

const styles = {
  container:
    'z-50 absolute fixed top-0 left-0 w-full h-auto duration-300 ease-out shadow-sm',
  bannerContainer:
    'flex flex-row w-full items-center bg-white justify-between p-3 mx-auto',
  bannerButton: 'text-black',
  bannerHeadingContainer: 'flex flex-row items-center space-x-1',
  bannerHeadingImage: 'w-4 h-4 mr-1',
  bannerHeadingText: 'text-black font-semibold',
  bannerMessage: 'text-black block pt-1 leading-none',
  cancelButton: 'flex flex-row items-center justify-center w-6 h-6 p-1.5',
  cancelImage: 'w-3 h-3',
};

export default Banner;
