import React from 'react';
import OutputTemplate from './OutputTemplate.jsx';
import { breakpoint, breakpointsObj as bp } from '../utils/breakpoints';
import { colors } from '../utils/colors';
import { weight } from '../utils/typography';
import Table from '../Table.jsx';
import Bar from '../Bar.jsx';

const tableTheme = {
  row_two: {
    marginBottom: '1rem',
    // maxWidth: '300px',
    [breakpoint(bp.SMALL)]: {
      borderBottom: `1px solid ${colors.WARM_GRAY}`,
      paddingBottom: '1rem',
      marginBottom: '1rem',
    },
  },
  row_header_two: {
    [breakpoint(bp.SMALL)]: {
      borderBottom: 'none',
      paddingBottom: '0rem',
    },
  },
  cell_header_two: {
    fontWeight: weight.MEDIUM,
    color: colors.COOL_GRAY,
    ':first-child': {
      fontWeight: weight.MEDIUM,
      color: colors.COOL_GRAY,
    }
  },
  cell_two: {
    marginBottom: '0.5rem',
    ':first-child': {
      color: colors.PRIMARY_LIGHT,
      fontWeight: weight.BOLD,
    },
    [breakpoint(bp.SMALL)]: {
      marginBottom: '0.5rem',
      width: 'calc(100% - 7rem)',
      ':nth-of-type(2)': {
        width: '7rem',
      },
    },
  },
};


export default React.createClass({
  displayName: 'Categories',

  propTypes: {
    data: React.PropTypes.arrayOf(React.PropTypes.shape({
      label: React.PropTypes.string,
      score: React.PropTypes.number
    })),
    language: React.PropTypes.string,
  },

  getInitialState() {
    return {
      showJson: false,
    };
  },

  toggleJson() {
    this.setState({'showJson' :!this.state.showJson});
  },

  render() {
    return (
      <div>
        <OutputTemplate
          description={<p className="base--p_small">Classify content into a <a href="https://www.ibm.com/watson/developercloud/natural-language-understanding/api/v1/#categories" target="_blank">hierarchy</a> that's five levels deep with a score.</p>}
          data={{ categories: this.props.data }}
          showJson={this.state.showJson}
          onExitJson={this.toggleJson}
          onShowJson={this.toggleJson}
        >
          {this.props.data && this.props.data.length > 0 ? (
            <Table
              disableHeadersOnMobile
              columns={['Hierarchy', 'Score']}
              theme={tableTheme}
              data={this.props.data.reduce((acc, item) => {
                acc.push({'Hierarchy': item.label.split('/').join(' / '), 'Score': <Bar score={item.score}/>});
                return acc;
              },[])}
            />
          ) : (
            <p>{`No Categories results returned for ${this.props.language} input.`}</p>
          )}
        </OutputTemplate>
      </div>
    );
  }
});
