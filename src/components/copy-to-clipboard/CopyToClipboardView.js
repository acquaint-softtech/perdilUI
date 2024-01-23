import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  StyledImage,
  StyledSafeAreaView,
  StyledText,
  StyledTouchableOpacity
} from '../../StyledComponentsContstants';
import Images from '../../assets/Images';
import { Clipboard } from './';

const CopyToClipboardView = () => {
  const [isCopied, setCopied] = useState(false);
  
  const copyToClipboard = () => {
    Clipboard.setString("Hello World");
    setCopied(true);
  };

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
  }, [isCopied]);

  return (
    <StyledSafeAreaView className={styles.container}>
      <StyledTouchableOpacity
        onPress={copyToClipboard}
        className={styles.copyToClipboardButton}>
        {isCopied ? (
          <>
            <StyledText className={styles.copiedToClipboardText}>
              Copied to Clipboard
            </StyledText>
            <StyledImage source={Images.copiedToClipboard} className={styles.image} />
          </>
        ) : (
          <>
            <StyledText className={styles.copyToClipboardText}>
              Copy to Clipboard
            </StyledText>
            <StyledImage source={Images.copyToClipboard} className={styles.image} />
          </>
        )}
      </StyledTouchableOpacity>
    </StyledSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: 'flex-1 items-center justify-center',
  copyToClipboardButton: 'flex-row items-center justify-center px-4 py-2 bg-white border rounded-md',
  copiedToClipboardText: 'text-base text-green-500',
  image: 'w-4 h-4 ml-1.5 opacity-70',
  copyToClipboardText: 'text-base text-neutral-500',
});

export default CopyToClipboardView;
