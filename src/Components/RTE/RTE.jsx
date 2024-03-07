import React from "react";
import config from "../../Config/config";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

function RTE({ label, name, control, defaultvalue = " ", }) {
  return (
    <div>
      {label && <label className="font-semibold text-xl text-white">{label}</label>}
      <Controller
        name={name || "Editor"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey={config.TinyMCEKey}
            init={{
              initialValue: defaultvalue,
              height: 350,
              width:800,
              menubar: true,
              plugins:
                "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate  tableofcontents footnotes mergetags autocorrect typography inlinecss",
              toolbar:
                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            initialValue={defaultvalue || " "}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}

export default RTE;
