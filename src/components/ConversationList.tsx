import { Link, useLocation } from "react-router-dom";

import { ScrollArea } from "./ui/scroll-area";
import { ScrollShadow } from "@nextui-org/react";
import { useConversations } from "@/hooks/useConversations";

export const ConversationList = () => {
    const conversations = useConversations();

    const path = useLocation();

    return (
        <ScrollArea className="flex flex-col">
            <div className="flex flex-col h-ful mt-4 gap-1">
                {conversations?.map((conversation) => (
                    <ScrollShadow
                        orientation="horizontal"
                        key={conversation.id}
                        className={`${
                            path.pathname.split("/")[2] == conversation.id
                                ? "bg-muted"
                                : ""
                        } w-full max-w-[100px] md:max-w-[210px] hover:bg-muted transition-colors pt-2 pb-2 rounded-lg cursor-pointer`}
                    >
                        <Link
                            key={conversation.id}
                            to={`/chat/${conversation.id}`}
                            className="h-full rounded-lg text-sm"
                        >
                            <p className="w-[500px] ml-[-1px] pl-3 ">
                                {conversation.summary}
                            </p>
                        </Link>
                    </ScrollShadow>
                ))}
            </div>
        </ScrollArea>
    );
};
