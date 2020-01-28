import { background, light } from './colors';

export const smaller = 5;
export const small = 8;
export const base = 16;
export const large = 24;

export const horizontalPadding = {
    paddingLeft: base,
    paddingRight: base,
};

export const verticalMargin = {
    marginBottom: base,
    marginTop: base,
};

export const loginOrgMessageMargin = {
    marginBottom: 5,
    marginTop: 35,
};

export const wrapper = {
    flex: 1,
    backgroundColor: background,
    // ...horizontalPadding,
};

export const card = {
    flex: 1,
    backgroundColor: light,
    borderRadius: smaller,
    marginBottom: base,
};
