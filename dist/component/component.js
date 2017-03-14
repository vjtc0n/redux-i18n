'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDeepForceUpdate = require('react-deep-force-update');

var _reactDeepForceUpdate2 = _interopRequireDefault(_reactDeepForceUpdate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Project: redux-i18n
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * File: component/component.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var I18nTheme = function (_React$Component) {
  _inherits(I18nTheme, _React$Component);

  function I18nTheme(props) {
    _classCallCheck(this, I18nTheme);

    var _this = _possibleConstructorReturn(this, (I18nTheme.__proto__ || Object.getPrototypeOf(I18nTheme)).call(this, props));

    _this.trans = _this.trans.bind(_this);
    return _this;
  }

  // Check if the text need replace some params


  _createClass(I18nTheme, [{
    key: 'params',
    value: function params(text, _params) {
      if (_params !== undefined) {
        for (var k in _params) {
          var reg = new RegExp('\{' + k + '\}', 'g');
          var param = _params[k];

          // Escape possible '$' in params to prevent unexpected behavior with .replace()
          // especially important for IE11, which misinterprets '$0' as a regex command
          if (typeof param === 'string') {
            param = param.replace(/\$/g, '$$$$');
          }

          text = text.replace(reg, param);
        }
      }
      return text;
    }

    // Main method for translating texts

  }, {
    key: 'trans',
    value: function trans(textKey, params, comment) {
      var themeMessages = this.props.themes[this.props.theme];

      // Checking if textkey contains a pluralize object.
      if ((typeof textKey === 'undefined' ? 'undefined' : _typeof(textKey)) === 'object') {
        textKey = textKey[params[textKey[2]] === 1 ? 0 : 1];
      }

      // Fall back lang
      if (themeMessages === undefined && this.props.theme.indexOf('-') > -1) {
        themeMessages = this.props.themes[this.props.theme.split('-')[0]];
      }

      if (themeMessages === undefined) {
        return this.params(textKey, params);
      }

      var message = themeMessages[textKey];
      if (message === undefined || message === '') {
        return this.params(textKey, params);
      }

      return this.params(message, params);
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        c: this.trans
      };
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps.theme !== this.props.theme) {
        (0, _reactDeepForceUpdate2.default)(this);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }]);

  return I18nTheme;
}(_react2.default.Component);

I18nTheme.childContextTypes = {
  c: _react2.default.PropTypes.func.isRequired
};

I18nTheme.propTypes = {
  themes: _react2.default.PropTypes.object.isRequired
};

exports.default = I18nTheme;