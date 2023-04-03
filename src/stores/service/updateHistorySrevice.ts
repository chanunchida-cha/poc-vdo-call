
export const UpdateHistoryUserVideo = (room_id:string,fileName:string) =>{
    let json_data={
        userVideo:fileName
    }
    fetch('http://localhost:8080/history/'+room_id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(json_data)
    })
    .then(res => {
        console.log(res)
    }).catch(err=>{
        console.log(err)
    })
};


export const UpdateHistoryPharmacyVideo = (room_id:string,fileName:string) =>{
    let json_data={
        pharmacyVideo:fileName,
    }
    fetch('http://localhost:8080/history/'+room_id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(json_data)
    })
    .then(res => {
        console.log(res)
    }).catch(err=>{
        console.log(err)
    })
};

