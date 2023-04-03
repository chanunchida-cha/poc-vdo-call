import { UpdateHistoryPharmacyVideo, UpdateHistoryUserVideo } from "@/stores/service/updateHistorySrevice";
import { createSlice } from "@reduxjs/toolkit";

interface RecordState {
    mediaRecorder: MediaRecorder | undefined;
    isRecord: boolean;
}

const initialState: RecordState = {
    mediaRecorder:undefined,
    isRecord: false,
};

const startMediaRecord =  (payload:{stream:MediaStream, room_id:string, name:string}) => {
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
          
                fetch('http://localhost:8080/minio/upload', {
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
  
const startMediaRecordCombineAudio =  (payload:{stream:MediaStream, yourstream:MediaStream, room_id:string,role:string}) => {
    try {
        if (payload.stream && payload.yourstream) {
            let options = {mimeType: 'video/webm; codecs=vp8'};

            const ctx = new AudioContext();
            const dest = ctx.createMediaStreamDestination();
            ctx.createMediaStreamSource(payload.stream).connect(dest)
            ctx.createMediaStreamSource(payload.yourstream).connect(dest)

            const videoTrack = payload.yourstream.getVideoTracks()[0];
            const mixedTracks = dest.stream.getAudioTracks()[0];

            if( videoTrack !== undefined && mixedTracks !== undefined){
                const stream = new MediaStream([videoTrack, mixedTracks]);
                
                let mediaRecorder = new MediaRecorder(stream, options);
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
                    var newfile = new File([blob], payload.room_id+"-"+payload.role+".webm",{type:'video/webm'});
                    console.log("payload room id:",payload.room_id)
                    formData.append('uploadfile',newfile)
          
                    fetch('http://localhost:8080/minio/upload', {
                        method: 'POST',
                        body: formData
                    })
                    .then(async res => {
                        let result_json :any =await res.json()
                        console.log(result_json)
                        try{
                            if(payload.role ==="user"){
                                UpdateHistoryUserVideo(payload.room_id,result_json.data[0].file_path)
                            }else if(payload.role ==="doctor"){
                                UpdateHistoryPharmacyVideo(payload.room_id,result_json.data[0].file_path)
                            }    
                        }catch{

                        }
                    }).catch(err=>{
                        console.log(err)
                    })
                };
                mediaRecorder.ondataavailable = (e) => {
                    chunks.push(e.data);
                };
                return mediaRecorder
            }else{
                return undefined
            }

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
        state.mediaRecorder = startMediaRecord(action.payload);
    },
    setStartMediaRecordCombineAudio: (state,action) => {
        console.log("record:", action.payload)
        state.mediaRecorder = startMediaRecordCombineAudio(action.payload);
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
    setStartMediaRecordCombineAudio
 } = mediaRecordSlice.actions;
export default mediaRecordSlice.reducer;
