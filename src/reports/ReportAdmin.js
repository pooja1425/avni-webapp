import React from "react";
import { Form, Field } from "react-final-form";
import http from "common/utils/httpClient";
import { TextField, Checkbox, Radio, Select } from "final-form-material-ui";
import { Paper, Grid, Button, MenuItem, FormControlLabel } from "@material-ui/core";

// function call on SAVE button
const onSubmit = async (values, form) => {
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));

  // POST method calling
  http.post("/web/report/create", values).then(response => {
    console.log("post method resp: ", response);
  });

  // reset form fields with validation on submit form
  Object.keys(values).forEach(key => {
    form.change(key, undefined);
    form.resetFieldState(key);
  });
};

// function for adding required validations
const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  }
  if (!values.role) {
    errors.role = "Required";
  }
  if (!values.organisation) {
    errors.organisation = "Required";
  }
  return errors;
};

function ReportAdmin() {
  return (
    <div style={{ padding: 16, margin: "auto", maxWidth: 600 }}>
      <h2> Report Admin Form </h2>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ form, handleSubmit, reset, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    required
                    name="name"
                    component={TextField}
                    type="text"
                    label="Name"
                  />
                </Grid>

                <Grid item xs={6}>
                  <Field
                    fullWidth
                    name="reportName"
                    component={TextField}
                    type="text"
                    label="Corresponding report in metabase"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    fullWidth
                    required
                    name="role"
                    component={Select}
                    label="Select a User Role"
                    formControlProps={{ fullWidth: true }}
                  >
                    <MenuItem value="District co-ordinator">District co-ordinator</MenuItem>
                    <MenuItem value="NGO co-ordinator">NGO co-ordinator</MenuItem>
                    <MenuItem value="Donor">Donor</MenuItem>
                    <MenuItem value="District collector">District collector</MenuItem>
                    <MenuItem value="PMU">PMU</MenuItem>
                  </Field>
                </Grid>

                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="description"
                    component={TextField}
                    type="text"
                    label="Description"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    label="Is active?"
                    control={<Field name="isActive" component={Checkbox} type="checkbox" />}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    fullWidth
                    required
                    name="organisation"
                    component={Select}
                    label="Select a Organisation"
                    formControlProps={{ fullWidth: true }}
                  >
                    <MenuItem value="demo">Demo</MenuItem>
                    <MenuItem value="openchs">OpenCHS</MenuItem>
                  </Field>
                </Grid>

                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={submitting || pristine}
                  >
                    SAVE
                  </Button>
                </Grid>

                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    // disabled={submitting || pristine}
                  >
                    <a href="/#/export">CANCEL</a>
                  </Button>
                </Grid>
              </Grid>
            </Paper>
            {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
          </form>
        )}
      />
    </div>
  );
}

export default ReportAdmin;
