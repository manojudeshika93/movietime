const textLevels = [
  { level: 'h1', fontSize: 40, lineHeight: 54 },
  { level: 'h2', fontSize: 32, lineHeight: 42 },
  { level: 'h3', fontSize: 28, lineHeight: 38 },
  { level: 'h4', fontSize: 20, lineHeight: 30 },
  { level: 'h5', fontSize: 18, lineHeight: 24 },
  { level: 'b1', fontSize: 16, lineHeight: 24 },
  { level: 'b2', fontSize: 14, lineHeight: 22 },
  { level: 'b3', fontSize: 12, lineHeight: 19 },
];

const fontFamilies = {
  extralight: 'Cairo-ExtraLight',
  light: 'Cairo-Light',
  regular: 'Cairo-Regular',
  medium: 'Cairo-Medium',
  semibold: 'Cairo-SemiBold',
  bold: 'Cairo-Bold',
  extrabold: 'Cairo-ExtraBold',
};

const styles: Record<string, any> = {};

textLevels.forEach(({ level, fontSize, lineHeight }) => {
  Object.entries(fontFamilies).forEach(([name, fontFamily]) => {
    styles[`.text-${level}-${name}`] = {
      fontSize,
      lineHeight,
      fontFamily,
    };
  });
});

// Add default bold style for each text level without a specific weight
textLevels.forEach(({ level, fontSize, lineHeight }) => {
  styles[`.text-${level}`] = {
    fontSize,
    lineHeight,
    fontFamily: fontFamilies.regular,
  };
});

styles['center-full'] = `justify-center items-center`;

export default styles;
