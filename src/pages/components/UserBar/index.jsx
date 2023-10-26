import { Box, Text, Button } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserCircle } from "@phosphor-icons/react";

export const UserBar = () => {
	const [allUser, setAllUser] = useState([]); // tambah ini

	const fatchData = async () => {
		try {
			const responseUser = await axios.get(
				"http://localhost:3000/user"
			);
			const user = responseUser.data;
			setAllUser(user.map((item) => item.username));
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fatchData();
	}, []);

	const indexAccount = localStorage.getItem("akun") // tambah ini
	const filterUser = allUser.filter((item) => item !== allUser[indexAccount])  // tambah ini

	return (
		<Box
			w={"25%"}
			minH={"100vh"}
			display={"flex"}
			justifyContent={"start"}
			position={"fixed"}
			right={"145"}
			overflow={"hidden"}
			color={"white"}
		>
			<Box
				display={"flex"}
				flexDirection={"column"}
				h={"fit-content"}
				justifyContent={"center"}
				// bgColor={"white"}
				borderRadius={"20px"}
				w={"90%"}
				alignItems={"center"}
			>
				<Box m={"20px 0"}>
					<Text fontSize={"22px"} mb={"0"}>
						Who to follow
					</Text>
				</Box>

				{allUser?.length > 0 ? (
					filterUser.map((user, index) => {
						{/* ganti ini */}
						return (
							<Box
								display={"flex"}
								bgColor={"rgba(255, 255, 255, 0.3)"}
								p={"10px"}
								w={"75%"}
								borderRadius={"5px"}
								color={"white"}
								m={"2px"}
								key={index}
								alignItems={"center"}
							> {/* tambah ini */}
								<UserCircle size={30} />
								<Text m={"0"} fontSize={"14px"}>@{user}</Text> {/* ganti ini */}
							</Box>
						);
					})
				) : (
					<></>
				)}
				<Box color={"black"} m={"20px"} fontSize={"12px"}>
					<Link to="/profileuser">
						<Button
							variant={"link"}
							border={"none"}
							_focus={{ border: "none", outline: "none" }}
							color={"white"}
						>
							see more
						</Button>
					</Link>
				</Box>
			</Box>
		</Box>
	);
};
