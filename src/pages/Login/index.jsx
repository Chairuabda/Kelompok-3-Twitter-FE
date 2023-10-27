/* eslint-disable no-useless-catch */
/* eslint-disable no-dupe-else-if */
import {
	Box,
	Text,
	Input,
	Button,
	FormControl,
	FormLabel,
	FormErrorMessage,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// Skema Login
const LoginSchema = Yup.object().shape({
	email: Yup.string()
		.email("Invalid Email")
		.required("Email is required"),
	password: Yup.string()
		.min(8, "Password wrong")
		.required("Password is required"),
});

export const Login = () => {
	const [accounts, setAccounts] = useState([]);
	const Navigate = useNavigate();

	// Ambil data user yang sudah register
	const fatchDataLogin = async () => {
		try {
			const response = await axios.get(
				"http://localhost:8080/api/twitter"
			);
			setAccounts(response.data.data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fatchDataLogin();
	}, []);

	// Pengecekan email dan password yang di input oleh user dengan email dan password yang ada di db.json
	const check = async (email, password) => {
		try {
			await axios.post("http://localhost:8080/api/twitter/login", {
				email,
				password,
			});

			const accLogin = accounts.find((user) => user.email == email);
			localStorage.setItem("akun", accLogin.id);
			Navigate("/home");
		} catch (err) {
			throw err;
		}
	};

	// menginisialisasi values dan loginschame, lalu ketika di submit, onsubmit akan dijalan kan memanggil function check untuk melakukan cek email dan password yg di inputkan
	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: LoginSchema,
		onSubmit: (values) => {
			check(values.email, values.password);
		},
	});

	return (
		<Box
			display={"flex"}
			w={"100vw"}
			justifyContent={"center"}
			alignItems={"center"}
			minH={"100vh"}
			bgImage="url('/src/assets/wickedbackground.svg')"
			backgroundSize="cover"
			backgroundRepeat="repeat"
		>
			<Box
				display={"flex"}
				flexDirection={"column"}
				justifyContent={"center"}
				alignItems={"center"}
				bgColor="#eff0f3"
				p="30px 50px"
				borderRadius="20px"
				color="black"
				w="350px"
				outline={"9px solid rgba(255, 255, 255, 0.09)"}
				boxShadow={"0px 6px 13px 3px rgba(64, 15, 104, 0.38)"}
			>
				<form onSubmit={formik.handleSubmit}>
					<Box
						display={"flex"}
						flexDirection={"column"}
						justifyContent={"center"}
						mb={"30px"}
					>
						<Box
							display={"flex"}
							justifyContent={"center"}
							alignItems={"center"}
						>
							<Text fontSize="20px">Login</Text>
						</Box>
						<FormControl
							isInvalid={formik.touched.email && formik.errors.email}
							display="flex"
							flexDirection="column"
							justifyContent="center"
							mb={"1rem"}
						>
							{" "}
							{/* tambah ini */}
							<FormLabel>Email</FormLabel>
							<Input
								type="text"
								name="email"
								value={formik.values.email}
								onChange={formik.handleChange}
								borderRadius="4px"
								bgColor="transparent"
								border="1px solid #1A008F"
								h="35px"
								color="gray.700"
								pl={"5px"}
							/>
							{formik.touched.email && formik.errors.email && (
								<FormErrorMessage>
									{formik.errors.email}
								</FormErrorMessage>
							)}{" "}
							{/* tambah ini */}
						</FormControl>
						<FormControl
							isInvalid={
								formik.touched.password && formik.errors.password
							}
							display="flex"
							flexDirection="column"
							justifyContent="center"
						>
							{" "}
							{/* tambah ini */}
							<FormLabel>Password</FormLabel>
							<Input
								type="password"
								name="password"
								value={formik.values.password}
								onChange={formik.handleChange}
								borderRadius="5px"
								bgColor="transparent"
								border="1px solid black"
								h="30px"
								color="black"
								pl={"5px"}
							/>
							{formik.touched.password && formik.errors.password && (
								<FormErrorMessage>
									{formik.errors.password}
								</FormErrorMessage>
							)}{" "}
							{/* tambah ini */}
						</FormControl>
						<Box display={"flex"} justifyContent={"center"}>
							<Button
								type="submit"
								mt="30px"
								p="6px 20px"
								textAlign="center"
								fontSize="16px"
								justifyContent={"center"}
								bgColor={"#400f68"}
								color={"white"}
							>
								Login
							</Button>
						</Box>
					</Box>
				</form>
				<Box>
					<Text>
						Belum punya akun <Link to="/register">Register</Link>
					</Text>
				</Box>
			</Box>
		</Box>
	);
};
