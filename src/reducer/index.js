/*
 * Project: redux-i18n
 * File: reducer/index.js
 */

const reduxI18nState = {
  theme: 'standard'
}

export function i18nThemeState(state = reduxI18nState, action) {
  switch (action.type) {
    case 'REDUX_I18N_SET_THEME':
        return {...state, theme: action.theme}
    default:
        return state
  }
}
