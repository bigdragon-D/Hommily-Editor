import React, { Component, PropTypes } from 'react';
import { EditorState } from 'draft-js';
import request from 'superagent';
import Editor from '../../components/HommilyEditor/src/Editor';
import { stateToHTML } from '../../components/HommilyEditor/draft-js-export-html/src/main';
import { stateFromHTML } from '../../components/HommilyEditor/draft-js-import-html/src/main';
import styles from './Post.css';
class Post extends Component {

  constructor(props) {
    super(props);
    this.saveHandle.bind(this);
    this.editHandle.bind(this);
    this.onFocus.bind(this);
    this.getPlainText.bind(this);
    this.getFirstBlockText.bind(this);
    this.uploadImg.bind(this);

  }
  editHandle(content) {
    const editor = this.refs.myEditor;
    const _editorState = editor.getEditorState();

    const _content = stateFromHTML(content);
    const editorState = EditorState.push(
      _editorState,
      _content,
      'secondary-paste'
    );
    editor.onChange(editorState);

  }
  getFirstBlockText() {
    const editor = this.refs.myEditor;
    return editor.getFirstBlockText();

  }
  onFocus() {
    const editor = this.refs.myEditor;
    editor._focus();
  }
  getPlainText() {
    let editor = this.refs.myEditor;
    return editor.getCurrentContent().getPlainText();
  }
  uploadImg(file, callback) {
    //  request.post(config.SERVISE_PATH + '/home/process-file')
    //  .withCredentials()
    // .field('action','add')
    // .field('file',file)
    // .end((err,res)=>{

    //   callback && callback(res.body.result.path);
    //   //return res.body.result;
    // })

  }
  saveHandle() {
    let editor = this.refs.myEditor;
    const editorState = editor.getCurrentContent();
    const _content = stateToHTML(editorState);
    return _content;
  }
  render() {
    return <div className={styles.root}><Editor ref="myEditor"  uploadImg={this.uploadImg} /></div>;
  }
}
export default Post;