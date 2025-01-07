function Die(props) {

    return (
     
       <button 
       className={props.isHeld? "held" :"numberBtn"} onClick={()=>{props.hold(props.id)}}>{props.value}</button>
     
    )
  }
  
  export default Die