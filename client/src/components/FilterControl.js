import React from 'react';
import { connect } from 'react-redux';

import Filter from './Filter';

class FilterControl extends React.Component {
  render() {
    return (
      <div className='content'>
        {this.props.filters.map((each, index) => <Filter key={index} index={index} />)}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  filters: state.filters
});

export default connect(mapStateToProps, null)(FilterControl);
