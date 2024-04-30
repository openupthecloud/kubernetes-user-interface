import { Square2StackIcon, ArrowPathIcon, StopCircleIcon, ArrowDownOnSquareStackIcon, CubeIcon } from '@heroicons/react/24/solid'

type icons = "StopCircleIcon" | "Square2StackIcon" | "ArrowDownOnSquareStackIcon" | "CubeIcon"

interface HeaderComponentProps {
    text: string,
    icon: icons,
    count: number,
    refresh: () => void
}

const HeaderComponent = ({
    icon,
    count,
    refresh,
    text
}: HeaderComponentProps) => {
    return <h2 className="text-xl text-white font-bold bg-gray-700 p-2 mb-4 rounded-md border-b-4 border-gray-500 border-solid">
        {icon === "StopCircleIcon" && <StopCircleIcon className="h-8 w-8 inline pr-2" />}
        {icon === "Square2StackIcon" && <Square2StackIcon className="h-8 w-8 inline pr-2" />}
        {icon === "ArrowDownOnSquareStackIcon" && <ArrowDownOnSquareStackIcon className="h-8 w-8 inline pr-2" />}
        {icon === "CubeIcon" && <CubeIcon className="h-8 w-8 inline pr-2" />}
        {text} ({count || 0})
        <button className="float-right" onClick={refresh} >
            <ArrowPathIcon className="h-8 w-8 inline pr-2"></ArrowPathIcon>
        </button>
    </h2>
}

export { HeaderComponent }