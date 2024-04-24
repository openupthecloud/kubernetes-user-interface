// TODO: Add types

interface StatusMap {
    [key: string]: string | undefined
}

const StatusComponent = ({ status }: { status: string }) => {
    const mapStatuses: StatusMap = {
        "Running": "🟢"
    }
    return <span>{mapStatuses[status]} </span>
}

export { StatusComponent }