gdjs.Pause_32Menu_322Code = {};
gdjs.Pause_32Menu_322Code.GDSnow_9595Pixel_9595BackgroundObjects1= [];
gdjs.Pause_32Menu_322Code.GDSnow_9595Pixel_9595BackgroundObjects2= [];
gdjs.Pause_32Menu_322Code.GDPaused_9595testObjects1= [];
gdjs.Pause_32Menu_322Code.GDPaused_9595testObjects2= [];
gdjs.Pause_32Menu_322Code.GDMain_9595Menu_9595buttonObjects1= [];
gdjs.Pause_32Menu_322Code.GDMain_9595Menu_9595buttonObjects2= [];
gdjs.Pause_32Menu_322Code.GDResume_9595ButtonObjects1= [];
gdjs.Pause_32Menu_322Code.GDResume_9595ButtonObjects2= [];
gdjs.Pause_32Menu_322Code.GDquit_9595buttonObjects1= [];
gdjs.Pause_32Menu_322Code.GDquit_9595buttonObjects2= [];


gdjs.Pause_32Menu_322Code.mapOfGDgdjs_9546Pause_959532Menu_9595322Code_9546GDResume_95959595ButtonObjects1Objects = Hashtable.newFrom({"Resume_Button": gdjs.Pause_32Menu_322Code.GDResume_9595ButtonObjects1});
gdjs.Pause_32Menu_322Code.mapOfGDgdjs_9546Pause_959532Menu_9595322Code_9546GDMain_95959595Menu_95959595buttonObjects1Objects = Hashtable.newFrom({"Main_Menu_button": gdjs.Pause_32Menu_322Code.GDMain_9595Menu_9595buttonObjects1});
gdjs.Pause_32Menu_322Code.mapOfGDgdjs_9546Pause_959532Menu_9595322Code_9546GDquit_95959595buttonObjects1Objects = Hashtable.newFrom({"quit_button": gdjs.Pause_32Menu_322Code.GDquit_9595buttonObjects1});
gdjs.Pause_32Menu_322Code.eventsList0 = function(runtimeScene) {

{

gdjs.copyArray(runtimeScene.getObjects("Resume_Button"), gdjs.Pause_32Menu_322Code.GDResume_9595ButtonObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{let isConditionTrue_1 = false;
isConditionTrue_1 = false;
isConditionTrue_1 = gdjs.evtTools.input.cursorOnObject(gdjs.Pause_32Menu_322Code.mapOfGDgdjs_9546Pause_959532Menu_9595322Code_9546GDResume_95959595ButtonObjects1Objects, runtimeScene, true, false);
if (isConditionTrue_1) {
isConditionTrue_1 = false;
isConditionTrue_1 = gdjs.evtTools.input.isMouseButtonPressed(runtimeScene, "Left");
}
isConditionTrue_0 = isConditionTrue_1;
}
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.popScene(runtimeScene);
}}

}


{

gdjs.copyArray(runtimeScene.getObjects("Main_Menu_button"), gdjs.Pause_32Menu_322Code.GDMain_9595Menu_9595buttonObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{let isConditionTrue_1 = false;
isConditionTrue_1 = false;
isConditionTrue_1 = gdjs.evtTools.input.cursorOnObject(gdjs.Pause_32Menu_322Code.mapOfGDgdjs_9546Pause_959532Menu_9595322Code_9546GDMain_95959595Menu_95959595buttonObjects1Objects, runtimeScene, true, false);
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

gdjs.copyArray(runtimeScene.getObjects("quit_button"), gdjs.Pause_32Menu_322Code.GDquit_9595buttonObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{let isConditionTrue_1 = false;
isConditionTrue_1 = false;
isConditionTrue_1 = gdjs.evtTools.input.cursorOnObject(gdjs.Pause_32Menu_322Code.mapOfGDgdjs_9546Pause_959532Menu_9595322Code_9546GDquit_95959595buttonObjects1Objects, runtimeScene, true, false);
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

gdjs.Pause_32Menu_322Code.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.Pause_32Menu_322Code.GDSnow_9595Pixel_9595BackgroundObjects1.length = 0;
gdjs.Pause_32Menu_322Code.GDSnow_9595Pixel_9595BackgroundObjects2.length = 0;
gdjs.Pause_32Menu_322Code.GDPaused_9595testObjects1.length = 0;
gdjs.Pause_32Menu_322Code.GDPaused_9595testObjects2.length = 0;
gdjs.Pause_32Menu_322Code.GDMain_9595Menu_9595buttonObjects1.length = 0;
gdjs.Pause_32Menu_322Code.GDMain_9595Menu_9595buttonObjects2.length = 0;
gdjs.Pause_32Menu_322Code.GDResume_9595ButtonObjects1.length = 0;
gdjs.Pause_32Menu_322Code.GDResume_9595ButtonObjects2.length = 0;
gdjs.Pause_32Menu_322Code.GDquit_9595buttonObjects1.length = 0;
gdjs.Pause_32Menu_322Code.GDquit_9595buttonObjects2.length = 0;

gdjs.Pause_32Menu_322Code.eventsList0(runtimeScene);

return;

}

gdjs['Pause_32Menu_322Code'] = gdjs.Pause_32Menu_322Code;
