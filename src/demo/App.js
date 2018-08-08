import React, { Component } from 'react';
import { AutoSizer } from 'react-virtualized';
import { VirtualKanban } from '../';
import './App.css';

const keyGenerator = ({ id, lastModified }) => `${id}-${lastModified}`;

import classnames from 'classnames';
import { PropTypes } from 'react';
import { PropTypes as CustomPropTypes } from '../propTypes';

export const row = PropTypes.object.isRequired;
export const rowId = CustomPropTypes.id.isRequired;
export const listId = CustomPropTypes.id.isRequired;
export const isDragging = PropTypes.bool.isRequired;
export const rowStyle = PropTypes.object.isRequired;
export const connectDragSource = PropTypes.func.isRequired;
export const connectDropTarget = PropTypes.func.isRequired;
import PureComponent from '../PureComponent';
class IdeaDashItem extends PureComponent {
  static propTypes = {row,rowId,listId,isDragging,rowStyle,connectDragSource,connectDropTarget}

  render() {
    const { row, rowStyle, connectDragSource, connectDropTarget, isDragging } = this.props;

    const itemContainerClass = classnames({
      'ItemContainer': true,
      'ItemPlaceholder': isDragging,
    });

    return connectDragSource(connectDropTarget(
      <div className='ItemWrapper' style={rowStyle}>
        <div className={itemContainerClass}>
          <div className='ItemContent'>
            <p>X{row.name}</p>
          </div>
        </div>
      </div>
    ));
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lists: props.getLists(),
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
  }

  render() {
    return (
      <div className='KanbanWrapper'>
        <AutoSizer>
          {({ width, height }) => (
            <VirtualKanban
              lists={this.state.lists}
              width={width}
              height={height}
              listWidth={200}
              itemCacheKey={keyGenerator}
              onMoveRow={({ lists }) => this.setState(() => ({lists}))}
              onMoveList={({ lists }) => this.setState(() => ({lists}))}
              dndDisabled={false}
              itemComponent={IdeaDashItem}
            />
          )}
        </AutoSizer>
      </div>
    );
  }
}

export default App;
