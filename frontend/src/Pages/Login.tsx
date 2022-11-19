import { Button, TextField, Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAppDispatch } from "../Services/hooks";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authApiSlice, useLoginMutation } from "../Services/Auth/authApiSlice";
import { tokenReceived } from "../Services/Auth/authSlice";
import LoadingButton from "@mui/lab/LoadingButton";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password should be of minimum 8 characters length")
    .max(16, "Password should be of maximum 16 characters length")
    .required("Password is required"),
});

export const Login = () => {
  const [login, { data, isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const token = await login(values).unwrap();

        dispatch(
          // tokenReceived({ token: { token: token }, email: values.email })
          tokenReceived({token, user:{email:values.email}})

        );
        navigate("/welcome");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div>
      <Box component="form" method="POST" onSubmit={formik.handleSubmit}>
        <Grid
          container
          height="100vh"
          spacing={2}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid xs={3}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid xs={3}>
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid xs={3}>
            <LoadingButton
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              loading={isLoading}
            >
              Submit
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
