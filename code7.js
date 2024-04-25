gdjs.Game_32Over_322Code = {};
gdjs.Game_32Over_322Code.GDSnow_9595backgroundObjects1= [];
gdjs.Game_32Over_322Code.GDSnow_9595backgroundObjects2= [];
gdjs.Game_32Over_322Code.GDGame_9595Over_9595Text_9595Objects1= [];
gdjs.Game_32Over_322Code.GDGame_9595Over_9595Text_9595Objects2= [];
gdjs.Game_32Over_322Code.GDPlay_9595again_9595buttonObjects1= [];
gdjs.Game_32Over_322Code.GDPlay_9595again_9595buttonObjects2= [];
gdjs.Game_32Over_322Code.GDMain_9595menu_9595buttonObjects1= [];
gdjs.Game_32Over_322Code.GDMain_9595menu_9595buttonObjects2= [];
gdjs.Game_32Over_322Code.GDquit_9595buttonObjects1= [];
gdjs.Game_32Over_322Code.GDquit_9595buttonObjects2= [];


gdjs.Game_32Over_322Code.mapOfGDgdjs_9546Game_959532Over_9595322Code_9546GDPlay_95959595again_95959595buttonObjects1Objects = Hashtable.newFrom({"Play_again_button": gdjs.Game_32Over_322Code.GDPlay_9595again_9595buttonObjects1});
gdjs.Game_32Over_322Code.mapOfGDgdjs_9546Game_959532Over_9595322Code_9546GDMain_95959595menu_95959595buttonObjects1Objects = Hashtable.newFrom({"Main_menu_button": gdjs.Game_32Over_322Code.GDMain_9595menu_9595buttonObjects1});
gdjs.Game_32Over_322Code.mapOfGDgdjs_9546Game_959532Over_9595322Code_9546GDquit_95959595buttonObjects1Objects = Hashtable.newFrom({"quit_button": gdjs.Game_32Over_322Code.GDquit_9595buttonObjects1});
gdjs.Game_32Over_322Code.eventsList0 = function(runtimeScene) {

{

gdjs.copyArray(runtimeScene.getObjects("Play_again_button"), gdjs.Game_32Over_322Code.GDPlay_9595again_9595buttonObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{let isConditionTrue_1 = false;
isConditionTrue_1 = false;
isConditionTrue_1 = gdjs.evtTools.input.cursorOnObject(gdjs.Game_32Over_322Code.mapOfGDgdjs_9546Game_959532Over_9595322Code_9546GDPlay_95959595again_95959595buttonObjects1Objects, runtimeScene, true, false);
if (isConditionTrue_1) {
isConditionTrue_1 = false;
isConditionTrue_1 = gdjs.evtTools.input.isMouseButtonPressed(runtimeScene, "Left");
}
isConditionTrue_0 = isConditionTrue_1;
}
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "Level 2", false);
}}

}


{

gdjs.copyArray(runtimeScene.getObjects("Main_menu_button"), gdjs.Game_32Over_322Code.GDMain_9595menu_9595buttonObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{let isConditionTrue_1 = false;
isConditionTrue_1 = false;
isConditionTrue_1 = gdjs.evtTools.input.cursorOnObject(gdjs.Game_32Over_322Code.mapOfGDgdjs_9546Game_959532Over_9595322Code_9546GDMain_95959595menu_95959595buttonObjects1Objects, runtimeScene, true, false);
if (isConditionTrue_1) {
isConditionTrue_1 = false;
isConditionTrue_1 = gdjs.evtTools.input.isMouseButtonPressed(runtimeScene, "Left");
}
isConditionTrue_0 = isConditionTrue_1;
}
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "Main Menu", false);
}}

}


{

gdjs.copyArray(runtimeScene.getObjects("quit_button"), gdjs.Game_32Over_322Code.GDquit_9595buttonObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{let isConditionTrue_1 = false;
isConditionTrue_1 = false;
isConditionTrue_1 = gdjs.evtTools.input.cursorOnObject(gdjs.Game_32Over_322Code.mapOfGDgdjs_9546Game_959532Over_9595322Code_9546GDquit_95959595buttonObjects1Objects, runtimeScene, true, false);
if (isConditionTrue_1) {
isConditionTrue_1 = false;
isConditionTrue_1 = gdjs.evtTools.input.isMouseButtonPressed(runtimeScene, "Left");
}
isConditionTrue_0 = isConditionTrue_1;
}
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.stopGame(runtimeScene);
}}

}


};

gdjs.Game_32Over_322Code.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.Game_32Over_322Code.GDSnow_9595backgroundObjects1.length = 0;
gdjs.Game_32Over_322Code.GDSnow_9595backgroundObjects2.length = 0;
gdjs.Game_32Over_322Code.GDGame_9595Over_9595Text_9595Objects1.length = 0;
gdjs.Game_32Over_322Code.GDGame_9595Over_9595Text_9595Objects2.length = 0;
gdjs.Game_32Over_322Code.GDPlay_9595again_9595buttonObjects1.length = 0;
gdjs.Game_32Over_322Code.GDPlay_9595again_9595buttonObjects2.length = 0;
gdjs.Game_32Over_322Code.GDMain_9595menu_9595buttonObjects1.length = 0;
gdjs.Game_32Over_322Code.GDMain_9595menu_9595buttonObjects2.length = 0;
gdjs.Game_32Over_322Code.GDquit_9595buttonObjects1.length = 0;
gdjs.Game_32Over_322Code.GDquit_9595buttonObjects2.length = 0;

gdjs.Game_32Over_322Code.eventsList0(runtimeScene);

return;

}

gdjs['Game_32Over_322Code'] = gdjs.Game_32Over_322Code;
