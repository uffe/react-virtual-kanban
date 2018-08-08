'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectDropTarget = exports.connectDragSource = exports.rowStyle = exports.isDragging = exports.listId = exports.rowId = exports.row = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactVirtualized = require('react-virtualized');

var _ = require('../');

require('./App.css');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('../propTypes');

var _PureComponent2 = require('../PureComponent');

var _PureComponent3 = _interopRequireDefault(_PureComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var keyGenerator = function keyGenerator(_ref) {
  var id = _ref.id,
      lastModified = _ref.lastModified;
  return id + '-' + lastModified;
};

var row = exports.row = _react.PropTypes.object.isRequired;
var rowId = exports.rowId = _propTypes.PropTypes.id.isRequired;
var listId = exports.listId = _propTypes.PropTypes.id.isRequired;
var isDragging = exports.isDragging = _react.PropTypes.bool.isRequired;
var rowStyle = exports.rowStyle = _react.PropTypes.object.isRequired;
var connectDragSource = exports.connectDragSource = _react.PropTypes.func.isRequired;
var connectDropTarget = exports.connectDropTarget = _react.PropTypes.func.isRequired;

var IdeaDashItem = function (_PureComponent) {
  (0, _inherits3.default)(IdeaDashItem, _PureComponent);

  function IdeaDashItem() {
    (0, _classCallCheck3.default)(this, IdeaDashItem);
    return (0, _possibleConstructorReturn3.default)(this, (IdeaDashItem.__proto__ || (0, _getPrototypeOf2.default)(IdeaDashItem)).apply(this, arguments));
  }

  (0, _createClass3.default)(IdeaDashItem, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          row = _props.row,
          rowStyle = _props.rowStyle,
          connectDragSource = _props.connectDragSource,
          connectDropTarget = _props.connectDropTarget,
          isDragging = _props.isDragging;


      var itemContainerClass = (0, _classnames2.default)({
        'ItemContainer': true,
        'ItemPlaceholder': isDragging
      });

      return connectDragSource(connectDropTarget(_react2.default.createElement(
        'div',
        { className: 'ItemWrapper', style: rowStyle },
        _react2.default.createElement(
          'div',
          { className: itemContainerClass },
          _react2.default.createElement(
            'div',
            { className: 'ItemContent' },
            _react2.default.createElement(
              'p',
              null,
              'X',
              row.name
            )
          )
        )
      )));
    }
  }]);
  return IdeaDashItem;
}(_PureComponent3.default);

var App = function (_Component) {
  (0, _inherits3.default)(App, _Component);

  function App(props) {
    (0, _classCallCheck3.default)(this, App);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || (0, _getPrototypeOf2.default)(App)).call(this, props));

    _this2.state = {
      lists: props.getLists()
    };

    // setInterval(() => {
    //   this.setState((prevState) => {
    //     if (prevState.lists[0].rows.length > 0) {
    //       this._initialLists = prevState.lists;
    //       return {lists: prevState.lists.map((list) => ({...list, rows: []}))};
    //     } else {
    //       return {lists: this._initialLists.concat()};
    //     }
    //   });
    // }, 3000);
    return _this2;
  }

  (0, _createClass3.default)(App, [{
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        { className: 'KanbanWrapper' },
        _react2.default.createElement(
          _reactVirtualized.AutoSizer,
          null,
          function (_ref2) {
            var width = _ref2.width,
                height = _ref2.height;
            return _react2.default.createElement(_.VirtualKanban, {
              lists: _this3.state.lists,
              width: width,
              height: height,
              listWidth: 200,
              itemCacheKey: keyGenerator,
              onMoveRow: function onMoveRow(_ref3) {
                var lists = _ref3.lists;
                return _this3.setState(function () {
                  return { lists: lists };
                });
              },
              onMoveList: function onMoveList(_ref4) {
                var lists = _ref4.lists;
                return _this3.setState(function () {
                  return { lists: lists };
                });
              },
              dndDisabled: false,
              itemComponent: IdeaDashItem
            });
          }
        )
      );
    }
  }]);
  return App;
}(_react.Component);

exports.default = App;