export function reducer(state, action){
    switch (action.type) {
        case 'GET-DATA':{
            const {payload} = action
           
            const filteredData = state.allData.filter(ext=>{
                if(payload === 'all'){
                    return true
                }else if(payload === 'active'){
                    return ext.isActive === true
                }else {
                    return ext.isActive === false
                }
            })

            return {
                ...state,
                data: filteredData,
                currentFilter: payload
            }
        }
            
        case 'REMOVE_EXT':
           const newDataExt = state.allData.filter((ext)=>{return ext.name !== action.payload})
           const FilteredData = newDataExt.filter(ext => {
               if (state.currentFilter === 'all') return true;
               if (state.currentFilter === 'active') return ext.isActive;
               if (state.currentFilter === 'inactive') return !ext.isActive;
            });

            return {
             ...state, data: FilteredData, allData: newDataExt
            }
        
        case 'TOGGLE-ACTIVE':{
           const updatedAllData = state.allData.map(ext=> {
            if(ext.name === action.payload.name){
                return {...ext, isActive: !ext.isActive}
            }else {
                    return ext
            }
           })
               // Update the filtered data based on the current filter
        const updatedData = updatedAllData.filter(ext => {
            if (state.currentFilter === 'all') return true;
            if (state.currentFilter === 'active') return ext.isActive;
            if (state.currentFilter === 'inactive') return !ext.isActive;
        });
           return { ...state, allData: updatedAllData, data: updatedData,currentFilter: action.payload.currentFilter };
        }

        default:
            return state
    }
}