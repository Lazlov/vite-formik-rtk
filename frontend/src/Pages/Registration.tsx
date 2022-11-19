import { Button, TextField, Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useFormik } from "formik";
import * as yup from "yup";

// const validationSchema = yup.object({
//   email: yup
//     .string()
//     .email("Enter a valid email")
//     .required("Email is required"),
//   password: yup
//     .string()
//     .min(8, "Password should be of minimum 8 characters length")
//     .max(16, "Password should be of maximum 16 characters length")
//     .required("Password is required"),
//   password_: yup
//     .string()
//     .min(8, "Password should be of minimum 8 characters length")
//     .max(16, "Password should be of maximum 16 characters length")
//     .required("Password is required"),
// });

export const Registration = () => {
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .required("This field is required")
      .min(6, "Password should be of minimum 6 characters length")
      .max(16, "Password should be of maximum 16 characters length"),
    password_: yup
      .string()
      .required("This field is required")
      .min(6, "Password should be of minimum 6 characters length")
      .max(16, "Password should be of maximum 16 characters length")
      .when("password", {
        is: (val: string) => (val && val.length > 0 ? true : false),
        then: yup
          .string()
          .oneOf([yup.ref("password")], "Both password need to be the same"),
      }),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      password_: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <Box component="form" onSubmit={formik.handleSubmit}>
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
            <TextField
              fullWidth
              id="password_"
              name="password_"
              label="Confirm password"
              type="password_"
              value={formik.values.password_}
              onChange={formik.handleChange}
              error={
                formik.touched.password_ && Boolean(formik.errors.password_)
              }
              helperText={formik.touched.password_ && formik.errors.password_}
            />
          </Grid>
          <Grid xs={3}>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
