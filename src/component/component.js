/*
 * Project: redux-i18n
 * File: component/component.js
 * @flow
 * vim:ft=javascript.jsx:
 */

import React from 'react'
import deepForceUpdate from 'react-deep-force-update'

type Props = {
  translation: Object
}

type State = {

}


class I18n extends React.Component {

  constructor(props: Props) {
    super(props)
    this.trans = this.trans.bind(this)
  }

  // Check if the text need replace some params
  params(text: string, params: Object) {
    if (params !== undefined) {
      for (let k in params) {
        let reg = new RegExp('\{' + k + '\}', 'g')
        text = text.replace(reg, params[k])
      }
    }
    return text
  }

  // Main method for translating texts
  trans(textKey: string, params: Object, comment: string) {
    let langMessages = this.props.translations[this.props.lang]

    if (langMessages === undefined) {
      return this.params(textKey, params)
    }

    let message = langMessages[textKey]
    if (message === undefined || message === '') {
      return this.params(textKey, params)
    }

    return this.params(message, params)
  }

  getChildContext() {
    return {
      t: this.trans
    }
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevProps.lang !== this.props.lang) {
      deepForceUpdate(this)
    }
  }

  render() {
    return this.props.children
  }
}

I18n.childContextTypes = {
  t: React.PropTypes.func.isRequired
}

I18n.propTypes = {
  translations: React.PropTypes.object.isRequired
}

export default I18n

