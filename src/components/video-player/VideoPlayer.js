import React, { useRef, useState } from 'react';
import { StyledVideo, StyledView } from '../../StyledComponentsContstants';

const VideoPlayer = () => {
  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [screenType, setScreenType] = useState('content');

  const onProgress = (data) => {
    if (!isLoading) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = (data) => {
    setDuration(data.duration);
    setIsLoading(false);
  };

  const onLoadStart = (data) => setIsLoading(true);

  const onEnd = () =>{console.log("end")};

  return (
    <StyledView className={styles.container}>
      <StyledVideo
        onEnd={onEnd}
        onLoad={onLoad}
        onLoadStart={onLoadStart}
        onProgress={onProgress}
        paused={paused}
        ref={videoPlayer}
        resizeMode={screenType}
        onFullScreen={isFullScreen}
        source={{
          uri:
            'https://assets.mixkit.co/videos/download/mixkit-countryside-meadow-4075.mp4',
        }}
        className={styles.video}
        volume={10}
        controls={true}
      />
    </StyledView>
  );
};

export default VideoPlayer;

const styles = {
  container: 'flex-1',
  toolbar: 'mt-7 bg-white p-4 rounded',
  video: 'absolute top-0 left-0 bottom-0 right-0',
};
