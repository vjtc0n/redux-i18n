/*
 * Project: redux-i18n
 * File: component/index.js
 */

import {connect} from 'react-redux'
import I18nTheme from './component'

export default connect(state => ({
  theme: state.reduxI18nState.theme
}))(I18nTheme)
