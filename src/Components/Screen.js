export default function Screen({themenumber, screenvalue}){
    return(
        <div className={"screen w-100 d-flex justify-content-end align-items-center bg-screen-" + themenumber}>
            {screenvalue}
        </div>
    )
}