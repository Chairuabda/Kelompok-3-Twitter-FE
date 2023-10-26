import {
	Box,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableContainer,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { SideNavbar } from "../SideNavbar";
import { TopBar } from "../TopBar";
import { UserMinus } from "@phosphor-icons/react"

export const ProfileUser = () => {
	const [allUser, setAllUser] = useState([]);

	const fatchData = async () => {
		try {
			const userAccounts = await axios.get(
				"http://localhost:3000/user"
			);
			setAllUser(userAccounts.data);
			console.log(allUser);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fatchData();
	}, [allUser]);

	return (
		<Box
			w={"100vw"}
			h={"100vh"}
			display={"flex"}
			justifyContent={"center"}
			bgImage="url('/src/assets/wickedbackground.svg')"
			color={"white"}
		>
			<TopBar />
			<Box mt={"50px"}>
				<SideNavbar />
			</Box>
			<Box
				w={"65%"}
				display={"flex"}
				// bgColor={"green"}
				// alignItems={"center"}
				justifyContent={"end"}
			>
				<Box
					w={"85%"}
					mt={"150px"}
					// bgColor={"red"}
					display={"flex"}
					justifyContent={"end"}
                    
				>
					{/* <Text>Profile User</Text> */}
					<TableContainer w={"800px"} >
						<Table variant="simple" colorScheme="teal">
							<Thead>
								<Tr >
									<Th textAlign={"center"} color={"white"}>Username</Th>
									<Th textAlign={"center"} color={"white"}>Email</Th>
									<Th textAlign={"center"} color={"white"}>Password</Th>
									<Th textAlign={"center"} color={"white"}>Dellet Account</Th>
								</Tr>
							</Thead>
							{allUser?.length > 0 ? (
								allUser.map((user, index) => {
									return (
										<Tbody key={index}>
											<Tr>
												<Td textAlign={"center"}>{user.username}</Td>
												<Td textAlign={"center"}>{user.email}</Td>
												<Td textAlign={"center"}>{user.password}</Td>
												<Td display={"flex"} justifyContent={"center"}><UserMinus size={32} cursor={"pointer"} onClick={(() => {axios.delete(`http://localhost:3000/user/${user.id}`)})} /></Td>
											</Tr>
										</Tbody>
									);
								})
							) : (
								<></>
							)}
						</Table>
					</TableContainer>
				</Box>
			</Box>
		</Box>
	);
};
