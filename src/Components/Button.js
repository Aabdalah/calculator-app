export default function Button({value, themenumber,handleclickvalue}){
    return(
        <button className={"d-flex justify-content-center align-items-center red-"+themenumber + " hover-1-theme-" + themenumber + " key-bg-"+themenumber +" key-bg-hover-"+themenumber+" key-bg-2-theme-"+themenumber + " key-bg-2-hover-theme-"+themenumber + " btn-text-color-theme-"+themenumber} onClick={()=>handleclickvalue(value)}>{value}</button>
    )
}