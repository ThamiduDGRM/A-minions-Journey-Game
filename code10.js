gdjs.Game_32Over_323Code = {};
gdjs.Game_32Over_323Code.GDLava_9595BackgroundObjects1= [];
gdjs.Game_32Over_323Code.GDLava_9595BackgroundObjects2= [];
gdjs.Game_32Over_323Code.GDGame_9595Over_9595textObjects1= [];
gdjs.Game_32Over_323Code.GDGame_9595Over_9595textObjects2= [];
gdjs.Game_32Over_323Code.GDplay_9595again_9595buttonObjects1= [];
gdjs.Game_32Over_323Code.GDplay_9595again_9595buttonObjects2= [];
gdjs.Game_32Over_323Code.GDMain_9595Menu_9595buttonObjects1= [];
gdjs.Game_32Over_323Code.GDMain_9595Menu_9595buttonObjects2= [];
gdjs.Game_32Over_323Code.GDquit_9595buttonObjects1= [];
gdjs.Game_32Over_323Code.GDquit_9595buttonObjects2= [];


gdjs.Game_32Over_323Code.mapOfGDgdjs_9546Game_959532Over_9595323Code_9546GDplay_95959595again_95959595buttonObjects1Objects = Hashtable.newFrom({"play_again_button": gdjs.Game_32Over_323Code.GDplay_9595again_9595buttonObjects1});
gdjs.Game_32Over_323Code.mapOfGDgdjs_9546Game_959532Over_9595323Code_9546GDMain_95959595Menu_95959595buttonObjects1Objects = Hashtable.newFrom({"Main_Menu_button": gdjs.Game_32Over_323Code.GDMain_9595Menu_9595buttonObjects1});
gdjs.Game_32Over_323Code.mapOfGDgdjs_9546Game_959532Over_9595323Code_9546GDquit_95959595buttonObjects1Objects = Hashtable.newFrom({"quit_button": gdjs.Game_32Over_323Code.GDquit_9595buttonObjects1});
gdjs.Game_32Over_323Code.eventsList0 = function(runtimeScene) {

{

gdjs.copyArray(runtimeScene.getObjects("play_again_button"), gdjs.Game_32Over_323Code.GDplay_9595again_9595buttonObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{let isConditionTrue_1 = false;
isConditionTrue_1 = false;
isConditionTrue_1 = gdjs.evtTools.input.cursorOnObject(gdjs.Game_32Over_323Code.mapOfGDgdjs_9546Game_959532Over_9595323Code_9546GDplay_95959595again_95959595buttonObjects1Objects, runtimeScene, true, false);
if (isConditionTrue_1) {
isConditionTrue_1 = false;
isConditionTrue_1 = gdjs.evtTools.input.isMouseButtonPressed(runtimeScene, "Left");
}
isConditionTrue_0 = isConditionTrue_1;
}
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "Level 3", false);
}}

}


{

gdjs.copyArray(runtimeScene.getObjects("Main_Menu_button"), gdjs.Game_32Over_323Code.GDMain_9595Menu_9595buttonObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{let isConditionTrue_1 = false;
isConditionTrue_1 = false;
isConditionTrue_1 = gdjs.evtTools.input.cursorOnObject(gdjs.Game_32Over_323Code.mapOfGDgdjs_9546Game_959532Over_9595323Code_9546GDMain_95959595Menu_95959595buttonObjects1Objects, runtimeScene, true, false);
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

gdjs.copyArray(runtimeScene.getObjects("quit_button"), gdjs.Game_32Over_323Code.GDquit_9595buttonObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{let isConditionTrue_1 = false;
isConditionTrue_1 = false;
isConditionTrue_1 = gdjs.evtTools.input.cursorOnObject(gdjs.Game_32Over_323Code.mapOfGDgdjs_9546Game_959532Over_9595323Code_9546GDquit_95959595buttonObjects1Objects, runtimeScene, true, false);
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

gdjs.Game_32Over_323Code.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.Game_32Over_323Code.GDLava_9595BackgroundObjects1.length = 0;
gdjs.Game_32Over_323Code.GDLava_9595BackgroundObjects2.length = 0;
gdjs.Game_32Over_323Code.GDGame_9595Over_9595textObjects1.length = 0;
gdjs.Game_32Over_323Code.GDGame_9595Over_9595textObjects2.length = 0;
gdjs.Game_32Over_323Code.GDplay_9595again_9595buttonObjects1.length = 0;
gdjs.Game_32Over_323Code.GDplay_9595again_9595buttonObjects2.length = 0;
gdjs.Game_32Over_323Code.GDMain_9595Menu_9595buttonObjects1.length = 0;
gdjs.Game_32Over_323Code.GDMain_9595Menu_9595buttonObjects2.length = 0;
gdjs.Game_32Over_323Code.GDquit_9595buttonObjects1.length = 0;
gdjs.Game_32Over_323Code.GDquit_9595buttonObjects2.length = 0;

gdjs.Game_32Over_323Code.eventsList0(runtimeScene);

return;

}

gdjs['Game_32Over_323Code'] = gdjs.Game_32Over_323Code;
