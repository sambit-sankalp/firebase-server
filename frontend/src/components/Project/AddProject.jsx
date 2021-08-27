import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  InputLabel,
  OutlinedInput,
  Paper,
  CssBaseline,
  Typography,
  FormControl,
  Container,
  CircularProgress,
  Grid,
  Button,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { createProject } from "../../store/actions/projectActions";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
  button: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

const AddProject = () => {
  const classes = useStyles();

  const [values, setValues] = useState({
    title: "",
    desc: "",
  });

  const projectCreate = useSelector((state) => state.projectCreate);
  const { loading, success, error } = projectCreate;

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProject({
        title: values.title,
        desc: values.desc,
      })
    );
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Paper>
          <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
              <form
                className={classes.root}
                onSubmit={submitHandler}
                noValidate
                autoComplete="off"
              >
                <Typography component="div" align="left" variant="h4">
                  Your Article
                </Typography>
                {loading ? (
                  <CircularProgress />
                ) : error ? (
                  <Alert severity="error">{error}</Alert>
                ) : (
                  <div>
                    <div>
                      <FormControl
                        fullWidth
                        className={clsx(classes.margin, classes.textField)}
                        variant="outlined"
                      >
                        <InputLabel htmlFor="outlined-adornment-title">
                          Title
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-title"
                          value={values.title}
                          onChange={handleChange("title")}
                          aria-describedby="outlined-title-helper-text"
                          inputProps={{
                            "aria-label": "title",
                          }}
                          labelWidth={40}
                        />
                      </FormControl>
                    </div>
                    <div>
                      <FormControl
                        fullWidth
                        className={clsx(classes.margin, classes.textField)}
                        variant="outlined"
                      >
                        <InputLabel htmlFor="outlined-adornment-desc">
                          Description
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-desc"
                          value={values.desc}
                          onChange={handleChange("desc")}
                          aria-describedby="outlined-name-helper-text"
                          inputProps={{
                            "aria-label": "desc",
                          }}
                          labelWidth={40}
                        />
                      </FormControl>
                    </div>

                    <Grid
                      container
                      direction="row"
                      justify="flex-end"
                      alignItems="center"
                      className={classes.button}
                    >
                      <Button variant="contained" color="primary" type="submit">
                        Add
                      </Button>
                    </Grid>
                  </div>
                )}
              </form>
            </Container>
          </React.Fragment>
        </Paper>
      </Container>
    </React.Fragment>
  );
};

export default AddProject;
