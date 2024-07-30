import Button from "./Button";

export default function ButtonBoard({themenumber, handleclickvalue}){
    return(
        <div className= {"button-board w-100 bg-toogle-" + themenumber}>
            <div className="board-row">
                <Button value={"7"} themenumber={themenumber} handleclickvalue={handleclickvalue}/>
                <Button value={"8"} themenumber={themenumber} handleclickvalue={handleclickvalue}/>
                <Button value={"9"} themenumber={themenumber} handleclickvalue={handleclickvalue}/>
                <Button value={"DEL"} themenumber={themenumber} handleclickvalue={handleclickvalue}/>
            </div>
            <div className="board-row">
                <Button value={"4"} themenumber={themenumber} handleclickvalue={handleclickvalue}/>
                <Button value={"5"} themenumber={themenumber} handleclickvalue={handleclickvalue}/>
                <Button value={"6"} themenumber={themenumber} handleclickvalue={handleclickvalue}/>
                <Button value={"+"} themenumber={themenumber} handleclickvalue={handleclickvalue}/>
            </div>
            <div className="board-row">
                <Button value={"1"} themenumber={themenumber} handleclickvalue={handleclickvalue}/>
                <Button value={"2"} themenumber={themenumber} handleclickvalue={handleclickvalue}/>
                <Button value={"3"} themenumber={themenumber} handleclickvalue={handleclickvalue}/>
                <Button value={"-"} themenumber={themenumber} handleclickvalue={handleclickvalue}/>
            </div>
            <div className="board-row">
                <Button value={"."} themenumber={themenumber} handleclickvalue={handleclickvalue}/>
                <Button value={"0"} themenumber={themenumber} handleclickvalue={handleclickvalue}/>
                <Button value={"/"} themenumber={themenumber} handleclickvalue={handleclickvalue}/>
                <Button value={"x"} themenumber={themenumber} handleclickvalue={handleclickvalue}/>
            </div>
            <div className="board-row" themenumber={themenumber} >
            <Button value={"RESET"} themenumber={themenumber} handleclickvalue={handleclickvalue}/>
            <Button value={"="} themenumber={themenumber} handleclickvalue={handleclickvalue}/>
            </div>
        </div>
    )
}