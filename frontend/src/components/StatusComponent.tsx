// TODO: Add types

interface StatusMap {
    [key: string]: string
}

const StatusComponent = ({ status }: { status: string }) => {
    const mapStatuses: StatusMap = {
        "Running": "🟢",
        "Pending": "🟠"
    }
    return <span>{mapStatuses[status]} </span>
}

export { StatusComponent }