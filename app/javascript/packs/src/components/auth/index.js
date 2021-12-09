import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { toast } from "react-toastify";
import { login, SignUp } from "../../services/auth.services";
import { LoadingButton } from "@mui/lab";

function Auth({ signIn, signUp, signedIn }) {
  const [loading, setLoading] = useState(true);
  const validationSchema = yup.object({
    username: yup.string().min(4).max(12).required("Username is required"),
    email: yup.string().email().required("Email is required"),
    password: yup.string().min(4).max(32).required("Please input password"),
    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { handleSubmit, reset, formState, control } = useForm(formOptions);

  const submit = (data) => {
    const dataMain = {
      users: {
        email: data.email,
        password: data.password,
      },
    };
    if (signUp) {
      dataMain.users.password_confirmation = data.passwordConfirmation;
      dataMain.users.username = data.username;
      SignUp(dataMain).then(
        (res) => {
          console.log(res);
          setLoading(false);
          toast.success("Signed up Successfully");
          return Promise.resolve();
        },
        (error) => {
          setLoading(false);
          toast.error("Sign up Unsuccessfull");
          console.log(error);
          return Promise.reject();
        }
      );
    } else {
      dataMain.users.remember_me = data.rememberMe;
      login(dataMain).then(
        (res) => {
          console.log(res);
          setLoading(false);
          toast.success("Logged in Succesfully");
          return Promise.resolve();
        },
        (error) => {
          setLoading(false);
          toast.error("Login Unsuccessful");
          console.log(error);
          return Promise.reject();
        }
      );
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <Box
        sx={{
          maxWidth: 500,
          width: "100%",
        }}
      >
        <form
          onSubmit={handleSubmit(submit)}
          onReset={reset}
          id={signUp ? "SignUp-form" : "SignIn-form"}
        >
          {signUp && (
            <Controller
              control={control}
              name="username"
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  id="username"
                  label="Username"
                  variant="outlined"
                  required
                  helperText={error ? error.message : null}
                />
              )}
            />
          )}
          <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  value={value}
                  onChange={onChange}
                  type="email"
                  error={!!error}
                  label="Email Address"
                  id="email"
                  variant="outlined"
                  required
                  helperText={error ? error.message : null}
                />
              )}
            />
      

          {/* <FormControl variant="outlined">
            <InputLabel htmlFor="password">Password</InputLabel>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <OutlinedInput
                    id="password"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle passord visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </>
              )}
            />
            <FormHelperText error>
              {formState.errors.password?.message}
            </FormHelperText>
          </FormControl> */}
          {signIn && (
            <Controller
              control={control}
              name="rememberMe"
              render={({ field:  { onChange, value } }) => (
                <FormControlLabel
                  control={<Checkbox />}
                  label="Remember me?"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          )}
          {signUp && (
            <Controller
              control={control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormControl variant="outlined">
                  <InputLabel htmlFor="passwordConfirmation">
                    passwordConfirmation
                  </InputLabel>
                  <OutlinedInput
                    id="passwordConfirmation"
                    error={formState.errors.passwordConfirmation ? true : false}
                    {...field}
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle passord visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="passwordConfirmation"
                  />
                  <FormHelperText error>
                    {formState.errors.passwordConfirmation?.message}
                  </FormHelperText>
                </FormControl>
              )}
            />
          )}
          <LoadingButton loading={!loading} variant="outlined" type="submit">
            {signUp ? "Sign up" : "Login"}
          </LoadingButton>
        </form>
      </Box>
    </div>
  );
}

Auth.defaultProps = {
  signIn: false,
  signUp: false,
};

Auth.propTypes = {
  signIn: PropTypes.bool,
  signUp: PropTypes.bool,
  signedIn: PropTypes.bool.isRequired,
};

export default Auth;
