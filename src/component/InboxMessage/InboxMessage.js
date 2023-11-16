import React, { useEffect ,useState} from 'react'
import { useParams } from 'react-router-dom'
const InboxMessage = () => {
    const param = useParams()
    let [updatedData , setUpdatedData] = useState()
    let senderMail = localStorage.getItem("boxEmail")
    let sender;
    sender = senderMail.replaceAll("@","");
    let sender2 = sender.replaceAll(".","")
   // console.log(param.item);

    useEffect(() => {
     fetch(`https://mail-box-41ac6-default-rtdb.firebaseio.com/inbox/${sender2}.json`)
     .then(res => res.json())
     .then(resp => {
        if(resp.error){
            alert(resp.error.message)
        }
        else{
            let myObj;
    
            for(let key in resp){  
                if(resp[key].subject.replaceAll(" ","") == param.item.replaceAll(" ", "")) {
                    myObj = resp[key]
                    console.log(key)
                   
                 fetch(`https://mail-box-41ac6-default-rtdb.firebaseio.com/inbox/${sender2}/${key}.json`,{
                    
                 method : 'PUT',
                 body : JSON.stringify({
                        From : resp[key].From ,
                        subject : resp[key].subject,
                        body : resp[key].body,
                        isRead : true
                      }) 
                    })
                 .then(res => res.json())
                 .then(resp => {
                    console.log(resp)
                 })
                
                    console.log(myObj)
                }
            }
            setUpdatedData(myObj);
        }
     })
    },[param])
  return (
    <div>
   {updatedData && <p>{updatedData.body}</p>}
    </div>
  )
}

export default InboxMessage
