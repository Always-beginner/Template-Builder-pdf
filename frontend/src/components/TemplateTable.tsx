import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  DialogActions,
  SelectChangeEvent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddTemplate from "../pages/addTemplate";
import { getSuggestedQuery } from "@testing-library/react";
function TemplateTable() {
  const [templates, setTemplates] = React.useState([]);
  const [tempId, setTempId] = React.useState() as any;
  const navigate = useNavigate();
  // user states
  const [user, setUser] = React.useState([]) as any;
  // model states
  const [open, setOpen] = React.useState(false);
  const [userName, setUserName] = React.useState<string>("");
  // let ageVal: any = React.useRef();
  const handleChange = (event: SelectChangeEvent<typeof userName>) => {
    setUserName(event.target.value || "");
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // get user
  const getUser = async (temp_id: number | string) => {
    const user = await axios.get("http://localhost:3000/user/getAllUser");
    setUser(user.data);
    setTempId(temp_id);
  };
  // get template
  const getTemplates = async () => {
    const temp_data = await axios.get(
      "http://localhost:3000/template/getTemplates"
    );
    setTemplates(temp_data.data);
  };
  // delete template
  const deleteTemplate = async (temp_id: number | string) => {
    const deleteTemp = await axios.delete(
      "http://localhost:3000/template/deleteTemplate/" + temp_id
    );
    getTemplates();
  };
  // get template by id
  const getTemplateById = async (temp_id: number | string) => {
    const getTemp = await axios.get(
      "http://localhost:3000/template/Template/" + temp_id
    );
    navigate("/addTemplate", { state: { sendTemp: getTemp.data } });
  };
  // download pdf
  const downloadPdf = async (
    userId: number | string,
    temp_id: number | string
  ) => {
    const pdf: any = await axios({
      url: `http://localhost:3000/template/download-pdf/${userId}/${temp_id}`,
      method: "get",
      responseType: "blob",
    });
    const blob: any = pdf.data;
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `template-${temp_id}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  };
  React.useEffect(() => {
    if (templates.length == 0) {
      getTemplates();
    }
  });
  return (
    <TableContainer
      component={Paper}
      sx={{ my: 10, mx: "auto", width: 1000, height: 400 }}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Template Id</TableCell>
            <TableCell>Template Header</TableCell>
            <TableCell>
              Actions{" "}
              <IconButton onClick={() => navigate("/addTemplate")}>
                <AddCircleOutlineIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {templates.map((row: any) => (
            <TableRow
              key={row.temp_id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{row.temp_id}</TableCell>
              <TableCell>{row.temp_header}</TableCell>
              <TableCell>
                <Button
                  sx={{ mr: 2 }}
                  size="small"
                  aria-label="logo"
                  color="warning"
                  variant="outlined"
                  onClick={() => getTemplateById(row.temp_id)}
                >
                  <EditIcon />
                </Button>
                <Button
                  sx={{ mr: 2 }}
                  size="small"
                  aria-label="logo"
                  color="error"
                  variant="outlined"
                  onClick={() => {
                    deleteTemplate(row.temp_id);
                  }}
                >
                  <DeleteIcon />
                </Button>
                <Button
                  size="small"
                  aria-label="logo"
                  color="info"
                  variant="outlined"
                  onClick={() => {
                    getUser(row.temp_id);
                    handleClickOpen();
                  }}
                >
                  <DownloadIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {user?.id !== null ? (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Choose User</DialogTitle>
          <DialogContent>
            <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel htmlFor="demo-dialog-native">User</InputLabel>
                <Select
                  native
                  value={userName}
                  onChange={handleChange}
                  input={
                    <OutlinedInput label="userName" id="demo-dialog-native" />
                  }
                >
                  <option aria-label="None" value="" />
                  {user.map((row: any) => (
                    <>
                      <option key={row.id} value={row.id}>
                        {row.name}
                      </option>
                    </>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleClose();
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                downloadPdf(userName, tempId);
                handleClose();
              }}
            >
              Download
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        ""
      )}
    </TableContainer>
  );
}

export default TemplateTable;
