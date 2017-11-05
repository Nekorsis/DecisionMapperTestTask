import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AppContainer from './containers/AppContainer.jsx'
import * as actionCreators from './actions/actions.js'; 

const mapStateToProps = (state) => {
  return {
    appState: state.appReducer
  }
}

const Connect = connect(
  mapStateToProps,
  (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch)
  })
)(AppContainer)

export default Connect
