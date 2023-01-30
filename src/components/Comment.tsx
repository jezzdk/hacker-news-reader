import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import HTMLView from "react-native-htmlview";
import useHackerNews from "../hooks/useHackerNews";
import { CommentInterface } from "../types";

interface Props {
	comment: CommentInterface;
	level: number;
}

const Comment = ({ comment, level }: Props) => {
	if (comment.deleted || comment.dead) {
		return;
	}

	const [replies, setReplies] = useState<CommentInterface[]>();
	const { fetchKids } = useHackerNews();

	const fetchReplies = async () => {
		let items = await fetchKids(comment.kids);

		if (items) {
			setReplies(items);
		}
	};

	useEffect(() => {
		if (comment.kids?.length > 0 && !replies) {
			fetchReplies();
		}
	}, [comment]);

	return (
		<View style={{ marginLeft: level === 1 ? 0 : 15 }} className="mb-4">
			<View className="flex flex-row gap-2">
				<Text className="font-bold">{comment.by}</Text>
				<Text className="text-gray-500">
					({dayjs(comment.time * 1000).fromNow()}):
				</Text>
			</View>
      <HTMLView value={comment.text} />
			{replies?.map((reply) => (
				<View key={reply.id} className="border-l-2 border-gray-300 mt-4">
					<Comment comment={reply} level={level + 1} />
				</View>
			))}
		</View>
	);
};

export default Comment;
