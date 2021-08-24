import React, { useState } from "react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  IconButton,
  OutlinedInput,
  Grid,
  CircularProgress,
  Button,
  InputLabel,
  InputAdornment,
  FormControl,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { signUp } from "../../store/actions/authActions";

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

const SignUp = () => {
  const classes = useStyles();
  const [message, setMessage] = useState(null);
  const [values, setValues] = useState({
    name: "",
    amount: "",
    password: "",
    confirmPassword: "",
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

  const signUpUser = useSelector((state) => state.signUpUser);
  const { loading, error } = signUpUser;

  const submitHandler = (e) => {
    e.preventDefault();
    if (values.password != values.confirmPassword) {
      setMessage("Password do not match");
    } else {
      dispatch(
        signUp({
          name: values.name,
          email: values.email,
          password: values.password,
        })
      );
    }
  };

  return (
    <form
      className={classes.root}
      onSubmit={submitHandler}
      noValidate
      autoComplete="off"
    >
      {message && <Alert severity="error">{message}</Alert>}
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
            <InputLabel htmlFor="outlined-adornment-email">Name</InputLabel>
            <OutlinedInput
              id="outlined-adornment-name"
              value={values.name}
              onChange={handleChange("name")}
              aria-describedby="outlined-name-helper-text"
              inputProps={{
                "aria-label": "name",
              }}
              labelWidth={73}
            />
          </FormControl>
        </div>
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
        <div>
          <FormControl
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
            fullWidth
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.confirmPassword}
              onChange={handleChange("confirmPassword")}
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
          <Button variant="contained" color="primary" type="submit">
            Sign Up
          </Button>
        </div>
      </Grid>
    </form>
  );
};

export default SignUp;
