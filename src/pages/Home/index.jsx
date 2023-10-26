import { Box } from "@chakra-ui/react";
import { SideNavbar } from "../components/SideNavbar";
import { UserBar } from "../components/UserBar";
import { MidSection } from "../components/MidSection";
import { TopBar } from "../components/TopBar";

export const Home = () => {

	
 
	return (
		<Box
			w="100vw"
			minH={"100vh"}
			display={"flex"}
			// bgColor={"#eff0f3"}
			justifyContent={"center"}
			color={"black"}
			overflow={"hidden"}
			bgImage="url('/src/assets/wickedbackground.svg')"
			bgAttachment={"fixed"}
		>
			<Box
				display="flex"
				flexDirection="column"
				w={"95%"}
				m={"0px 200px"}
			>
				<TopBar/>

				<Box
					display="flex"
					w="100%"
					justifyContent={"center"}
					minH={"100vh"}
					mt={"50px"}
				>
					<SideNavbar />

					<MidSection />

					<UserBar />
				</Box>
			</Box>
		</Box>
	);
};
