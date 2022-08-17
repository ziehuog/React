import React from 'react'
import { CHECK_VALUE } from '../Share/Constants'

export const initPermission ={
    info: true,
    result: true,
    add: false,
    permission: false,
    checked: true,
}


export const reducerPermission = (state, action) => {
    switch(action.type){
        case CHECK_VALUE:

        default: 
        console.log('ahuhu')

    }
} 