import { myAxios } from "./Helper";

export const loadAllCategory=()=>{
    return myAxios.get(`/api/categories/`).then((response=>{return response.data}));
}


