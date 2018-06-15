let gridWidth = 60; //因为 敌人和玩家的大小 是 45*45
let getGrid = function(position){
        //[fix] anchor should included # use round instead of floor
        //round() 方法可把一个数字舍入为最接近的整数。
        return cc.v2(Math.round(position.x / gridWidth), Math.round(position.y / gridWidth))
    };
let getGridPosition = function(position){
        return cc.pMult(getGrid(position),gridWidth);
    }

module.exports = { 
    getGrid,
    getGridPosition
}

