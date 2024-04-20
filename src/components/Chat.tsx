import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import { Logo } from "./Logo";
import { ScrollShadow } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useChat } from "@/hooks/useChat";
import { useLocation } from "react-router-dom";

export default function Chat() {
    const path = useLocation();

    const conversation = useChat({ id: path?.pathname.split("/")[2] });

    return (
        <div className="flex flex-col w-full h-[6000px] overflow-auto ">
            <ScrollShadow orientation="vertical" className="h-full">
                <div className="flex flex-col gap-2 h-full">
                    {path.pathname === "/" ? (
                        <div className="flex flex-col h-full justify-center items-center">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1.5 }}
                            >
                                <div className="flex flex-col gap-2 items-center">
                                    <Logo />
                                    <p className="text-sm md:text-xl">
                                        Meet Giggy AI, your personal assistant
                                        for all your freelance needs.
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    ) : (
                        <motion.div
                            className="flex flex-col gap-4"
                            initial={{ opacity: 0, y: 700 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        >
                            {conversation?.chatHistory?.map((message) => (
                                <div
                                    key={message.message_id}
                                    className={`pt-4 pb-4`}
                                >
                                    <div className={`flex gap-2`}>
                                        {message.from === "user" ? (
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
                                                {message.from === "user"
                                                    ? "You"
                                                    : "Giggy"}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <p>{message.message}</p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </ScrollShadow>
        </div>
    );
}
