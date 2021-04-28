import {types} from  "mobx-state-tree" ;

export const RootStore = types.model({
    navStack: types.string,
    width: types.number,
    height: types.number,
    drawerType: types.string,
    theme: types.union(types.literal('light'), types.literal('dark')),
}).actions((self)=>{
    return {
        setNavStack(screen) {
            self.navStack = screen ; 
        },
        toggleDrawerType() {
            if(self.drawerType == 'permanent'){
                self.drawerType = 'front' ;
            }else{
                self.drawerType = 'permanent' ;
            }
        },
        toggleColor(){
            if(self.theme == "dark") {
                self.theme = "light" ; 
            }else {
                self.theme = "dark" ; 
            }
        },
        setDims(width, height){
            self.width = width ; 
            self.height = height ; 
            if(height/width > 1.0){
                self.drawerType = 'front' ; 
            }else{
                self.drawerType = 'permanent' ; 
            }
        }
    }
}).views((self)=>{
    return {
        get test(){
            return 0 ;
        },
        get portrait(){
            if(self.width / self.height < 1) {
                return true;
            }else {
                return false;
            }
        }
    }
}) ; 