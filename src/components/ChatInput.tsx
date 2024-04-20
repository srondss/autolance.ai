import { Loader, SendHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Message } from "@/types/Message";
import { useChat } from "@/hooks/useChat";
import { useChatActions } from "@/hooks/useChatActions";
import { useConversations } from "@/hooks/useConversations";
import { useGPT } from "@/hooks/useGPT";
import { useToast } from "./ui/use-toast";

export const ChatInput = () => {
    const location = useLocation();
    const conversationId = location.pathname.split("/")[2];
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const { chatHistory, refetchChatMessages, getChatMessages } = useChat({
        id: conversationId,
    });
    const { generateAIResponse } = useGPT();
    const { refetchConversationsList } = useConversations();
    const { sendMessageNewChat, sendMessageExistingChat } = useChatActions();

    // Clear the chat inputted text when the user goes to a different page
    useEffect(() => {
        setMessage("");
    }, [location.pathname]);

    async function onSendMessage() {
        setLoading(true);
        try {
            // if this is a new chat, send the message and navigate to the chat
            if (location.pathname === "/") {
                const response = await sendMessageNewChat(message, "user");

                const latestChatHistory = await getChatMessages(
                    response.conversation_id
                );

                // Send the message to GPT
                // console.log("Chat history being sent:", latestChatHistory);
                await generateAIResponse(
                    latestChatHistory as Message[],
                    response.conversation_id
                );

                // Refetch the chat messages
                await refetchConversationsList();
                await refetchChatMessages();
                navigate(`/chat/${response.conversation_id}`);
            } else {
                // if this is an existing chat, send the message
                setMessage("");
                const conversationId = location.pathname.split("/")[2];
                await sendMessageExistingChat(message, conversationId, "user");
                await refetchChatMessages();

                // Send the message to GPT
                await generateAIResponse(
                    chatHistory as Message[],
                    conversationId
                );
                await refetchChatMessages();
            }
            setMessage("");
        } catch (error) {
            console.error("Failed to send message:", error);
            toast({
                title: "Failed to send message",
                description:
                    "Something went wrong while sending the message. Please try again.",
                variant: "destructive",
            });
        }
        setLoading(false);
    }

    return (
        <div className="flex items-end h-full w-full gap-2 ">
            <Input
                placeholder="Ask me something..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <Button
                variant="secondary"
                onClick={onSendMessage}
                disabled={loading}
            >
                {loading ? (
                    <Loader className="animate-spin" />
                ) : (
                    <SendHorizontal />
                )}
            </Button>
        </div>
    );
};
