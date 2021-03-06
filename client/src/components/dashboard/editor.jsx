import React from "react";
import {
  Editor,
  getDefaultKeyBinding,
  RichUtils,
  Modifier,
  EditorState,
} from "draft-js";
import "./editor.css";
import "../../../node_modules/draft-js/dist/Draft.css";

export default class Reditor extends React.Component {
  constructor(props) {
    super(props);
    this.editorState = this.props.editorState;
    this.descriptionError = this.props.descriptionError;
    this.focus = () => { this.refs.editor.focus(); }
    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
  }

  _handleKeyCommand(command, editorState) {

    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.props.descriptionOnChange(newState);
      return true;
    }
    return false;
  }

  _mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.props.editorState,
        4 /* maxDepth */
      );
      if (newEditorState !== this.props.editorState) {
        this.props.descriptionOnChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }

  _toggleBlockType(blockType) {
    this.props.descriptionOnChange(RichUtils.toggleBlockType(this.props.editorState, blockType));
  }

  _toggleInlineStyle(inlineStyle) {

    if (["red", "orange"].includes(inlineStyle)) {
      //Editor state
      const eState = this.props.editorState;
      const selection = eState.getSelection();

      const reducer = (contentState, color) => Modifier.removeInlineStyle(contentState, selection, color);
      //Turn off all active colors
      const nextContentState = ["red", "orange"].reduce(reducer, eState.getCurrentContent());

      let nextEditorState = EditorState.push(eState, nextContentState, 'change-inline-style');

      const currentStyle = eState.getCurrentInlineStyle();

      if (selection.isCollapsed()) {
        nextEditorState = currentStyle.reduce((state, color) => {
          return RichUtils.toggleInlineStyle(state, color);
        }, nextEditorState);
      }

      if (!currentStyle.has(inlineStyle)) {
        nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, inlineStyle);
      }

      this.props.descriptionOnChange(
        RichUtils.toggleInlineStyle(nextEditorState)
      );
    } else {

      this.props.descriptionOnChange(
        RichUtils.toggleInlineStyle(this.props.editorState, inlineStyle)
      );
    }
  }

  render() {
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = "RichEditor-editor";
    var contentState = this.props.editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== "unstyled") {
        className += " RichEditor-hidePlaceholder";
      }
    }

    const rootClassName = this.props.descriptionError ? "RichEditor-root RichEditor-root-error" : "RichEditor-root";

    return (
      <div className={rootClassName}>
        <BlockStyleControls
          editorState={this.props.editorState}
          onToggle={this.toggleBlockType}
        />
        <InlineStyleControls
          editorState={this.props.editorState}
          onToggle={this.toggleInlineStyle}
        />

        <div className={className} onClick={this.focus}>
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={this.props.editorState}
            handleKeyCommand={this.handleKeyCommand}
            keyBindingFn={this.mapKeyToEditorCommand}
            onChange={this.props.descriptionOnChange}
            onBlur={this.props.descriptionOnBlur}
            ref="editor"
            spellCheck={true}
            placeholder="Write description here..."
          />
        </div>
      </div>
    );
  }
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
  RED: {
    color: 'rgba(255, 0, 0, 1.0)',
  },
  GREEN: {
    color: 'rgba(0, 255, 0, 1.0)',
  },
  BLUE: {
    color: 'ragb(0, 0, 255, 1.0)'
  }
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = "RichEditor-styleButton";
    if (this.props.active) {
      className += " RichEditor-activeButton";
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}


const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: "Blockquote", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
  { label: "Code Block", style: "code-block" },
];

const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

var INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" },
];

const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};


var COLORS = [
  { label: "rgba(0, 0, 0, 1.0)", style: "BLACK" },
  { label: "rgba(255, 0, 0, 1.0)", style: "RED" },
  { label: "rgba(0,255, 0, 1.0)", style: "GREEN" },
  { label: "rgba(0, 0, 255, 1.0)", style: "BLUE" }
];

const ColorControl = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

};



var FONTS = [

];
const FontControl = (props) => {

}