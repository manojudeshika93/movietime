import { useState } from 'react';
import { Animated, Dimensions } from 'react-native';
import BootSplash from 'react-native-bootsplash';
import 'react-native-reanimated';

import { tw } from '../config';

const useNativeDriver = true;

type SplashScreenProps = {
  onAnimationEnd: () => void;
  isReady: boolean;
};

export const AnimatedBootSplash = ({ onAnimationEnd, isReady }: SplashScreenProps) => {
  const [opacity] = useState(() => new Animated.Value(1));
  const [translateY] = useState(() => new Animated.Value(0));

  const { container, logo /*, brand */ } = BootSplash.useHideAnimation({
    manifest: require('../../assets/bootsplash/manifest.json'),

    logo: require('../../assets/bootsplash/logo.png'),

    statusBarTranslucent: true,
    navigationBarTranslucent: false,
    ready: isReady,
    animate: () => {
      const { height } = Dimensions.get('window');

      Animated.stagger(250, [
        Animated.spring(translateY, {
          useNativeDriver,
          toValue: -50,
        }),
        Animated.spring(translateY, {
          useNativeDriver,
          toValue: height,
        }),
      ]).start();

      Animated.timing(opacity, {
        useNativeDriver,
        toValue: 0,
        duration: 250,
        delay: 450,
      }).start(() => {
        onAnimationEnd();
      });
    },
  });

  return (
    <Animated.View {...container} style={[container.style, { opacity, backgroundColor: tw.color('neutral-light') }]}>
      <Animated.Image {...logo} style={[logo.style, { transform: [{ translateY }] }]} />
    </Animated.View>
  );
};
