import { Box, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const SideNavbar = () => {

	return (
				<Box w={{ base: "20%", md: "15%" }}
					display={"flex"}
					justifyContent={"end"}
					position={"fixed"}
					left={"145"}
					h={"90%"}
					borderRadius={"20px"}
					color={"white"}
				>
					<Box
						display="flex"
						flexDirection={"column"}
						textAlign={"start"}
						w={"80%"}
						h={"100%"}
						justifyContent={"space-between"}
					>
						<Box display={"flex"} flexDirection={"column"}>
							<Link to="/home">
								<Text borderRadius={"10px"} p={"10px"} mb={"5px"} bgColor={"rgba(255, 255, 255, 0.3)"} _hover={{bgColor: "rgba(255, 255, 255, 0.6)", color: "black"}}>
									Home
								</Text>
							</Link>
							<Link>
								<Text borderRadius={"10px"} p={"10px"} mb={"5px"} bgColor={"rgba(255, 255, 255, 0.3)"} _hover={{bgColor: "rgba(255, 255, 255, 0.6)", color: "black"}}>
									Notification
								</Text>
							</Link>
							<Link>
								<Text borderRadius={"10px"} p={"10px"} mb={"5px"} bgColor={"rgba(255, 255, 255, 0.3)"} _hover={{bgColor: "rgba(255, 255, 255, 0.6)", color: "black"}}>
									Messaged
								</Text>
							</Link>
							<Link>
								<Text borderRadius={"10px"} p={"10px"} mb={"5px"} bgColor={"rgba(255, 255, 255, 0.3)"} _hover={{bgColor: "rgba(255, 255, 255, 0.6)", color: "black"}}>
									Profile
								</Text>
							</Link>
						</Box>
						<Link to="/">
							<Button mt={"20px"} bgColor={"rgba(255, 255, 255, 0.3)"} color={"white"} _hover={{bgColor: "rgba(255, 255, 255, 0.6)", color: "black", borderColor: "transparent"}} onClick={() => localStorage.removeItem("akun")}>Log Out</Button> {/* tambah ini */}
						</Link>
					</Box>
				</Box>
			
	);
};
