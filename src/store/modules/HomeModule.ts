let HomeModule:Object={
    state:{
        navBool: false
    },
    mutations:{
        SET_NAV_BOOL(state:any){
            state.navBool = !state.navBool
        }
    },
    actions:{},
    getters:{}
}

export default HomeModule