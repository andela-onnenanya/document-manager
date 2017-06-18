/* global Materialize $ */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as UserActions from '../../actions/UserActions';

/**
 * @class EditProfile
 * @extends {React.Component}
 */
class EditProfile extends React.Component {
  /**
   * Creates an instance of EditProfile.
   * @param {object} props
   * @param {object} context
   * @memberOf EditProfile
   */
  constructor(props, context) {
    super(props, context);
    this.state = {};
    this.updateProfile = this.updateProfile.bind(this);
  }

  /**
   * @param {object} nextProps
   * @returns {void}
   * @memberOf EditProfile
   */
  componentWillReceiveProps(nextProps) {
    if (!nextProps.updatingUser && !this.props.updatingUser) {
      Materialize.toast(
        'Profile update failed, please try again later!', 5000, 'red');
    }
  }

  /**
   * Make a PUT call to update user profile
   * @returns {void}
   * @memberOf EditProfile
   */
  updateProfile() {
    const { userId } = JSON.parse(localStorage.getItem('user_profile'));
    const password = $('#password').val();
    const firstName = $('#first_name').val();
    const lastName = $('#last_name').val();
    const updateInfo = { firstName, lastName, userId };

    if (password && password.length < 8) {
      Materialize.toast(`Password must be up to 8 characters<br />
      You can leave password blank if you do not want to change your password`,
         5000, 'red');
      return;
    }
    // add password if up to 8 characters
    if (password.length > 7) {
      updateInfo.password = password;
    }
    this.props.UserActions.updateUser(updateInfo)
      .then(() => {
        Materialize.toast('Profile updated successfully!', 3000, 'green');
      });
  }

  /**
   * @returns {element} DOM element - div
   * @memberOf EditProfile
   */
  render() {
    const userProfile = JSON.parse(localStorage.getItem('user_profile'));
    const { firstName, lastName, email } = userProfile;
    return (
      <div className="row container center-align">
        <form className="col s12" onSubmit={this.updateProfile}>
          <div className="row ">
            <div className="input-field col s12 m6">
              <input
                disabled
                value={email}
                id="disabled"
                type="text"
                className="validate"
              />
              <label htmlFor="disabled" className="active">User email is not editable!</label>
            </div>
            <div className="input-field col s12 m6">
              <input id="password" type="password" className="validate" />
              <label
                htmlFor="password"
              >Password: Not less than 8 characters</label>
            </div>
            <div className="input-field col s12 m6">
              <input
                defaultValue={firstName}
                id="first_name"
                type="text"
                className="validate"
              />
              <label className="active" htmlFor="first_name">First Name</label>
            </div>
            <div className="input-field col s12 m6">
              <input
                defaultValue={lastName}
                id="last_name"
                type="text"
                className="validate"
              />
              <label className="active" htmlFor="last_name">Last Name</label>
            </div>
            <input className="btn orange" type="submit" value="Update Profile" />
          </div>
        </form>
      </div>
    );
  }
}

EditProfile.defaultProps = {
  updatingUser: false
};

EditProfile.propTypes = {
  updatingUser: PropTypes.bool,
  UserActions: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  updatingUser: state.userReducers.updatingUser
});

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(UserActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
