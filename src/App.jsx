import { useState } from "react";

import "./App.css";
import Card from "@mui/material/Card";

import { Box, Button, CardContent, TextField } from "@mui/material";

function App() {
  const initialValues = { mailAddress: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
  };

  const validate = (values) => {
    const errors = {};
    const regex =
      /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
    if (!values.mailAddress) {
      errors.mailAddress = "メールアドレスを入力してください";
    } else if (!regex.test(values.mailAddress)) {
      errors.mailAddress = "正しいメールアドレスを入力してください";
    }
    if (!values.password) {
      errors.password = "パスワードを入力してください";
    } else if (values.password.length < 4) {
      errors.password = "4文字以上で入力してください";
    }
    return errors;
  };

  return (
    <>
      <Card>
        <CardContent onSubmit={(e) => handleSubmit(e)}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              paddingBottom: "2rem",
            }}
          >
            <TextField
              error={formErrors.mailAddress}
              helperText={formErrors.mailAddress}
              label="Email"
              variant="standard"
              sx={{ marginBottom: "1rem" }}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              error={formErrors.password}
              helperText={formErrors.password}
              label="Password"
              type="password"
              variant="standard"
              onChange={(e) => handleChange(e)}
            />
          </Box>
          <Button variant="contained" onClick={handleSubmit}>
            ログイン
          </Button>
        </CardContent>
      </Card>
    </>
  );
}

export default App;
