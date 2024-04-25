gdjs.Level_323_32Complete_33Code = {};
gdjs.Level_323_32Complete_33Code.GDLava_9595BackgroundObjects1= [];
gdjs.Level_323_32Complete_33Code.GDLava_9595BackgroundObjects2= [];
gdjs.Level_323_32Complete_33Code.GDGame_9595Complete_9595textObjects1= [];
gdjs.Level_323_32Complete_33Code.GDGame_9595Complete_9595textObjects2= [];
gdjs.Level_323_32Complete_33Code.GDBoss_9595Saved_9595TextObjects1= [];
gdjs.Level_323_32Complete_33Code.GDBoss_9595Saved_9595TextObjects2= [];
gdjs.Level_323_32Complete_33Code.GDPlatformObjects1= [];
gdjs.Level_323_32Complete_33Code.GDPlatformObjects2= [];
gdjs.Level_323_32Complete_33Code.GDProtagonistObjects1= [];
gdjs.Level_323_32Complete_33Code.GDProtagonistObjects2= [];
gdjs.Level_323_32Complete_33Code.GDBossObjects1= [];
gdjs.Level_323_32Complete_33Code.GDBossObjects2= [];
gdjs.Level_323_32Complete_33Code.GDMain_9595Menu_9595buttonObjects1= [];
gdjs.Level_323_32Complete_33Code.GDMain_9595Menu_9595buttonObjects2= [];
gdjs.Level_323_32Complete_33Code.GDquit_9595buttonObjects1= [];
gdjs.Level_323_32Complete_33Code.GDquit_9595buttonObjects2= [];


gdjs.Level_323_32Complete_33Code.mapOfGDgdjs_9546Level_9595323_959532Complete_959533Code_9546GDMain_95959595Menu_95959595buttonObjects1Objects = Hashtable.newFrom({"Main_Menu_button": gdjs.Level_323_32Complete_33Code.GDMain_9595Menu_9595buttonObjects1});
gdjs.Level_323_32Complete_33Code.mapOfGDgdjs_9546Level_9595323_959532Complete_959533Code_9546GDquit_95959595buttonObjects1Objects = Hashtable.newFrom({"quit_button": gdjs.Level_323_32Complete_33Code.GDquit_9595buttonObjects1});
gdjs.Level_323_32Complete_33Code.eventsList0 = function(runtimeScene) {

{

gdjs.copyArray(runtimeScene.getObjects("Main_Menu_button"), gdjs.Level_323_32Complete_33Code.GDMain_9595Menu_9595buttonObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{let isConditionTrue_1 = false;
isConditionTrue_1 = false;
isConditionTrue_1 = gdjs.evtTools.input.cursorOnObject(gdjs.Level_323_32Complete_33Code.mapOfGDgdjs_9546Level_9595323_959532Complete_959533Code_9546GDMain_95959595Menu_95959595buttonObjects1Objects, runtimeScene, true, false);
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

gdjs.copyArray(runtimeScene.getObjects("quit_button"), gdjs.Level_323_32Complete_33Code.GDquit_9595buttonObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{let isConditionTrue_1 = false;
isConditionTrue_1 = false;
isConditionTrue_1 = gdjs.evtTools.input.cursorOnObject(gdjs.Level_323_32Complete_33Code.mapOfGDgdjs_9546Level_9595323_959532Complete_959533Code_9546GDquit_95959595buttonObjects1Objects, runtimeScene, true, false);
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

gdjs.Level_323_32Complete_33Code.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.Level_323_32Complete_33Code.GDLava_9595BackgroundObjects1.length = 0;
gdjs.Level_323_32Complete_33Code.GDLava_9595BackgroundObjects2.length = 0;
gdjs.Level_323_32Complete_33Code.GDGame_9595Complete_9595textObjects1.length = 0;
gdjs.Level_323_32Complete_33Code.GDGame_9595Complete_9595textObjects2.length = 0;
gdjs.Level_323_32Complete_33Code.GDBoss_9595Saved_9595TextObjects1.length = 0;
gdjs.Level_323_32Complete_33Code.GDBoss_9595Saved_9595TextObjects2.length = 0;
gdjs.Level_323_32Complete_33Code.GDPlatformObjects1.length = 0;
gdjs.Level_323_32Complete_33Code.GDPlatformObjects2.length = 0;
gdjs.Level_323_32Complete_33Code.GDProtagonistObjects1.length = 0;
gdjs.Level_323_32Complete_33Code.GDProtagonistObjects2.length = 0;
gdjs.Level_323_32Complete_33Code.GDBossObjects1.length = 0;
gdjs.Level_323_32Complete_33Code.GDBossObjects2.length = 0;
gdjs.Level_323_32Complete_33Code.GDMain_9595Menu_9595buttonObjects1.length = 0;
gdjs.Level_323_32Complete_33Code.GDMain_9595Menu_9595buttonObjects2.length = 0;
gdjs.Level_323_32Complete_33Code.GDquit_9595buttonObjects1.length = 0;
gdjs.Level_323_32Complete_33Code.GDquit_9595buttonObjects2.length = 0;

gdjs.Level_323_32Complete_33Code.eventsList0(runtimeScene);

return;

}

gdjs['Level_323_32Complete_33Code'] = gdjs.Level_323_32Complete_33Code;
