import {createAsyncThunk} from '@reduxjs/toolkit'
import * as actions from "./actions"
import * as endpoint from './endpoints'


// FECTCHING OF MASTER CODE TO RESET SAFE BOX
export const getMasterSafeCode = createAsyncThunk(actions.GET_MASTER_CODE, async(data) => {
    const response = await fetch((endpoint.fetchMasterSafeCode).concat(`${data}`))
    const resolvedResponse = await response.json()
    return resolvedResponse
})
