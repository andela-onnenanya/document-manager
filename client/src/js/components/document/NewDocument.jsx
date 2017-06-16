import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as DocumentActions from '../../actions/DocumentActions';

class NewDocument extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      editMode: false,
      editID: null
    };
    this.save = this.save.bind(this);
  }

  componentDidMount() {
    CKEDITOR.replace('editor');
    $('select').material_select();
  }

  componentWillReceiveProps(nextProps) {
    const { editID } = nextProps;
    this.setState({
      editID
    });
  }

  save() {
    const title = $('#documentTitle').val() || this.state.title;
    const content = CKEDITOR.instances.editor.getData() || this.state.content;
    const access = $('#access').val() || this.state.access;
    if (!title) {
      Materialize.toast('The document cannot be save; No Title was supplied!', 5000, 'red');
    } else if (!content){
      Materialize.toast('Can not save an empty document, please add a content!', 5000, 'red');
    } else if (!access){
      Materialize.toast('The document cannot be save; No access type was supplied!', 5000, 'red');
    } else {
      const documentData = {
        title,
        content,
        access
      };
      if (this.state.editMode) {
        this.props.DocumentActions.updateDocument(documentData, this.state.editID);
      } else {
        this.props.DocumentActions.createDocument(documentData)
          .then(() => {
            this.setState({
              editMode: true
            });
          }
        );
      }
    }
  }

  render() {
    return (
      <div className="row center-align">
        <div className="row center-align">
          <div className="input-field col s5">
            <input id="documentTitle" type="text" className="validate" />
            <label htmlFor="documentTitle">Title: Unique Title</label>
          </div>
          <div className="input-field col s5 center-align">
            <select id="access">
              <option value="" disabled selected>Choose Access Type</option>
              <option value="private">Private</option>
              <option value="public">Public</option>
              <option value="role">Role</option>
            </select>
          </div>
        </div>
        <div className="col s10 center-align" >
          <textarea name="editor" id="editor" />
        </div>
        <button onClick={this.save}>Save</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  editID: state.documentReducer.editID || null
});



const mapDispatchToProps = dispatch => ({
  DocumentActions: bindActionCreators(DocumentActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(NewDocument);