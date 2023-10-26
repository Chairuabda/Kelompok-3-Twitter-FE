/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Text, Button, Input } from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import {
	Image,
	Microphone,
	MapPin,
	XCircle,
	UserCircle,
} from "@phosphor-icons/react";

const tweetScheme = Yup.object().shape({
	tweet: Yup.string().required(),
});

export const MidSection = () => {
	const [allTweet, setAllTweets] = useState([]);
	const [date, setDates] = useState("");
	const [myAccount, setMyAccount] = useState();

	const indexAccount = localStorage.getItem("akun");

	const tweets = async (tweet, time, username) => {
		try {
			await axios.post("http://localhost:8000/tweet", {
				tweet,
				time,
				username,
			});
		} catch (err) {
			console.log(err);
		}
	};

	const time = () => {
		const time = new Date();
		const foromatedTime = time.toLocaleString();
		setDates(foromatedTime);
	};

	const fatchData = async () => {
		try {
			const responseTweet = await axios.get(
				"http://localhost:8000/tweet"
			);
			const responseUser = await axios.get(
				"http://localhost:3000/user"
			);
			setAllTweets(responseTweet.data);
			setMyAccount(responseUser.data[indexAccount]);
			time();
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fatchData();
	}, [allTweet]);

	const formikTweet = useFormik({
		initialValues: {
			username: "",
			tweet: "",
			time: "",
		},
		validationSchema: tweetScheme,
		onSubmit: (values) => {
			tweets(values.tweet, date, myAccount.username);
			formikTweet.values.tweet = "";
		},
	});
	return (
		<Box
			minH={"100vh"}
			w={"48%"}
			boxShadow={'0px 6px 13px 3px rgba(255, 255, 255, 0.2)'}
			outline={"3px solid rgba(255, 255, 255, 0.1)"}
			borderRadius={"10px"}
			// border={"1px solid white"}
			position={"relative"}
			left={"-90"}
			mb={"30px"}
			pb={"50px"}
			color={"white"}
		>
			<Box
				display={"flex"}
				flexDirection={"column"}
				justifyContent={"center"}
				alignItems={"center"}
				mt={"20px"}
			>
				<Box
					w={"80%"}
					_focus={{ border: "none", outline: "transparent" }}
					_active={{ border: "none", outline: "none" }}
				>
					<form onSubmit={formikTweet.handleSubmit}>
						<Box
							display={"flex"}
							flexDirection={"column"}
							alignItems={"end"}
						>
							<Input
								name="tweet"
								value={formikTweet.values.tweet}
								onChange={formikTweet.handleChange}
								type="textarea"
								variant={"unstyled"}
								h={"80px"}
								outlineColor={"transparent"}
								fontSize={"20px"}
								placeholder="What's happening?"
							/>

							<Box
								display={"flex"}
								w={"95%"}
								mb={"10px"}
								justifyContent={"space-between"}
								alignItems={"center"}
							>
								<Box display={"flex"}>
									<Image size={26} cursor={"pointer"} />
									<Box m={"0px 15px"}>
										<Microphone size={26} cursor={"pointer"} />
									</Box>
									<MapPin size={26} cursor={"pointer"} />
								</Box>
								<Button justifyContent={"end"} type="submit">
									Posting
								</Button>
							</Box>
						</Box>
					</form>
				</Box>

				<Box w={"80%"} borderTop={"1px solid white"}>
					{allTweet?.length > 0 ? (
						allTweet
							.map((items, index) => {
								return (
									<Box
										key={index}
										borderRadius={"10px"}
										mt={"10px"}
										p={"10px 30px 0px 60px"}
										boxShadow={"md"}
										bgColor={"rgba(255, 255, 255, 0.3)"}
									>
										<Box
											display={"flex"}
											justifyContent={"space-between"}
											alignItems={"center"}
											h={"30px"}
										>
											<Box
												display={"flex"}
												justifyContent={"start"}
												alignItems={"center"}
												h={"30px"}
												mt={"10px"}
												ml={"-40px"}
											>
												{" "}
												{/* tambah ini */}
												<UserCircle size={30} />
												<Text
													alignItems={"center"}
													fontWeight={"600"}
													ml={"5px"}
												>
													@{items.username}
												</Text>
												<Text
													fontSize={"10px"}
													alignItems={"end"}
													ml={"30px"}
												>
													{items.time}
												</Text>
											</Box>
											<Box position={"relative"} right={"-5"}>
												<XCircle
													size={18}
													cursor={"pointer"}
													onClick={() => {
														axios.delete(
															`http://localhost:8000/tweet/${items.id}`
														);
													}}
												/>{" "}
												{/* tambah ini */}
											</Box>
										</Box>
										<Box p={"20px 0"}>
											<Text textAlign={"justify"}>{items.tweet}</Text>
										</Box>
									</Box>
								);
							})
							.reverse()
					) : (
						<Box
							display={"flex"}
							justifyContent={"center"}
							mt={"50px"}
						>
							<Text>
								Postingan masih kosong, ayo bagikan postingan mu
							</Text>
						</Box>
					)}
				</Box>
			</Box>
		</Box>
	);
};
