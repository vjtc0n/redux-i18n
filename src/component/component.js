/*
 * Project: redux-i18n
 * File: component/component.js
 */

import React from 'react'
import deepForceUpdate from 'react-deep-force-update'

class I18nTheme extends React.Component {

  constructor(props) {
    super(props)
    this.trans = this.trans.bind(this)
  }

  // Check if the text need replace some params
  params(text, params) {
    if (params !== undefined) {
      for (let k in params) {
        let reg = new RegExp('\{' + k + '\}', 'g')
        let param = params[k];

        // Escape possible '$' in params to prevent unexpected behavior with .replace()
        // especially important for IE11, which misinterprets '$0' as a regex command
        if (typeof param === 'string') {
          param = param.replace(/\$/g, '$$$$');
        }

        text = text.replace(reg, param)
      }
    }
    return text
  }

  // Main method for translating texts
  trans(textKey, params, comment) {
    let themeMessages = this.props.themes[this.props.theme]

    // Checking if textkey contains a pluralize object.
    if (typeof textKey === 'object') {
      textKey = textKey[params[textKey[2]] === 1 ? 0 : 1]
    }

    // Fall back lang
    if (themeMessages === undefined && this.props.theme.indexOf('-') > -1) {
      themeMessages = this.props.themes[this.props.theme.split('-')[0]]
    }

    if (themeMessages === undefined) {
      return this.params(textKey, params)
    }

    let message = themeMessages[textKey]
    if (message === undefined || message === '') {
      return this.params(textKey, params)
    }

    return this.params(message, params)
  }

  getChildContext() {
    return {
      c: this.trans
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.theme !== this.props.theme) {
      deepForceUpdate(this)
    }
  }

  render() {
    return this.props.children
  }
}

I18nTheme.childContextTypes = {
  c: React.PropTypes.func.isRequired
}

I18nTheme.propTypes = {
  themes: React.PropTypes.object.isRequired
}

export default I18nTheme
