gdjs.Pause_32Menu_323Code = {};
gdjs.Pause_32Menu_323Code.GDLava_9595backgroundObjects1= [];
gdjs.Pause_32Menu_323Code.GDLava_9595backgroundObjects2= [];
gdjs.Pause_32Menu_323Code.GDpause_9595textObjects1= [];
gdjs.Pause_32Menu_323Code.GDpause_9595textObjects2= [];
gdjs.Pause_32Menu_323Code.GDMain_9595Menu_9595buttonObjects1= [];
gdjs.Pause_32Menu_323Code.GDMain_9595Menu_9595buttonObjects2= [];
gdjs.Pause_32Menu_323Code.GDResumeObjects1= [];
gdjs.Pause_32Menu_323Code.GDResumeObjects2= [];
gdjs.Pause_32Menu_323Code.GDquit_9595buttonObjects1= [];
gdjs.Pause_32Menu_323Code.GDquit_9595buttonObjects2= [];


gdjs.Pause_32Menu_323Code.mapOfGDgdjs_9546Pause_959532Menu_9595323Code_9546GDResumeObjects1Objects = Hashtable.newFrom({"Resume": gdjs.Pause_32Menu_323Code.GDResumeObjects1});
gdjs.Pause_32Menu_323Code.mapOfGDgdjs_9546Pause_959532Menu_9595323Code_9546GDMain_95959595Menu_95959595buttonObjects1Objects = Hashtable.newFrom({"Main_Menu_button": gdjs.Pause_32Menu_323Code.GDMain_9595Menu_9595buttonObjects1});
gdjs.Pause_32Menu_323Code.mapOfGDgdjs_9546Pause_959532Menu_9595323Code_9546GDquit_95959595buttonObjects1Objects = Hashtable.newFrom({"quit_button": gdjs.Pause_32Menu_323Code.GDquit_9595buttonObjects1});
gdjs.Pause_32Menu_323Code.eventsList0 = function(runtimeScene) {

{

gdjs.copyArray(runtimeScene.getObjects("Resume"), gdjs.Pause_32Menu_323Code.GDResumeObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{let isConditionTrue_1 = false;
isConditionTrue_1 = false;
isConditionTrue_1 = gdjs.evtTools.input.cursorOnObject(gdjs.Pause_32Menu_323Code.mapOfGDgdjs_9546Pause_959532Menu_9595323Code_9546GDResumeObjects1Objects, runtimeScene, true, false);
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

gdjs.copyArray(runtimeScene.getObjects("Main_Menu_button"), gdjs.Pause_32Menu_323Code.GDMain_9595Menu_9595buttonObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{let isConditionTrue_1 = false;
isConditionTrue_1 = false;
isConditionTrue_1 = gdjs.evtTools.input.cursorOnObject(gdjs.Pause_32Menu_323Code.mapOfGDgdjs_9546Pause_959532Menu_9595323Code_9546GDMain_95959595Menu_95959595buttonObjects1Objects, runtimeScene, true, false);
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

gdjs.copyArray(runtimeScene.getObjects("quit_button"), gdjs.Pause_32Menu_323Code.GDquit_9595buttonObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{let isConditionTrue_1 = false;
isConditionTrue_1 = false;
isConditionTrue_1 = gdjs.evtTools.input.cursorOnObject(gdjs.Pause_32Menu_323Code.mapOfGDgdjs_9546Pause_959532Menu_9595323Code_9546GDquit_95959595buttonObjects1Objects, runtimeScene, true, false);
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

gdjs.Pause_32Menu_323Code.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.Pause_32Menu_323Code.GDLava_9595backgroundObjects1.length = 0;
gdjs.Pause_32Menu_323Code.GDLava_9595backgroundObjects2.length = 0;
gdjs.Pause_32Menu_323Code.GDpause_9595textObjects1.length = 0;
gdjs.Pause_32Menu_323Code.GDpause_9595textObjects2.length = 0;
gdjs.Pause_32Menu_323Code.GDMain_9595Menu_9595buttonObjects1.length = 0;
gdjs.Pause_32Menu_323Code.GDMain_9595Menu_9595buttonObjects2.length = 0;
gdjs.Pause_32Menu_323Code.GDResumeObjects1.length = 0;
gdjs.Pause_32Menu_323Code.GDResumeObjects2.length = 0;
gdjs.Pause_32Menu_323Code.GDquit_9595buttonObjects1.length = 0;
gdjs.Pause_32Menu_323Code.GDquit_9595buttonObjects2.length = 0;

gdjs.Pause_32Menu_323Code.eventsList0(runtimeScene);

return;

}

gdjs['Pause_32Menu_323Code'] = gdjs.Pause_32Menu_323Code;
