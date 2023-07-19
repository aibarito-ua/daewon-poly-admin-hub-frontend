import React from 'react';
import { CONFIG } from '../../config';
import axios from 'axios';

export async function getLevelAndTextbookSpeakingDataAPI():Promise<any> {
    const reqUrl = CONFIG.LEVEL_AND_TEXTBOOK.SPEAKING;
    return await axios.get(reqUrl, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    })
}