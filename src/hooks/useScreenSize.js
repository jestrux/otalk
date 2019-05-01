import { useState, useEffect } from 'react';

const SCREEN_SIZES = {
  XS: 'extra-small',
  SM: 'small',
  LG: 'large',
  UKN: 'unknown'
};

export default function useScreenSize() {
  const screens = [SCREEN_SIZES.XS, SCREEN_SIZES.SM, SCREEN_SIZES.LG];
  const defaultScreenSize = SCREEN_SIZES.UKN;
  const queries = ['(max-width: 350px)', '(max-width: 540px)', '(min-width: 541px)'];
  const mediaQueryLists = queries.map(q => window.matchMedia(q));

  const getScreenSize = () => {
    const index = mediaQueryLists.findIndex(mql => mql.matches);
    return typeof screens[index] !== 'undefined' ? screens[index] : defaultScreenSize;
  };

  const [screenSize, setScreenSize] = useState(getScreenSize);

  useEffect(
    () => {
      const handler = () => setScreenSize(getScreenSize);
      mediaQueryLists.forEach(mql => mql.addListener(handler));
      return () => mediaQueryLists.forEach(mql => mql.removeListener(handler));
    },
    []
  );

  return {
    isExtraSmall: screenSize === SCREEN_SIZES.XS,
    isSmall: screenSize === SCREEN_SIZES.SM,
    isLarge: screenSize === SCREEN_SIZES.LG
  };
}