import * as React from 'react';
import {DrawerActions} from "@react-navigation/native" ; 
import { rootStore } from '../App';

export const isReadyRef = React.createRef();

export const navigationRef = React.createRef();

export function navigate(name, params) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.navigate(name, params);
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}

export function toggleDrawer(){
    if(isReadyRef.current && navigationRef.current) {
        navigationRef.current.dispatch(DrawerActions.toggleDrawer()) ;
        if(rootStore.drawerType == 'permanent'){
            rootStore.toggleDrawerType() ; 
        }
    } else {
        
    }
}

export function setDrawerType(){
    if(isReadyRef.current && navigationRef.current){

    }else{

    }
}