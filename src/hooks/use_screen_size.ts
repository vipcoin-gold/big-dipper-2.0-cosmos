import { useTheme } from '@material-ui/core/styles';

import { useState, useEffect } from 'react';

export const useScreenSize = () => {
  const isClient = typeof window === 'object';

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    };
  }

  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>(getSize());
  const [isXlDesktop, setIsXlMobile] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(true);

  const theme: any = useTheme();

  useEffect((): any => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const width = windowSize?.width ?? 0;
    // is mobile
    if (width < theme?.breakpoints?.values?.md) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
    // is tablet
    if (
      width >= theme?.breakpoints?.values?.md &&
      width < theme?.breakpoints?.values?.lg
    ) {
      setIsTablet(true);
    } else {
      setIsTablet(false);
    }

    // is desktop
    if (
      width >= theme?.breakpoints?.values?.lg &&
      width < theme?.breakpoints?.values?.xl
    ) {
      setIsDesktop(true);
    } else {
      setIsDesktop(false);
    }
    // is XL desktop
    if (width >= theme?.breakpoints?.values?.xl) {
      setIsXlMobile(true);
    } else {
      setIsXlMobile(false);
    }
  }, [windowSize.width]);

  return {
    windowSize,
    isDesktop,
    isTablet,
    isMobile,
    isXlDesktop,
  };
};
