/*
 * Project: redux-i18n
 * File: component/index.js
 */

import {connect} from 'react-redux'
import I18nTheme from './component'

export default connect(state => ({
  theme: state.i18nThemeState.theme
}))(I18nTheme)
