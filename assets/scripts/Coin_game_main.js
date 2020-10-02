
cc.Class({
    extends: cc.Component,

    properties: {

        
        Label_namePlayer:{
            default: null,
            type: cc.Label
        },

        Label_scoreMoney:{
            default: null,
            type: cc.Label
        },

        Label_scoreMoney_node:{
            default: null,
            type: cc.Node
        },

        Label_BetMoney_head:{
            default: null,
            type: cc.Label
        },

        Label_BetMoney_tail:{
            default: null,
            type: cc.Label
        },

        Animation_coin:{
            default: null,
            type: cc.Animation
        },

        Animation_hand:{
            default: null,
            type: cc.Animation
        },

        Animation_select_tail:{
            default: null,
            type: cc.Node
        },

        Animation_select_head:{
            default: null,
            type: cc.Node
        },

        Coin_final:{
            default: null,
            type: cc.Node
        },

        SpriteFramehead:{
            default: null,
            type: cc.SpriteFrame

        },

        SpriteFrametail:{
            default: null,
            type: cc.SpriteFrame

        },

        Btn_table_head:{
            default: null,
            type: cc.Node
        },

        Btn_table_tail:{
            default: null,
            type: cc.Node
        },

        Btn_chip10:{
            default: null,
            type: cc.Node
        },

        Btn_chip50:{
            default: null,
            type: cc.Node
        },

        Btn_chip100:{
            default: null,
            type: cc.Node
        },

        Btn_chip500:{
            default: null,
            type: cc.Node
        },

        chip10_Prefab: {
            default: null,
            type: cc.Prefab
        },

        chip50_Prefab: {
            default: null,
            type: cc.Prefab
        },

        chip100_Prefab: {
            default: null,
            type: cc.Prefab
        },

        chip500_Prefab: {
            default: null,
            type: cc.Prefab
        },

        Chip_node:{
            default: null,
            type: cc.Node
        },

        messBox_final_node:{
            default: null,
            type: cc.Node
        },

        Label_messBox_final_tail:{
            default: null,
            type: cc.Label
        },

        Label_messBox_final_node:{
            default: null,
            type: cc.Node
        },

        messBanner_node:{
            default: null,
            type: cc.Node
        },

        messBanner_label:{
            default: null,
            type: cc.Label
        },

        messBox_history_node:{
            default: null,
            type: cc.Node
        },

        messBox_history_label_total:{
            default: null,
            type: cc.Node
        },

        node_history:{
            default: null,
            type: cc.Node
        },

        font_mikado:{
            default: null,
            type: cc.Font
        },

        Coin_Audio: {
            default: null,
            type: cc.AudioClip
        },

        BG_game_Audio: {
            default: null,
            type: cc.AudioClip
        },

        Slap_table: {
            default: null,
            type: cc.AudioClip
        },

        Chip_audio: {
            default: null,
            type: cc.AudioClip
        },

        win_audio: {
            default: null,
            type: cc.AudioClip
        },

        lose_audio: {
            default: null,
            type: cc.AudioClip
        },
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        //coin animation play
        this.anim = this.Animation_coin
        this.anim.play();

        //get name player
        this.Label_namePlayer.string = window.My_Global_Data

        //Position perfab node chip
        this.PosX_chip_min = 0;
        this.PosY_chip_min = 0;
        this.PosX_chip_max = 0;
        this.PosY_chip_max = 0;

        //state select table true
        this.state_table = false;
        this.gameProcess = false;
        this.select_table = "";
        this.issue_coin = "";

        //set score Money
        this.scoreMoney = 1000;
        this.scoreBet = 0;
        this.Money = this.scoreMoney;
        this.Label_scoreMoney.string = "$" + this.scoreMoney;
        this.Label_BetMoney_head.string = "$" + this.scoreBet;
        this.Label_BetMoney_tail.string = "$" + this.scoreBet;

        //
        this.hisresults = [];
        this.hisBet = [];
        this.hisScore = [];
    },

    start () {

        //audio game play
        //cc.audioEngine.playEffect(this.BG_game_Audio, true);
    },

    Btn_select_table_head(){
        
        this.PosX_chip_min = this.Btn_table_head.x + 100;
        this.PosY_chip_min = this.Btn_table_head.y + 60;
        this.PosX_chip_max = this.PosX_chip_min + this.Btn_table_head.width - 200;
        this.PosY_chip_max = this.PosY_chip_min + this.Btn_table_head.height - 120;

        //move node prefab
        if (this.select_table != "head"){

            this.animation_select_table("head");
            this.select_table = "head";
            this.state_table = true;

        }else{
            //reset score money
            this.scoreMoney = this.Money;

            //clear node chip and table select
            this.Chip_node.removeAllChildren();
            this.animation_select_table("clear");

            //clear parametor
            this.select_table = "";
            this.state_table = false;
            this.scoreBet = 0;

            this.showScore_Label();
        }

        //move node chip
        if(this.Chip_node.children.length != 0){
            this.moveNode_chip(180);
        }

    },

    Btn_select_table_tail(){

        this.PosX_chip_min = this.Btn_table_tail.x + 100;
        this.PosY_chip_min = this.Btn_table_tail.y + 60;
        this.PosX_chip_max = this.PosX_chip_min + this.Btn_table_tail.width - 200;
        this.PosY_chip_max = this.PosY_chip_min + this.Btn_table_tail.height - 120;

        //move node prefab
        if (this.select_table != "tail"){

            this.animation_select_table("tail");
            this.select_table = "tail";
            this.state_table = true;

        }else{
            //reset score money
            this.scoreMoney = this.Money;

            //clear node chip and table select
            this.Chip_node.removeAllChildren();
            this.animation_select_table("clear");

            //clear parametor
            this.select_table = "";
            this.state_table = false;
            this.scoreBet = 0;

            this.showScore_Label();
        }

        //move node chip
        if(this.Chip_node.children.length != 0){
            this.moveNode_chip(-180);
        }

    },

    moveNode_chip: function(PosY){

        let children = this.Chip_node.children

        for (var i = 0; i < children.length; ++i) {
            let bfPosY = this.Chip_node.children[i].y;
            this.Chip_node.children[i].y = bfPosY + PosY;
            //console.log(this.Chip_node.children[i].y)
        }
    },

    Btn_select_chip10(){

        //check select table
        if (this.state_table){
            let Prefab = this.chip10_Prefab;

            if(this.scoreMoney - 10 >= 0){
                var Newchip = cc.instantiate(Prefab);
                Newchip.setPosition(this.get_NewChip_Position());
                this.Chip_node.addChild(Newchip);

                //score Money Reduce and show
                this.scoreMoney = this.scoreMoney - 10;
                this.scoreBet = this.scoreBet + 10
                this.showScore_Label(); 

                //audio chip
                cc.audioEngine.playEffect(this.Chip_audio, false);
            }else{
                this.messBanner_Money_lessBET();
            }
        
        }
    },

    Btn_select_chip50(){
        
        //check select table
        if (this.state_table){
            let Prefab = this.chip50_Prefab;

            if(this.scoreMoney - 50 >= 0){
                var Newchip = cc.instantiate(Prefab);
                Newchip.setPosition(this.get_NewChip_Position());
                this.Chip_node.addChild(Newchip);

                //score Money Reduce and show
                this.scoreMoney = this.scoreMoney - 50;
                this.scoreBet = this.scoreBet + 50
                this.showScore_Label();

                //audio chip
                cc.audioEngine.playEffect(this.Chip_audio, false);
            }else{
                this.messBanner_Money_lessBET();
            }
        
        }
    },

    Btn_select_chip100(){

        //check select table
        if (this.state_table){
            let Prefab = this.chip100_Prefab;

            if(this.scoreMoney - 100 >= 0){
                var Newchip = cc.instantiate(Prefab);
                Newchip.setPosition(this.get_NewChip_Position());
                this.Chip_node.addChild(Newchip);

                //score Money Reduce and show
                this.scoreMoney = this.scoreMoney - 100;
                this.scoreBet = this.scoreBet + 100
                this.showScore_Label();

                //audio chip
                cc.audioEngine.playEffect(this.Chip_audio, false);
            }else{
                this.messBanner_Money_lessBET();
            }
        
        }
    },

    Btn_select_chip500(){

        //check select table
        if (this.state_table){
            let Prefab = this.chip500_Prefab;

            if(this.scoreMoney - 500 >= 0){
                var Newchip = cc.instantiate(Prefab);
                Newchip.setPosition(this.get_NewChip_Position());
                this.Chip_node.addChild(Newchip);

                //score Money Reduce and show
                this.scoreMoney = this.scoreMoney - 500;
                this.scoreBet = this.scoreBet + 500
                this.showScore_Label();

                //audio chip
                cc.audioEngine.playEffect(this.Chip_audio, false);
            }else{
                this.messBanner_Money_lessBET();
            }
        
        }
    },

    Btn_BET(){
        if (this.scoreBet > 0 && this.gameProcess == false){
            
            this.gameProcess = true;
            this.Coin_final.active = false;
            this.scheduleOnce(this.animation_hand, 1);

            //enabled button
            this.enabled_button_false();

            //audio coin play
            cc.audioEngine.playEffect(this.Coin_Audio, false);
        }
    },

    animation_select_table: function (State) {
       
        switch(State) {
            case "head":
                this.Animation_select_tail.active = false;
                this.Animation_select_head.active = true;
                break;
            case "tail":
                this.Animation_select_tail.active = true;
                this.Animation_select_head.active = false;
                break;
            case "clear":
                this.Animation_select_tail.active = false;
                this.Animation_select_head.active = false;
                break;
        }

    },
    
    showScore_Label(){
        this.Label_scoreMoney.string = "$" + this.scoreMoney;
        this.Label_BetMoney_head.string = "$" + this.scoreBet;
        this.Label_BetMoney_tail.string = "$" + this.scoreBet;
    },

    get_NewChip_Position: function () {
       
        let posX = this.get_RndInteger(this.PosX_chip_min,this.PosX_chip_max);
        let posY = this.get_RndInteger(this.PosY_chip_min,this.PosY_chip_max);
        let pos = cc.v2(posX, posY);
        return pos;
    },

    get_RndInteger: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    },

    labelColor(){
        this.Label_scoreMoney_node.color = cc.Color(255, 255, 255);
    },

    animation_hand(){
        this.Animation_hand.play();
        this.scheduleOnce(this.randomCoin, 0.5);
        this.scheduleOnce(this.SlapTable, 0.2);
    },

    SlapTable(){
        cc.audioEngine.playEffect(this.Slap_table, false);
    },
    
    randomCoin(){
        //random coin hear or tail
        let randomCoin = Math.floor(Math.random() * 2);
        if (randomCoin == 0){
            this.issue_coin = "head"
            this.Coin_final.getComponent(cc.Sprite).spriteFrame = this.SpriteFramehead
        }else{
            this.issue_coin = "tail"
            this.Coin_final.getComponent(cc.Sprite).spriteFrame = this.SpriteFrametail

        }

        this.Coin_final.active = true;

        this.scheduleOnce(this.messBox_Final, 3.5);
    },


    messBox_Final(){

        var Score = 0;

        //check state bet coin
        if (this.issue_coin == this.select_table){
            this.Label_messBox_final_tail.string = "you win!!\n\n+" + (this.scoreBet);
            this.Label_messBox_final_node.color = cc.Color(0, 255, 0);
            this.scoreMoney = this.scoreMoney + this.scoreBet * 2;
            Score = this.scoreBet;

            //audio win
            cc.audioEngine.playEffect(this.win_audio, false);
        }else{
            this.Label_messBox_final_tail.string = "you lose!!\n\n-" + (this.scoreBet);
            this.Label_messBox_final_node.color = cc.Color(255, 0, 0);
            Score = -this.scoreBet;

            //audio lose
            cc.audioEngine.playEffect(this.lose_audio, false);
        }

        //save scoreMoney
        this.Money = this.scoreMoney;

        //show messBox final
        this.messBox_final_node.active = true;
        this.scheduleOnce(this.messBox_Final_amiss, 1.5);

        //save history
        this.hisBet.push(this.select_table)
        this.hisresults.push(this.issue_coin)
        this.hisScore.push(Score);
    },

    messBox_Final_amiss(){

        this.messBox_final_node.active = false;

        //check state bet coin
        if (this.issue_coin == this.select_table){
            this.Label_scoreMoney_node.color = cc.Color(0, 255, 0);
            this.scheduleOnce(this.labelColor, 0.5);
        }else{

            this.Label_scoreMoney_node.color = cc.Color(255, 0, 0);
            this.scheduleOnce(this.labelColor, 0.5);
        }

        //clear node chip and table select
        this.Chip_node.removeAllChildren();
        this.animation_select_table("clear");

        //clear parametor
        this.select_table = "";
        this.state_table = false;
        this.gameProcess = false;
        this.scoreBet = 0;

        //enabled button
        this.enabled_button_true();

        this.showScore_Label();

        //check scoreMoney < 10
        this.scheduleOnce(this.check_Money_lesser10, 0.5);

        //Check and show mess history when 5 Round 
        if (this.hisScore.length == 5){
            this.scheduleOnce(this.showMessBox_history, 0.5);
        }
    },

    enabled_button_true(){
        //enabled button
        this.Btn_table_head.getComponent(cc.Button).enabled  = true;
        this.Btn_table_tail.getComponent(cc.Button).enabled  = true;

        this.Btn_chip10.getComponent(cc.Button).enabled  = true;
        this.Btn_chip50.getComponent(cc.Button).enabled  = true;
        this.Btn_chip100.getComponent(cc.Button).enabled  = true;
        this.Btn_chip500.getComponent(cc.Button).enabled  = true;
    },

    enabled_button_false(){
        //enabled button
        this.Btn_table_head.getComponent(cc.Button).enabled  = false;
        this.Btn_table_tail.getComponent(cc.Button).enabled  = false;
            
        this.Btn_chip10.getComponent(cc.Button).enabled  = false;
        this.Btn_chip50.getComponent(cc.Button).enabled  = false;
        this.Btn_chip100.getComponent(cc.Button).enabled  = false;
        this.Btn_chip500.getComponent(cc.Button).enabled  = false;
    },

    check_Money_lesser10(){

        if (this.scoreMoney == 10){

            this.messBanner_label.string = "you have less money $10"

            var s1 = cc.tween().by(0.3, {y: -115}, {easing: 'sineIn'});
            var s2 = cc.tween().by(0.1, {y: 5}, {easing: 'sineIn'});
            var s3 = cc.tween().by(1.5, {y: 0}, {easing: 'sineIn'});
            var s4 = cc.tween().by(0.3, {y: 110}, {easing: 'sineOut'});
            var tween = cc.tween().sequence(s1, s2 ,s3, s4);
    
            cc.tween(this.messBanner_node).then(tween).start()

        }else if (this.scoreMoney < 10){

            /*this.messBanner_label.string = "you have less money $10"

            var s1 = cc.tween().by(0.3, {y: -115}, {easing: 'sineIn'});
            var s2 = cc.tween().by(0.1, {y: 5}, {easing: 'sineIn'});
            var s3 = cc.tween().by(1.5, {y: 0}, {easing: 'sineIn'});
            var s4 = cc.tween().by(0.3, {y: 110}, {easing: 'sineOut'});
            var tween = cc.tween().sequence(s1, s2 ,s3, s4);
    
            cc.tween(this.messBanner_node).then(tween).start()*/

            this.scheduleOnce(this.showMessBox_history, 0.5);
        }
    },

    messBanner_Money_lessBET(){

        this.enabled_button_false();
        //this.messBanner_node.y = 370;

        this.messBanner_label.string = "you have less money than you bet"

        var s1 = cc.tween().by(0.3, {y: -115}, {easing: 'sineIn'});
        var s2 = cc.tween().by(0.1, {y: 5}, {easing: 'sineIn'});
        var s3 = cc.tween().by(1, {y: 0}, {easing: 'sineIn'});
        var s4 = cc.tween().by(0.3, {y: 110}, {easing: 'sineOut'});
        var tween = cc.tween().sequence(s1, s2 ,s3, s4);
    
        cc.tween(this.messBanner_node).then(tween).start()

        this.scheduleOnce(this.enabled_button_true, 1.7);
    },

    messHistory_dismiss(){
        this.messBox_history_node.active = false;

        //clear node
        this.node_history.removeAllChildren();

        //clear data
        this.hisBet = [];
        this.hisresults = [];
        this.hisScore = [];
    },

    showMessBox_history(){

        this.messBox_history_node.active = true;

        var offsetX = 187;
        var offsetY = -125;

        for (var i = 0; i < this.hisScore.length; ++i) {

            for (var j = 0; j < 3; ++j) {

                var posx = offsetX + (100 * i);
                var posy = offsetY + (-100 * j);

                if (j != 2){

                    var node = new cc.Node('Sprite');
                    node.setPosition(cc.v2(posx, posy));
                    node.setScale(0.7, 0.7);

                    var sp = node.addComponent(cc.Sprite);
 
                    if (j == 0){
                        if (this.hisresults[i] == "head"){
                            sp.spriteFrame = this.SpriteFramehead;
                        }else{
                            sp.spriteFrame = this.SpriteFrametail;
                        }
                    }else{
                        if (this.hisBet[i] == "head"){
                            sp.spriteFrame = this.SpriteFramehead;
                        }else{
                            sp.spriteFrame = this.SpriteFrametail;
                        }
                    }

                    this.node_history.addChild(node);

                }else{
                    var node = new cc.Node('label');
                    node.setPosition(cc.v2(posx, posy - 5));

                    var lb = node.addComponent(cc.Label);
                    lb.font = this.font_mikado;
                    lb.fontSize = 20;

                    if (this.hisScore[i] > 0){
                        node.color = cc.Color(0, 255, 0);
                        lb.string = "+" + this.hisScore[i];
                    }else{
                        node.color = cc.Color(255, 0, 0);
                        lb.string = this.hisScore[i];
                    }
                    this.node_history.addChild(node);
                }                  
            }
        }

        var total = this.hisScore.reduce((a, b) => a + b, 0)
        if (total > 0){
            this.messBox_history_label_total.getComponent(cc.Label).string = "total: +" + total;
            this.messBox_history_label_total.color = cc.Color(0, 255, 0);
        }else{
            this.messBox_history_label_total.getComponent(cc.Label).string = "total: " + total;
            this.messBox_history_label_total.color = cc.Color(255, 0, 0);
        }

    },

    a(){
    
        this.showMessBox_history();


        //this.hisBet.push("555")
        //this.hisresults.push("666")

        /*var Newchip = cc.instantiate(Prefab);
        Newchip.setPosition(cc.v2(0, 0));
        this.Chip_node.addChild(Newchip);

        //score Money Reduce and show
        this.scoreMoney = this.scoreMoney - 500;
        this.scoreBet = this.scoreBet + 500
        this.showScore_Label();*/

        //let Children = this.Chip_node.children.length;
        //this.Chip_node.removeAllChildren();
        //this.Btn_table_head.getComponent(cc.Button).enabled  = true;

        //var count = node.childrenCount;
        //this.node.childrenCount.destroy();

        //this.node.child[0].destroy();

        //console.log(Children);

    },

    

    b(){


      
        //console.log(this.hisBet, this.hisresults, this.hisScore);

        //this.Btn_table_head.getComponent(cc.Button).enabled  = false;
        

        //this.randomCoin();        
       
    },

    aaa(){
        let a = Math.floor(Math.random() * 100);
        console.log(a);
    },

    update (dt) {

    },
});
