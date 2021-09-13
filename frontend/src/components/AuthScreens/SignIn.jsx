import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  IconButton,
  OutlinedInput,
  Grid,
  Button,
  CircularProgress,
  InputLabel,
  InputAdornment,
  FormControl,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { signin } from "../../store/actions/authActions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "50ch",
  },
  button: {
    "& > *": {
      margin: theme.spacing(2),
    },
  },
}));

const SignIn = () => {
  const classes = useStyles();
  const [values, setValues] = useState({
    amount: "",
    password: "",
    email: "",
    emailRange: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.signInUser);
  const { loading, error } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin());
  };

  return (
    <form
      onSubmit={submitHandler}
      noValidate
      autoComplete="off"
      className={classes.root}
    >
      {error && <Alert severity="error">{error}</Alert>}
      {loading && <CircularProgress />}
      <Grid
        container
        direction="column"
        justify="space-evenly"
        alignItems="center"
      >
        <div>
          <FormControl
            fullWidth
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
            <OutlinedInput
              id="outlined-adornment-email"
              value={values.email}
              onChange={handleChange("email")}
              endAdornment={
                <InputAdornment position="end">@gmail.com</InputAdornment>
              }
              aria-describedby="outlined-email-helper-text"
              inputProps={{
                "aria-label": "email",
              }}
              labelWidth={40}
            />
          </FormControl>
        </div>
        <div>
          <FormControl
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
            fullWidth
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
        </div>
        <div className={classes.button}>
          <Button type="submit" variant="contained" color="primary">
            Sign In
          </Button>
        </div>
      </Grid>
    </form>
  );
};

export default SignIn;
