// TODO: Add type
const EmptyComponent = ({ children, condition }: { children: React.ReactNode, condition: any }) => {
    return <>
        {condition() ?
            <>{children}</> :
            <div className="text-center text-white border-2 border-slate-700 p-4 mb-4"><p> No resources found </p></div >
        }
    </>
}

export { EmptyComponent }