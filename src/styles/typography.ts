import { subtitleColor, dark } from './colors';
import { base, smaller } from './spacing';

export const smallFontSize = { fontSize: 14 };
export const mediumFontSize = { fontSize: 20 };
export const largeFontSize = { fontSize: 22 };
export const titleFontSize = { fontSize: 24 };
export const baseFontSize = { fontSize: 16 };

export const regular = { fontFamily: 'OpenSans-Regular' };
export const semiBold = { fontFamily: 'OpenSans-SemiBold' };

export const baseText = {
    ...baseFontSize,
    ...regular,
};

export const button = { lineHeight: 35, ...semiBold, ...baseFontSize };

export const lightButton = { lineHeight: 35, ...regular, fontSize: 20 };

export const loginTitle = {
    ...baseFontSize,
    color: 'white',
    ...semiBold,
    marginTop: base,
};

export const subtitleText = {
    ...baseFontSize,
    color: subtitleColor,
    ...regular,
};

export const title = {
    ...titleFontSize,
    ...semiBold,
    color: 'white',
};

export const headerTitle = {
    ...title,
    ...largeFontSize,
};

export const cardTitle = {
    ...headerTitle,
    color: dark,
};
