gdjs.Main_32MenuCode = {};
gdjs.Main_32MenuCode.GDNewTiledSpriteObjects1= [];
gdjs.Main_32MenuCode.GDNewTiledSpriteObjects2= [];
gdjs.Main_32MenuCode.GDYellowButtonObjects1= [];
gdjs.Main_32MenuCode.GDYellowButtonObjects2= [];
gdjs.Main_32MenuCode.GDGame_9595TitleObjects1= [];
gdjs.Main_32MenuCode.GDGame_9595TitleObjects2= [];
gdjs.Main_32MenuCode.GDquit_9595buttonObjects1= [];
gdjs.Main_32MenuCode.GDquit_9595buttonObjects2= [];
gdjs.Main_32MenuCode.GDPlay_9595buttonObjects1= [];
gdjs.Main_32MenuCode.GDPlay_9595buttonObjects2= [];
gdjs.Main_32MenuCode.GDSnow_9595BackgroundObjects1= [];
gdjs.Main_32MenuCode.GDSnow_9595BackgroundObjects2= [];
gdjs.Main_32MenuCode.GDLava_9595BackgroundObjects1= [];
gdjs.Main_32MenuCode.GDLava_9595BackgroundObjects2= [];
gdjs.Main_32MenuCode.GDLevel_95951_9595buttonObjects1= [];
gdjs.Main_32MenuCode.GDLevel_95951_9595buttonObjects2= [];
gdjs.Main_32MenuCode.GDLevel_95952_9595buttonObjects1= [];
gdjs.Main_32MenuCode.GDLevel_95952_9595buttonObjects2= [];
gdjs.Main_32MenuCode.GDLevel_95953_9595buttonObjects1= [];
gdjs.Main_32MenuCode.GDLevel_95953_9595buttonObjects2= [];


gdjs.Main_32MenuCode.mapOfGDgdjs_9546Main_959532MenuCode_9546GDLevel_959595951_95959595buttonObjects1Objects = Hashtable.newFrom({"Level_1_button": gdjs.Main_32MenuCode.GDLevel_95951_9595buttonObjects1});
gdjs.Main_32MenuCode.mapOfGDgdjs_9546Main_959532MenuCode_9546GDLevel_959595952_95959595buttonObjects1Objects = Hashtable.newFrom({"Level_2_button": gdjs.Main_32MenuCode.GDLevel_95952_9595buttonObjects1});
gdjs.Main_32MenuCode.mapOfGDgdjs_9546Main_959532MenuCode_9546GDLevel_959595953_95959595buttonObjects1Objects = Hashtable.newFrom({"Level_3_button": gdjs.Main_32MenuCode.GDLevel_95953_9595buttonObjects1});
gdjs.Main_32MenuCode.mapOfGDgdjs_9546Main_959532MenuCode_9546GDquit_95959595buttonObjects1Objects = Hashtable.newFrom({"quit_button": gdjs.Main_32MenuCode.GDquit_9595buttonObjects1});
gdjs.Main_32MenuCode.eventsList0 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
{
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Level_1_button"), gdjs.Main_32MenuCode.GDLevel_95951_9595buttonObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{let isConditionTrue_1 = false;
isConditionTrue_1 = false;
isConditionTrue_1 = gdjs.evtTools.input.cursorOnObject(gdjs.Main_32MenuCode.mapOfGDgdjs_9546Main_959532MenuCode_9546GDLevel_959595951_95959595buttonObjects1Objects, runtimeScene, true, false);
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

gdjs.copyArray(runtimeScene.getObjects("Level_2_button"), gdjs.Main_32MenuCode.GDLevel_95952_9595buttonObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{let isConditionTrue_1 = false;
isConditionTrue_1 = false;
isConditionTrue_1 = gdjs.evtTools.input.cursorOnObject(gdjs.Main_32MenuCode.mapOfGDgdjs_9546Main_959532MenuCode_9546GDLevel_959595952_95959595buttonObjects1Objects, runtimeScene, true, false);
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

gdjs.copyArray(runtimeScene.getObjects("Level_3_button"), gdjs.Main_32MenuCode.GDLevel_95953_9595buttonObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{let isConditionTrue_1 = false;
isConditionTrue_1 = false;
isConditionTrue_1 = gdjs.evtTools.input.cursorOnObject(gdjs.Main_32MenuCode.mapOfGDgdjs_9546Main_959532MenuCode_9546GDLevel_959595953_95959595buttonObjects1Objects, runtimeScene, true, false);
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

gdjs.copyArray(runtimeScene.getObjects("quit_button"), gdjs.Main_32MenuCode.GDquit_9595buttonObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{let isConditionTrue_1 = false;
isConditionTrue_1 = false;
isConditionTrue_1 = gdjs.evtTools.input.cursorOnObject(gdjs.Main_32MenuCode.mapOfGDgdjs_9546Main_959532MenuCode_9546GDquit_95959595buttonObjects1Objects, runtimeScene, true, false);
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

gdjs.Main_32MenuCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.Main_32MenuCode.GDNewTiledSpriteObjects1.length = 0;
gdjs.Main_32MenuCode.GDNewTiledSpriteObjects2.length = 0;
gdjs.Main_32MenuCode.GDYellowButtonObjects1.length = 0;
gdjs.Main_32MenuCode.GDYellowButtonObjects2.length = 0;
gdjs.Main_32MenuCode.GDGame_9595TitleObjects1.length = 0;
gdjs.Main_32MenuCode.GDGame_9595TitleObjects2.length = 0;
gdjs.Main_32MenuCode.GDquit_9595buttonObjects1.length = 0;
gdjs.Main_32MenuCode.GDquit_9595buttonObjects2.length = 0;
gdjs.Main_32MenuCode.GDPlay_9595buttonObjects1.length = 0;
gdjs.Main_32MenuCode.GDPlay_9595buttonObjects2.length = 0;
gdjs.Main_32MenuCode.GDSnow_9595BackgroundObjects1.length = 0;
gdjs.Main_32MenuCode.GDSnow_9595BackgroundObjects2.length = 0;
gdjs.Main_32MenuCode.GDLava_9595BackgroundObjects1.length = 0;
gdjs.Main_32MenuCode.GDLava_9595BackgroundObjects2.length = 0;
gdjs.Main_32MenuCode.GDLevel_95951_9595buttonObjects1.length = 0;
gdjs.Main_32MenuCode.GDLevel_95951_9595buttonObjects2.length = 0;
gdjs.Main_32MenuCode.GDLevel_95952_9595buttonObjects1.length = 0;
gdjs.Main_32MenuCode.GDLevel_95952_9595buttonObjects2.length = 0;
gdjs.Main_32MenuCode.GDLevel_95953_9595buttonObjects1.length = 0;
gdjs.Main_32MenuCode.GDLevel_95953_9595buttonObjects2.length = 0;

gdjs.Main_32MenuCode.eventsList0(runtimeScene);

return;

}

gdjs['Main_32MenuCode'] = gdjs.Main_32MenuCode;
