import { Conversation } from "@/types/Conversation";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

/*
Makes an api call to the backend and return the list of conversations.
*/
export const useConversations = () => {
    const {
        data: conversations,
        isError,
        isLoading,
        refetch: refetchConversationsList,
    } = useQuery({
        queryKey: ["conversations"],
        queryFn: async () => {
            const token = localStorage.getItem("accessToken");

            const response = await axios.get(
                "http://localhost:3000/chat/conversations",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(response.data);

            return response.data as Conversation[];
        },
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });

    return { conversations, isError, isLoading, refetchConversationsList };
};
