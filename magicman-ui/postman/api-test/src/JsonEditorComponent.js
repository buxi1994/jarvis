import React, { useRef, useEffect } from "react";
import JSONEditor from "jsoneditor";
import "jsoneditor/dist/jsoneditor.css";

const JsonEditorComponent = ({ json }) => {
  const editorRef = useRef(null);
  const editor = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      editor.current = new JSONEditor(
        editorRef.current,
        {
          mode: "text",
        },
        json
      );
    }
    return () => {
      if (editor.current) {
        editor.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (editor.current) {
        editor.current.update(json);
    }
  }, [json]);

  return <div style={{maxHeight:"100%"}} ref={editorRef}></div>;
};

export default JsonEditorComponent;
