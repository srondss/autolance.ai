import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import { Logo } from "./Logo";
import { ScrollShadow } from "@nextui-org/react";
import { useChat } from "@/hooks/useChat";
import { useLocation } from "react-router-dom";

export default function Chat() {
    const path = useLocation();

    const conversation = useChat({ id: path?.pathname.split("/")[2] });

    console.log(conversation);

    return (
        <div className="flex flex-col w-full h-[6000px] overflow-auto ">
            <ScrollShadow orientation="vertical" className="h-full">
                <div className="flex flex-col gap-2 h-full">
                    <div className="flex gap-2">
                        <Logo />
                        <div className="flex flex-col items-center justify-center">
                            <span className="font-semibold">AI Fiverr</span>
                        </div>
                    </div>
                    <div className="pb-4">
                        <p>Hello! How can I help you today?</p>
                    </div>

                    {path.pathname === "/" ? (
                        <></>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {conversation?.chatHistory?.map((message) => (
                                <div key={message.id} className={`pt-4 pb-4`}>
                                    <div
                                        key={message.id}
                                        className={`flex gap-2`}
                                    >
                                        {message.author === "user" ? (
                                            <Avatar className="h-[32px] w-[32px]">
                                                <AvatarImage
                                                    src="https://github.com/shadcn.png"
                                                    alt="@shadcn"
                                                />
                                                <AvatarFallback>
                                                    CN
                                                </AvatarFallback>
                                            </Avatar>
                                        ) : (
                                            <Logo />
                                        )}
                                        <div className="flex flex-col items-center justify-center">
                                            <span className="font-semibold">
                                                {message.author === "user"
                                                    ? "You"
                                                    : "AI Fiverr"}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <p>{message.message}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </ScrollShadow>
        </div>
    );
}
