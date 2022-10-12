import {
  Button,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AddTemplate = () => {
  const location = useLocation();
  const temp = location.state;

  const editorRef: any = useRef(null);
  const temp_head: any = useRef();
  const navigate = useNavigate();

  // template fields states
  const [tempField, setTempField] = useState([]) as any;
  // adding template
  const addTemplate = () => {
    if (editorRef.current) {
      //   console.log(editorRef.current.getContent());
      let data = {
        temp_header: temp_head.current.value,
        temp_text: editorRef.current.getContent(),
      };
      console.log(data);
      axios
        .post("http://localhost:3000/template/addTemplate", data)
        .then((res) => navigate("/"))
        .catch((err) => console.log(err));
    }
  };
  const updateTemplate = () => {
    if (editorRef.current && location.state.sendTemp != null) {
      //   console.log(editorRef.current.getContent());
      let data = {
        temp_header: temp_head.current.value,
        temp_text: editorRef.current.getContent(),
      };
      console.log(data);
      axios
        .patch(
          "http://localhost:3000/template/editTemplate/" +
            temp?.sendTemp.temp_id,
          data
        )
        .then((res) => navigate("/"))
        .catch((err) => console.log(err));
    }
  };
  // get template fields
  const getTemplateFields = async () => {
    const temp_data = await axios.get(
      "http://localhost:3000/template/getTemplateFields"
    );
    setTempField(temp_data.data);
  };
  useEffect(() => {
    if (tempField.length == 0) {
      getTemplateFields();
    }
  });
  const dragStart = (event: React.DragEvent) => {
    event.dataTransfer.setData("text", event.currentTarget.id);
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={4} sx={{ mt: 10 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Template Fields</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tempField !== null ? (
                tempField.map((row: any, ind: any) => (
                  <TableRow key={ind}>
                    <TableCell
                      id={row.field_name}
                      onDragStart={dragStart}
                      draggable="true"
                    >
                      {row.field_name}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell>No Fields available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={8} sx={{ mt: 10 }}>
        <TextField
          defaultValue={
            temp?.sendTemp.temp_id ? temp?.sendTemp?.temp_header : ""
          }
          inputRef={temp_head}
          sx={{ mb: 2, width: 600 }}
          id="temp_head"
          fullWidth
          label="Template Header"
          type="text"
          required
        ></TextField>
        <Editor
          apiKey="i6rvm69se6ltqkhmmmkn0eaiafrb4inaaa792u1r3pwczyg4"
          onInit={(evt, editor: any) => (editorRef.current = editor)}
          initialValue={temp?.sendTemp.temp_id ? temp?.sendTemp.temp_text : ""}
          init={{
            height: 300,
            menubar: true,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "preview",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
        {temp?.sendTemp?.temp_id ? (
          <Button
            sx={{ mr: 2, mt: 3, mb: 3 }}
            size="small"
            aria-label="logo"
            color="info"
            variant="contained"
            onClick={updateTemplate}
          >
            Update
          </Button>
        ) : (
          <Button
            sx={{ mr: 2, mt: 3, mb: 3 }}
            size="small"
            aria-label="logo"
            color="info"
            variant="contained"
            onClick={addTemplate}
          >
            Save
          </Button>
        )}
        <Button
          sx={{ mr: 2, mt: 3, mb: 3 }}
          size="small"
          aria-label="logo"
          color="info"
          variant="outlined"
          onClick={() => navigate("/")}
        >
          Cancel
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddTemplate;
