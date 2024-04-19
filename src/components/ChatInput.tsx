import { useEffect, useState } from "react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SendHorizontal } from "lucide-react";
import { useLocation } from "react-router-dom";

export const ChatInput = () => {
    const location = useLocation();
    const [message, setMessage] = useState("");

    // Clear the chat inputted text when the user goes to a different page
    useEffect(() => {
        setMessage("");
    }, [location.pathname]);

    return (
        <div className="flex items-end h-full w-full ">
            <Input
                placeholder="Ask me something..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <Button variant="secondary">
                <SendHorizontal />
            </Button>
        </div>
    );
};
