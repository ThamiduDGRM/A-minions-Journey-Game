gdjs.Level_322_32Complete_33Code = {};
gdjs.Level_322_32Complete_33Code.GDSnow_9595backgroundObjects1= [];
gdjs.Level_322_32Complete_33Code.GDSnow_9595backgroundObjects2= [];
gdjs.Level_322_32Complete_33Code.GDLevel_95952_9595Complete_9595Objects1= [];
gdjs.Level_322_32Complete_33Code.GDLevel_95952_9595Complete_9595Objects2= [];
gdjs.Level_322_32Complete_33Code.GDLevel_95953_9595buttonObjects1= [];
gdjs.Level_322_32Complete_33Code.GDLevel_95953_9595buttonObjects2= [];
gdjs.Level_322_32Complete_33Code.GDMain_9595Menu_9595buttonObjects1= [];
gdjs.Level_322_32Complete_33Code.GDMain_9595Menu_9595buttonObjects2= [];
gdjs.Level_322_32Complete_33Code.GDquit_9595buttonObjects1= [];
gdjs.Level_322_32Complete_33Code.GDquit_9595buttonObjects2= [];


gdjs.Level_322_32Complete_33Code.mapOfGDgdjs_9546Level_9595322_959532Complete_959533Code_9546GDquit_95959595buttonObjects1Objects = Hashtable.newFrom({"quit_button": gdjs.Level_322_32Complete_33Code.GDquit_9595buttonObjects1});
gdjs.Level_322_32Complete_33Code.mapOfGDgdjs_9546Level_9595322_959532Complete_959533Code_9546GDMain_95959595Menu_95959595buttonObjects1Objects = Hashtable.newFrom({"Main_Menu_button": gdjs.Level_322_32Complete_33Code.GDMain_9595Menu_9595buttonObjects1});
gdjs.Level_322_32Complete_33Code.mapOfGDgdjs_9546Level_9595322_959532Complete_959533Code_9546GDLevel_959595953_95959595buttonObjects1Objects = Hashtable.newFrom({"Level_3_button": gdjs.Level_322_32Complete_33Code.GDLevel_95953_9595buttonObjects1});
gdjs.Level_322_32Complete_33Code.eventsList0 = function(runtimeScene) {

{

gdjs.copyArray(runtimeScene.getObjects("quit_button"), gdjs.Level_322_32Complete_33Code.GDquit_9595buttonObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{let isConditionTrue_1 = false;
isConditionTrue_1 = false;
isConditionTrue_1 = gdjs.evtTools.input.cursorOnObject(gdjs.Level_322_32Complete_33Code.mapOfGDgdjs_9546Level_9595322_959532Complete_959533Code_9546GDquit_95959595buttonObjects1Objects, runtimeScene, true, false);
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


{

gdjs.copyArray(runtimeScene.getObjects("Main_Menu_button"), gdjs.Level_322_32Complete_33Code.GDMain_9595Menu_9595buttonObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{let isConditionTrue_1 = false;
isConditionTrue_1 = false;
isConditionTrue_1 = gdjs.evtTools.input.cursorOnObject(gdjs.Level_322_32Complete_33Code.mapOfGDgdjs_9546Level_9595322_959532Complete_959533Code_9546GDMain_95959595Menu_95959595buttonObjects1Objects, runtimeScene, true, false);
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

gdjs.copyArray(runtimeScene.getObjects("Level_3_button"), gdjs.Level_322_32Complete_33Code.GDLevel_95953_9595buttonObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{let isConditionTrue_1 = false;
isConditionTrue_1 = false;
isConditionTrue_1 = gdjs.evtTools.input.cursorOnObject(gdjs.Level_322_32Complete_33Code.mapOfGDgdjs_9546Level_9595322_959532Complete_959533Code_9546GDLevel_959595953_95959595buttonObjects1Objects, runtimeScene, true, false);
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


};

gdjs.Level_322_32Complete_33Code.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.Level_322_32Complete_33Code.GDSnow_9595backgroundObjects1.length = 0;
gdjs.Level_322_32Complete_33Code.GDSnow_9595backgroundObjects2.length = 0;
gdjs.Level_322_32Complete_33Code.GDLevel_95952_9595Complete_9595Objects1.length = 0;
gdjs.Level_322_32Complete_33Code.GDLevel_95952_9595Complete_9595Objects2.length = 0;
gdjs.Level_322_32Complete_33Code.GDLevel_95953_9595buttonObjects1.length = 0;
gdjs.Level_322_32Complete_33Code.GDLevel_95953_9595buttonObjects2.length = 0;
gdjs.Level_322_32Complete_33Code.GDMain_9595Menu_9595buttonObjects1.length = 0;
gdjs.Level_322_32Complete_33Code.GDMain_9595Menu_9595buttonObjects2.length = 0;
gdjs.Level_322_32Complete_33Code.GDquit_9595buttonObjects1.length = 0;
gdjs.Level_322_32Complete_33Code.GDquit_9595buttonObjects2.length = 0;

gdjs.Level_322_32Complete_33Code.eventsList0(runtimeScene);

return;

}

gdjs['Level_322_32Complete_33Code'] = gdjs.Level_322_32Complete_33Code;
