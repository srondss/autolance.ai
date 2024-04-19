interface ChatProps {
    id: string;
}

/*
Makes an api call to the backend and return the chat history of a specific conversation.
*/
export const useChat = ({ id }: ChatProps) => {
    const conversations = [
        {
            id: "1",
            chatHistory: [
                {
                    id: "hashed-string1",
                    author: "user",
                    message:
                        "Hello, I'm looking for a developer to help me make my website mobile-friendly.",
                },
                {
                    id: "hashed-string2",
                    author: "bot",
                    message:
                        "Sure! I can help you with that. What is your budget?",
                },
                {
                    id: "hashed-string3",
                    author: "user",
                    message: "I have a budget of $500.",
                },
                {
                    id: "hashed-string4",
                    author: "bot",
                    message:
                        "Great! Do you have any specific requirements for the website?",
                },
                {
                    id: "hashed-string5",
                    author: "user",
                    message:
                        "The website should be responsive across all devices.",
                },
                {
                    id: "hashed-string6",
                    author: "bot",
                    message:
                        "Of course, what is your preferred deadline for this project?",
                },
                {
                    id: "hashed-string7",
                    author: "user",
                    message:
                        "I would like the project to be completed within 2 weeks.",
                },
                {
                    id: "hashed-string8",
                    author: "bot",
                    message:
                        "Understood. Can you share the link to your website?",
                },
                {
                    id: "hashed-string9",
                    author: "user",
                    message: "Sure, here is the link: https://example.com",
                },
                {
                    id: "hashed-string10",
                    author: "bot",
                    message:
                        "Thank you! We will get started on your project right away.",
                },
            ],
        },
    ];

    const chat = conversations.find((conversation) => conversation.id === id);

    return chat;
};
