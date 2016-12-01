import React from 'react'


class WithJsx extends React.Component {
  render() {
    const user = {name: 'Frank'}
    const name = <span className="name">{user.name}</span>
    return (
      <div>
        {this.context.t('Hello {name}', {name: name})}
      </div>
    )
  }
}

WithJsx.contextTypes = {
  t: React.PropTypes.func.isRequired
}

export default WithJsx
