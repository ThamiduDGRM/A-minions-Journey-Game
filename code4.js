gdjs.Game_32OverCode = {};
gdjs.Game_32OverCode.GDbackgroundObjects1= [];
gdjs.Game_32OverCode.GDbackgroundObjects2= [];
gdjs.Game_32OverCode.GDNewTextObjects1= [];
gdjs.Game_32OverCode.GDNewTextObjects2= [];
gdjs.Game_32OverCode.GDPlayagain_9595buttonObjects1= [];
gdjs.Game_32OverCode.GDPlayagain_9595buttonObjects2= [];
gdjs.Game_32OverCode.GDquit_9595buttonObjects1= [];
gdjs.Game_32OverCode.GDquit_9595buttonObjects2= [];
gdjs.Game_32OverCode.GDPlay_9595again_9595buttonObjects1= [];
gdjs.Game_32OverCode.GDPlay_9595again_9595buttonObjects2= [];


gdjs.Game_32OverCode.mapOfGDgdjs_9546Game_959532OverCode_9546GDPlay_95959595again_95959595buttonObjects1Objects = Hashtable.newFrom({"Play_again_button": gdjs.Game_32OverCode.GDPlay_9595again_9595buttonObjects1});
gdjs.Game_32OverCode.mapOfGDgdjs_9546Game_959532OverCode_9546GDquit_95959595buttonObjects1Objects = Hashtable.newFrom({"quit_button": gdjs.Game_32OverCode.GDquit_9595buttonObjects1});
gdjs.Game_32OverCode.eventsList0 = function(runtimeScene) {

{

gdjs.copyArray(runtimeScene.getObjects("Play_again_button"), gdjs.Game_32OverCode.GDPlay_9595again_9595buttonObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{let isConditionTrue_1 = false;
isConditionTrue_1 = false;
isConditionTrue_1 = gdjs.evtTools.input.cursorOnObject(gdjs.Game_32OverCode.mapOfGDgdjs_9546Game_959532OverCode_9546GDPlay_95959595again_95959595buttonObjects1Objects, runtimeScene, true, false);
if (isConditionTrue_1) {
isConditionTrue_1 = false;
isConditionTrue_1 = gdjs.evtTools.input.isMouseButtonPressed(runtimeScene, "Left");
}
isConditionTrue_0 = isConditionTrue_1;
}
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "Level 1", false);
}}

}


{

gdjs.copyArray(runtimeScene.getObjects("quit_button"), gdjs.Game_32OverCode.GDquit_9595buttonObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{let isConditionTrue_1 = false;
isConditionTrue_1 = false;
isConditionTrue_1 = gdjs.evtTools.input.cursorOnObject(gdjs.Game_32OverCode.mapOfGDgdjs_9546Game_959532OverCode_9546GDquit_95959595buttonObjects1Objects, runtimeScene, true, false);
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

gdjs.Game_32OverCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.Game_32OverCode.GDbackgroundObjects1.length = 0;
gdjs.Game_32OverCode.GDbackgroundObjects2.length = 0;
gdjs.Game_32OverCode.GDNewTextObjects1.length = 0;
gdjs.Game_32OverCode.GDNewTextObjects2.length = 0;
gdjs.Game_32OverCode.GDPlayagain_9595buttonObjects1.length = 0;
gdjs.Game_32OverCode.GDPlayagain_9595buttonObjects2.length = 0;
gdjs.Game_32OverCode.GDquit_9595buttonObjects1.length = 0;
gdjs.Game_32OverCode.GDquit_9595buttonObjects2.length = 0;
gdjs.Game_32OverCode.GDPlay_9595again_9595buttonObjects1.length = 0;
gdjs.Game_32OverCode.GDPlay_9595again_9595buttonObjects2.length = 0;

gdjs.Game_32OverCode.eventsList0(runtimeScene);

return;

}

gdjs['Game_32OverCode'] = gdjs.Game_32OverCode;
