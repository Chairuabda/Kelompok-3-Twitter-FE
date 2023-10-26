import { Box, Text, Image } from "@chakra-ui/react"
import Logo from "../../../assets/abstract.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserCircle } from "@phosphor-icons/react"

export const TopBar = () => {
    const [myAccount, setMyAccount] = useState()

	const accountsIndex = localStorage.getItem("akun")

	const fatchUser = async () => {
		try {
			const responseUser = await axios.get("http://localhost:3000/user")
			setMyAccount(responseUser.data[accountsIndex])
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		fatchUser();
	},[myAccount])

    return (
        <Box
					display="flex"
					justifyContent="space-between"
					h={"50px"}
					alignItems={"center"}
					position={"fixed"}
					left={"200"}
					right={"200"}
					color={"white"}
				>
					<Box display={"flex"} alignItems={"center"}>
						<Image src={Logo} h={"24px"} />
						<Text ml={"5px"}>MySosmed</Text>
					</Box>
					<Box
						border={"1px solid white"}
						py={"2px"}
						pl={"6px"}
						pr={"14px"}
						borderRadius={"20px"}
						display={"flex"}
						alignItems={"center"}
						cursor={"pointer"}
						_hover={{bgColor: "rgba(255, 255, 255, 0.3)", color: "white", borderColor: "transparent"}}
					> {/* tambah ini */}
						<UserCircle size={28} />	{/* tambah ini */}
						{myAccount?.email}
					</Box>
				</Box>
    )
}