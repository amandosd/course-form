import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function TinyEditor({ value, onChange }: {value: string, onChange: (value: string) => void}) {
  const editorRef = useRef<any>(null);
  const handleChange = (value: string) => {
    onChange && onChange(value);
  };
  return (
    <>
      <Editor
        apiKey="r7j4yjnh848l1g4b1iy5o8xu37ze4dbp83kfhedb8gp567ep"
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={value}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount"
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
        onEditorChange={handleChange}
      />
    </>
  );
}
