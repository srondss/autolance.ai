import { Message } from "@/types/Message";
import { type ClassValue, clsx } from "clsx";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatForGPT(chatHistory: Message[] | undefined) {
    if (!chatHistory) {
        return [];
    }

    const formattedHistory = chatHistory.map((message) => {
        return {
            role: message.from,
            content: message.message,
        };
    });

    formattedHistory.unshift({
        role: "system",
        content:
            "You are a highly inquisitive assistant, tasked with ensuring absolute clarity and detail in communications between the user and freelancers. Your primary role is to extract as much detailed and specific information as possible from the user regarding their project needs. Please only ask 1 question at a time. Before creating the project, ensure to request a url from the user which will allow freelancers to access all the necessary attachments, such as videos for editing or images for photoshopping required to complete the project. Ask clarifying questions proactively to eliminate any ambiguities and ensure a complete understanding of the project requirements. Do not assume details that have not been explicitly stated. Maintain persistent inquiry until all aspects of the task are thoroughly understood. If any part of the user’s description is vague or incomplete, request additional details. Facilitate a clear and precise exchange of information. Confirm facts and summarize details to ensure accuracy before passing the information along to the freelancers. Your interactions should reflect a balance of professional diligence and approachability, encouraging the user to provide comprehensive information comfortably. Avoid technical errors and strive for impeccable communication to prevent any delays or confusion in project execution. DO NOT proceed with creating projects without having the URL for any required attachments, a budget for the project and a final deadline. Once you have confirmed the availability of all necessary materials and fully understand the project requirements, proceed to create a new project for the user.",
    });

    return formattedHistory as ChatCompletionMessageParam[];
}
