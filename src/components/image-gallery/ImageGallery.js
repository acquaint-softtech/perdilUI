/**
 * @license
 * Copyright Acquaint softtech. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React, { useState } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import {
  StyledFlatList,
  StyledImage,
  StyledModal,
  StyledPressable,
  StyledSafeAreaView,
  StyledTouchableOpacity,
  StyledView,
} from '../../StyledComponentsContstants';
import Images from '../../assets/Images';

/**
 * This component displays a collection of images in a user-friendly layout.
 */

const ImageGallery = ({images = []}) => {
  const [openedImageIndex, setOpenedImageIndex] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const renderItem = ({item, index}) => {
    const onPressImage = () => {
      setOpenedImageIndex(index);
      setModalVisible(true);
    };

    return (
      <StyledTouchableOpacity onPress={onPressImage}>
        <StyledImage
          source={{uri: item.photo}}
          resizeMode="cover"
          className={styles.previewImage}
        />
      </StyledTouchableOpacity>
    );
  };

  return (
    <StyledSafeAreaView className={`${styles.container}`}>
      <StyledView>
        <StyledFlatList
          data={images}
          renderItem={renderItem}
          numColumns={Math.round(Dimensions.get('window').width / 150)}
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={() => <StyledView className="m-[5px]" />}
          ListHeaderComponent={() => <StyledView className="m-[5px]" />}
          ItemSeparatorComponent={() => <StyledView className="m-[5px]" />}
        />
      </StyledView>

      <StyledModal
        visible={modalVisible}
        transparent={true}
        onDismiss={() => setModalVisible(false)}
        className={styles.modal}>
        <StyledView className={styles.overlay} />
        <ScrollView pagingEnabled horizontal>
          {images.map((image, index) => {
            return (
              openedImageIndex === index && (
                <StyledPressable
                  key={index}
                  onPress={() => setModalVisible(false)}
                  className={styles.imageContainer}>
                  <StyledTouchableOpacity
                    onPress={() =>
                      setOpenedImageIndex(
                        index > 0 ? index - 1 : images.length - 1,
                      )
                    }
                    className={styles.leftArrowButton}>
                    <StyledImage
                      source={Images.leftArrow}
                      className={styles.leftArrowIcon}
                    />
                  </StyledTouchableOpacity>
                  <StyledImage
                    source={{uri: image?.photo}}
                    resizeMode="center"
                    className={styles.image}
                  />
                  <StyledTouchableOpacity
                    onPress={() =>
                      setOpenedImageIndex(
                        index < images.length - 1 ? index + 1 : 0,
                      )
                    }
                    className={styles.rightArrowButton}>
                    <StyledImage
                      source={Images.leftArrow}
                      className={`${styles.leftArrowIcon} rotate-180`}
                    />
                  </StyledTouchableOpacity>
                </StyledPressable>
              )
            );
          })}
        </ScrollView>
      </StyledModal>
    </StyledSafeAreaView>
  );
};

const styles = {
  container: 'w-full h-full justify-center items-center',
  modal: 'h-full justify-center items-center',
  overlay: 'absolute top-0 bottom-0 left-0 right-0 bg-black opacity-90',
  imageContainer: 'w-screen h-screen',
  leftArrowButton:
    'z-50 absolute h-10 w-10 bg-gray-400 opacity-50 rounded-full items-center justify-center left-8 inset-y-1/2',
  leftArrowIcon: 'w-5 h-5',
  image: 'h-full mx-6',
  rightArrowButton:
    'z-50 absolute h-10 w-10 bg-gray-400 opacity-50 rounded-full items-center justify-center right-8 inset-y-1/2',
  previewImage:
    'flex select-none h-[170px] bg-gray-200 rounded mx-[5px] aspect-[5/7]',
};

export default ImageGallery;
