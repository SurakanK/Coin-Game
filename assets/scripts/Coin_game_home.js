
cc.Class({
    extends: cc.Component,

    properties: {
        
        EditBox_name:{
            default: null,
            type: cc.EditBox
        },

        Label_nameError:{
            default: null,
            type: cc.Label
        },

        BG_game_Audio: {
            default: null,
            type: cc.AudioClip
        },

    },

    onLoad () {
        window.My_Global_Data = window.My_Global_Data || ""; 
    },

    Submit_Creat_Player(){
        
        //check spacial character
        var str = this.EditBox_name.string
        if(/^[a-zA-Z0-9- ]*$/.test(str) == true) {

            //check editbox string null
            if(str != "") {
                My_Global_Data = this.EditBox_name.string;
                cc.director.loadScene("Coin_game_main");
                //console.log(str);
            }    
        }else{
            this.Label_nameError.string = "Do not use special characters.";
        }
    },

    back_To_HomePage() {
        cc.director.loadScene("Coin_game_home");
    },

    start () {
       //audio game play
       cc.audioEngine.playEffect(this.BG_game_Audio, true);
    },

    // update (dt) {},
});
