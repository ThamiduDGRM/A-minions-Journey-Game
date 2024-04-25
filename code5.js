gdjs.Pause_32MenuCode = {};
gdjs.Pause_32MenuCode.GDbackgroundObjects1= [];
gdjs.Pause_32MenuCode.GDbackgroundObjects2= [];
gdjs.Pause_32MenuCode.GDPause_9595textObjects1= [];
gdjs.Pause_32MenuCode.GDPause_9595textObjects2= [];
gdjs.Pause_32MenuCode.GDGo_9595back_9595buttonObjects1= [];
gdjs.Pause_32MenuCode.GDGo_9595back_9595buttonObjects2= [];
gdjs.Pause_32MenuCode.GDquit_9595buttonObjects1= [];
gdjs.Pause_32MenuCode.GDquit_9595buttonObjects2= [];
gdjs.Pause_32MenuCode.GDMain_9595MenuObjects1= [];
gdjs.Pause_32MenuCode.GDMain_9595MenuObjects2= [];
gdjs.Pause_32MenuCode.GDMain_9595menu_9595button_9595newObjects1= [];
gdjs.Pause_32MenuCode.GDMain_9595menu_9595button_9595newObjects2= [];
gdjs.Pause_32MenuCode.GDResume_9595ButtonObjects1= [];
gdjs.Pause_32MenuCode.GDResume_9595ButtonObjects2= [];


gdjs.Pause_32MenuCode.mapOfGDgdjs_9546Pause_959532MenuCode_9546GDResume_95959595ButtonObjects1Objects = Hashtable.newFrom({"Resume_Button": gdjs.Pause_32MenuCode.GDResume_9595ButtonObjects1});
gdjs.Pause_32MenuCode.mapOfGDgdjs_9546Pause_959532MenuCode_9546GDMain_95959595menu_95959595button_95959595newObjects1Objects = Hashtable.newFrom({"Main_menu_button_new": gdjs.Pause_32MenuCode.GDMain_9595menu_9595button_9595newObjects1});
gdjs.Pause_32MenuCode.mapOfGDgdjs_9546Pause_959532MenuCode_9546GDquit_95959595buttonObjects1Objects = Hashtable.newFrom({"quit_button": gdjs.Pause_32MenuCode.GDquit_9595buttonObjects1});
gdjs.Pause_32MenuCode.eventsList0 = function(runtimeScene) {

{

gdjs.copyArray(runtimeScene.getObjects("Resume_Button"), gdjs.Pause_32MenuCode.GDResume_9595ButtonObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{let isConditionTrue_1 = false;
isConditionTrue_1 = false;
isConditionTrue_1 = gdjs.evtTools.input.cursorOnObject(gdjs.Pause_32MenuCode.mapOfGDgdjs_9546Pause_959532MenuCode_9546GDResume_95959595ButtonObjects1Objects, runtimeScene, true, false);
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

gdjs.copyArray(runtimeScene.getObjects("Main_menu_button_new"), gdjs.Pause_32MenuCode.GDMain_9595menu_9595button_9595newObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{let isConditionTrue_1 = false;
isConditionTrue_1 = false;
isConditionTrue_1 = gdjs.evtTools.input.cursorOnObject(gdjs.Pause_32MenuCode.mapOfGDgdjs_9546Pause_959532MenuCode_9546GDMain_95959595menu_95959595button_95959595newObjects1Objects, runtimeScene, true, false);
if (isConditionTrue_1) {
isConditionTrue_1 = false;
isConditionTrue_1 = gdjs.evtTools.input.isMouseButtonPressed(runtimeScene, "Left");
}
isConditionTrue_0 = isConditionTrue_1;
}
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "Main Menu", true);
}}

}


{

gdjs.copyArray(runtimeScene.getObjects("quit_button"), gdjs.Pause_32MenuCode.GDquit_9595buttonObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{let isConditionTrue_1 = false;
isConditionTrue_1 = false;
isConditionTrue_1 = gdjs.evtTools.input.cursorOnObject(gdjs.Pause_32MenuCode.mapOfGDgdjs_9546Pause_959532MenuCode_9546GDquit_95959595buttonObjects1Objects, runtimeScene, true, false);
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

gdjs.Pause_32MenuCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.Pause_32MenuCode.GDbackgroundObjects1.length = 0;
gdjs.Pause_32MenuCode.GDbackgroundObjects2.length = 0;
gdjs.Pause_32MenuCode.GDPause_9595textObjects1.length = 0;
gdjs.Pause_32MenuCode.GDPause_9595textObjects2.length = 0;
gdjs.Pause_32MenuCode.GDGo_9595back_9595buttonObjects1.length = 0;
gdjs.Pause_32MenuCode.GDGo_9595back_9595buttonObjects2.length = 0;
gdjs.Pause_32MenuCode.GDquit_9595buttonObjects1.length = 0;
gdjs.Pause_32MenuCode.GDquit_9595buttonObjects2.length = 0;
gdjs.Pause_32MenuCode.GDMain_9595MenuObjects1.length = 0;
gdjs.Pause_32MenuCode.GDMain_9595MenuObjects2.length = 0;
gdjs.Pause_32MenuCode.GDMain_9595menu_9595button_9595newObjects1.length = 0;
gdjs.Pause_32MenuCode.GDMain_9595menu_9595button_9595newObjects2.length = 0;
gdjs.Pause_32MenuCode.GDResume_9595ButtonObjects1.length = 0;
gdjs.Pause_32MenuCode.GDResume_9595ButtonObjects2.length = 0;

gdjs.Pause_32MenuCode.eventsList0(runtimeScene);

return;

}

gdjs['Pause_32MenuCode'] = gdjs.Pause_32MenuCode;
