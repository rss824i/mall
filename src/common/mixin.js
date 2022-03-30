// vue 混入  https://cn.vuejs.org/v2/guide/mixins.html#ad

export const mixinTest = {
    // data、methods等等都可以混入
    mounted(){
        console.log("混入类容-mixin");
    }
}