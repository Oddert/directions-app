import React from 'react';
import { connect } from 'react-redux';

import ToggleFilterChecked from './ToggleFilterChecked'
import Filter from './Filter';

class FilterControl extends React.Component {
  render() {
    return (
      <div>
        <ToggleFilterChecked />
        <div className='content'>
          {this.props.filters.map((each, index) => <Filter key={index} index={index} />)}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  filters: state.filters
});

export default connect(mapStateToProps, null)(FilterControl);
