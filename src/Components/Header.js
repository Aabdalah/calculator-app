export default function Header({themenumber,handleClickTheme}){
    return(
        <div className="header w-100 d-flex align-items-center justify-content-between">
            <h1>calc</h1>
            <div className="d-flex align-items-center">
                <span>THEME</span>
                <button onClick={handleClickTheme} className={"bg-toogle-" + themenumber}>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <div className={"red-ball-pos-" + themenumber + " red-"+themenumber + " hover-1-theme-" + themenumber}></div>
                </button>
            </div>
        </div>
    )
}