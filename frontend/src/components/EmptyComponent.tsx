type Condition = () => boolean

// TODO: is there a convention for this pattern?
type EmptyComponentProps = {
    children: React.ReactNode,
    condition: Condition
}

const EmptyComponent = ({ children, condition }: EmptyComponentProps) => {
    return <>
        {condition() ?
            <>{children}</> :
            <div className="text-center text-white border-2 border-slate-700 p-4 mb-4"><p> No resources found </p></div >
        }
    </>
}

export { EmptyComponent }