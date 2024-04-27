interface MessageMap {
    [key: string]: string
}

const MessageIcon = ({ message }: { message: string }) => {
    const defaultKey = "Unknown";
    const mapMessages: MessageMap = {
        "Stopping container": "🔴",
        "Created container": "🟢",
        "Started container": "🟢",
        "Successfully assigned": "🟢",
        "Created pod": "🟢",
        "Successfully pulled image": "🟢",
        "Insufficient cpu": "❌",
        "Pulling image": "🟠",
        "Unknown": "⁉️"
    }
    const foundKey = Object
        .keys(mapMessages)
        .find((messageKey) => message?.includes(messageKey))
    const key = foundKey || defaultKey;
    const icon = mapMessages[key];

    return <span>{icon}</span>
}

export { MessageIcon }