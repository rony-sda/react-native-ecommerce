/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0eb77b'; // Primary Container
const tintColorDark = '#73ffbc'; // Primary Light

export const Colors = {
  light: {
    text: '#131313', // surface-container-low (used as dark text in light mode)
    background: '#fcf9f8', // inverse-surface
    tint: tintColorLight,
    icon: '#565555', // inverse-on-surface
    tabIconDefault: '#565555',
    tabIconSelected: tintColorLight,
    
    // Emerald Nocturne light mode translations
    surface: '#ffffff',
    surfaceContainer: '#fcf9f8',
    surfaceHigh: '#f0f0f0',
    primary: '#0eb77b',
    primaryDim: '#006b46',
    border: '#adaaaa',
    inputBackground: '#f0f0f0',
  },
  dark: {
    text: '#ffffff', // on-surface
    background: '#0e0e0e', // surface
    tint: tintColorDark,
    icon: '#adaaaa', // on-surface-variant
    tabIconDefault: '#adaaaa',
    tabIconSelected: tintColorDark,

    // Emerald Nocturne dark mode tokens
    surface: '#0e0e0e',
    surfaceContainer: '#131313', // surface-container-low
    surfaceHigh: '#262626', // surface-container-highest
    primary: '#73ffbc',
    primaryDim: '#63f0af',
    border: '#484847', // outline-variant
    inputBackground: '#262626', // surface-container-highest
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
