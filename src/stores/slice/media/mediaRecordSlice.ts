import { createSlice } from "@reduxjs/toolkit";

interface RecordState {
    mediaRecorder: MediaRecorder | undefined;
    isRecord: boolean;
}

const initialState: RecordState = {
    mediaRecorder:undefined,
    isRecord: false,
};

const startMediaRecord =  (payload:{stream:MediaStream,room_id:string, name:string}) => {
    try {
        if (payload.stream) {
            let options = {mimeType: 'video/webm; codecs=vp8'};
            let mediaRecorder = new MediaRecorder(payload.stream, options);
  
            let chunks :BlobPart[]= [];

            try{
                mediaRecorder.start();
            }catch (err){
                console.log("-----------err--------")
                console.log(err)
            }
  
            mediaRecorder.onstop = (e) => {
                const blob = new Blob(chunks);
                const audioURL = URL.createObjectURL(blob);
                const formData =new FormData();
                var newfile = new File([blob], payload.room_id+"-"+payload.name+".webm",{type:'video/webm'});
                formData.append('uploadfile',newfile)
          
                fetch('http://localhost:8080/minioupload', {
                    method: 'POST',
                    body: formData
                })
                .then(async res => {
                    let result_json :any =await res.json()
                    console.log(result_json)
                }).catch(err=>{
                    console.log(err)
                })
            };

            mediaRecorder.ondataavailable = (e) => {
                chunks.push(e.data);
            };
            return mediaRecorder
        }else{
            return undefined;
        }
    } catch (error) {
        throw new Error("Failed to start record");
    }
}
  
const stopMediaRecord = (mediaRecorder:MediaRecorder| undefined) => {
    try {
        mediaRecorder?.stop();
        return undefined
    } catch (error) {
        throw new Error("Failed to stop media stream");
    }
}


const mediaRecordSlice = createSlice({
  name: "mediaRecord",
  initialState,
  reducers: {
    toggleStartOrStop: (state) => {
      state.isRecord = !state.isRecord;
    },
    setStartMediaRecord: (state,action) => {
        console.log(action.payload)
        state.mediaRecorder = startMediaRecord(action.payload);
    },
    setStopMediaRecord: (state) =>{
        state.mediaRecorder = stopMediaRecord(state.mediaRecorder);
    },
  },
});

export const { 
    toggleStartOrStop,
    setStartMediaRecord,
    setStopMediaRecord,
 } = mediaRecordSlice.actions;
export default mediaRecordSlice.reducer;
