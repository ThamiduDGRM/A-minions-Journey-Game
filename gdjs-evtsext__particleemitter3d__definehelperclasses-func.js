
if (typeof gdjs.evtsExt__ParticleEmitter3D__DefineHelperClasses !== "undefined") {
  gdjs.evtsExt__ParticleEmitter3D__DefineHelperClasses.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__ParticleEmitter3D__DefineHelperClasses = {};


gdjs.evtsExt__ParticleEmitter3D__DefineHelperClasses.userFunc0x1421058 = function GDJSInlineCode(runtimeScene, eventsFunctionContext) {
"use strict";
gdjs.__particleEmmiter3DExtension = gdjs.__particleEmmiter3DExtension || {};

class ParticleEmitter3DRenderer extends gdjs.CustomRuntimeObject3DRenderer {
    constructor(
      object,
      instanceContainer,
      parent
    ) {
        super(object, instanceContainer, parent);
    }

    _updateThreeGroup() {
      const threeObject3D = this.get3DRendererObject();

      threeObject3D.rotation.set(
        gdjs.toRad(this._object.getRotationX()),
        gdjs.toRad(this._object.getRotationY()),
        -gdjs.toRad(this._object.angle)
      );

      threeObject3D.position.set(
        this._object.getX(),
        -this._object.getY(),
        this._object.getZ()
      );

      threeObject3D.scale.set(
        this._object.isFlippedX() ? -1 : 1,
        this._object.isFlippedY() ? -1 : 1,
        this._object.isFlippedZ() ? -1 : 1
      );

      threeObject3D.visible = !this._object.hidden;

      this._isContainerDirty = true;
    }
}

gdjs.__particleEmmiter3DExtension.ParticleEmitter3DRenderer = ParticleEmitter3DRenderer;

/**
 * @param {string} colorString
 * @param {THREE.Vector4} threeColor
 */
const setThreeColor = (colorString, threeColor = new THREE.Vector4()) => {
    const integerColor = gdjs.rgbOrHexToRGBColor(colorString);
    threeColor.x = integerColor[0] / 255;
    threeColor.y = integerColor[1] / 255;
    threeColor.z = integerColor[2] / 255;
};

/**
 * @param {string} integerOpacity
 * @param {THREE.Vector4} threeColor
 */
const setThreeOpacity = (integerOpacity, threeColor = new THREE.Vector4()) => {
    threeColor.w = integerOpacity / 255;
};

class ParticleEmitterAdapter {
    /**
     * @param particleSystem {ParticleSystem}
     * @param colorOverLife {ColorOverLife}
     * @param sizeOverLife {SizeOverLife}
     * @param applyForce {ApplyForce}
     */
    constructor(particleSystem, colorOverLife, sizeOverLife, applyForce) {
        this.particleSystem = particleSystem;
        this.colorOverLife = colorOverLife;
        this.sizeOverLife = sizeOverLife;
        this.applyForce = applyForce;
    }

    /**
     * @param startColor {string}
     */
    setStartColor(startColor) {
        setThreeColor(startColor, this.colorOverLife.color.color.keys[0][0]);
    }

    /**
     * @param endColor {string}
     */
    setEndColor(endColor) {
        setThreeColor(endColor, this.colorOverLife.color.color.keys[1][0]);
    }

    /**
     * @param startOpacity {number}
     */
    setStartOpacity(startOpacity) {
        this.colorOverLife.color.alpha.keys[0][0] = startOpacity / 255;
    }

    /**
     * @param endOpacity {number}
     */
    setEndOpacity(endOpacity) {
        this.colorOverLife.color.alpha.keys[1][0] = endOpacity / 255;
    }

    /**
     * @param flow {number}
     */
    setFlow(flow) {
        this.particleSystem.emissionOverTime.value = flow;
    }

    /**
     * @param startMinSize {number}
     */
    setStartMinSize(startMinSize) {
        this.particleSystem.startSize.a = startMinSize;
    }

    /**
     * @param startMaxSize {number}
     */
    setStartMaxSize(startMaxSize) {
        this.particleSystem.startSize.b = startMaxSize;
    }

    /**
     * @param endScale {number}
     */
    setEndScale(endScale) {
        /** @type Bezier */
        const bezier = this.sizeOverLife.size.functions[0][0];
        bezier.p[0] = 1;
        bezier.p[1] = gdjs.evtTools.common.lerp(1, endScale, 1 / 3);
        bezier.p[2] = gdjs.evtTools.common.lerp(1, endScale, 2 / 3);
        bezier.p[3] = endScale;
    }

    /**
     * @param startSpeedMin {number}
     */
    setStartSpeedMin(startSpeedMin) {
        this.particleSystem.startSpeed.a = startSpeedMin;
    }

    /**
     * @param startSpeedMax {number}
     */
    setStartSpeedMax(startSpeedMax) {
        this.particleSystem.startSpeed.b = startSpeedMax;
    }

    /**
     * @param lifespanMin {number}
     */
    setLifespanMin(lifespanMin) {
        this.particleSystem.startLife.a = lifespanMin;
    }

    /**
     * @param lifespanMax {number}
     */
    setLifespanMax(lifespanMax) {
        this.particleSystem.startLife.b = lifespanMax;
    }

    /**
     * @param duration {number}
     */
    setDuration(duration) {
        this.particleSystem.duration = duration || Number.POSITIVE_INFINITY;
    }

    /**
     * @param areParticlesRelative {boolean}
     */
    setParticlesRelative(areParticlesRelative) {
        this.particleSystem.worldSpace = !areParticlesRelative;
    }

    /**
     * @param sprayConeAngle {number}
     */
    setSprayConeAngle(sprayConeAngle) {
        if (0 < sprayConeAngle && sprayConeAngle <= 180) {
            if (!this.particleSystem.emitterShape.angle) {
                this.particleSystem.emitterShape = new ConeEmitter({ radius: 0.1, angle: Math.PI / 8 });
            }
            this.particleSystem.emitterShape.angle = sprayConeAngle * Math.PI / 180;
        }
        else {
            if (this.particleSystem.emitterShape.angle) {
                this.particleSystem.emitterShape = new PointEmitter();
            }
        }
    }

    /**
     * @param blending {string}
     */
    setBlending(blendingString) {
        const blending =
            blendingString === "Additive" ? THREE.AdditiveBlending :
                blendingString === "Normal" ? THREE.NormalBlending :
                    blendingString === "Subtractive" ? THREE.SubtractiveBlending :
                        blendingString === "Multiply" ? THREE.MultiplyBlending :
                            blendingString === "None" ? THREE.NoBlending :
                                THREE.AdditiveBlending;
        // TODO This doesn't work.
        this.particleSystem.blending = blending;
    }

    /**
     * @param gravity {number}
     */
    setGravity(gravity) {
        this.applyForce.magnitude.value = gravity;
    }

    /**
     * @param gravityTop {string}
     */
    setGravityTop(gravityTop) {
        // TODO Make gravity absolute even when "relative" is enabled. 
        switch (gravityTop) {
            case "Z+":
                this.applyForce.direction.set(0, 0, -1);
                break;

            case "Y-":
                this.applyForce.direction.set(0, 1, 0);
                break;
        }
    }
}

gdjs.__particleEmmiter3DExtension.ParticleEmitterAdapter = ParticleEmitterAdapter;


/**
 * three.quarks v0.11.2 build Mon Jan 22 2024
 * https://github.com/Alchemist0823/three.quarks#readme
 * Copyright 2024 Alchemist0823 <the.forrest.sun@gmail.com>, MIT
 */

class ParticleEmitter extends THREE.Object3D {
    constructor(system) {
        super();
        this.type = 'ParticleEmitter';
        this.system = system;
    }
    clone() {
        const system = this.system.clone();
        system.emitter.copy(this, true);
        return system.emitter;
    }
    dispose() { }
    extractFromCache(cache) {
        const values = [];
        for (const key in cache) {
            const data = cache[key];
            delete data.metadata;
            values.push(data);
        }
        return values;
    }
    toJSON(meta, options = {}) {
        const isRootObject = meta === undefined || typeof meta === 'string';
        const output = {};
        if (isRootObject) {
            meta = {
                geometries: {},
                materials: {},
                textures: {},
                images: {},
                shapes: {},
                skeletons: {},
                animations: {},
                nodes: {},
            };
            output.metadata = {
                version: 4.5,
                type: 'Object',
                generator: 'Object3D.toJSON',
            };
        }
        const object = {};
        object.uuid = this.uuid;
        object.type = this.type;
        if (this.name !== '')
            object.name = this.name;
        if (this.castShadow === true)
            object.castShadow = true;
        if (this.receiveShadow === true)
            object.receiveShadow = true;
        if (this.visible === false)
            object.visible = false;
        if (this.frustumCulled === false)
            object.frustumCulled = false;
        if (this.renderOrder !== 0)
            object.renderOrder = this.renderOrder;
        if (JSON.stringify(this.userData) !== '{}')
            object.userData = this.userData;
        object.layers = this.layers.mask;
        object.matrix = this.matrix.toArray();
        if (this.matrixAutoUpdate === false)
            object.matrixAutoUpdate = false;
        if (this.system !== null)
            object.ps = this.system.toJSON(meta, options);
        if (this.children.length > 0) {
            object.children = [];
            for (let i = 0; i < this.children.length; i++) {
                if (this.children[i].type !== 'ParticleSystemPreview') {
                    object.children.push(this.children[i].toJSON(meta).object);
                }
            }
        }
        if (isRootObject) {
            const geometries = this.extractFromCache(meta.geometries);
            const materials = this.extractFromCache(meta.materials);
            const textures = this.extractFromCache(meta.textures);
            const images = this.extractFromCache(meta.images);
            if (geometries.length > 0)
                output.geometries = geometries;
            if (materials.length > 0)
                output.materials = materials;
            if (textures.length > 0)
                output.textures = textures;
            if (images.length > 0)
                output.images = images;
        }
        output.object = object;
        return output;
    }
}

class LinkedListNode {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
    hasPrev() {
        return this.prev !== null;
    }
    hasNext() {
        return this.next !== null;
    }
}
class LinkedList {
    constructor() {
        this.length = 0;
        this.head = this.tail = null;
    }
    isEmpty() {
        return this.head === null;
    }
    clear() {
        this.length = 0;
        this.head = this.tail = null;
    }
    front() {
        if (this.head === null)
            return null;
        return this.head.data;
    }
    back() {
        if (this.tail === null)
            return null;
        return this.tail.data;
    }
    dequeue() {
        if (this.head) {
            const value = this.head.data;
            this.head = this.head.next;
            if (!this.head) {
                this.tail = null;
            }
            else {
                this.head.prev = null;
            }
            this.length--;
            return value;
        }
        return undefined;
    }
    pop() {
        if (this.tail) {
            const value = this.tail.data;
            this.tail = this.tail.prev;
            if (!this.tail) {
                this.head = null;
            }
            else {
                this.tail.next = null;
            }
            this.length--;
            return value;
        }
        return undefined;
    }
    queue(data) {
        const node = new LinkedListNode(data);
        if (!this.tail) {
            this.tail = node;
        }
        if (this.head) {
            this.head.prev = node;
            node.next = this.head;
        }
        this.head = node;
        this.length++;
    }
    push(data) {
        const node = new LinkedListNode(data);
        if (!this.head) {
            this.head = node;
        }
        if (this.tail) {
            this.tail.next = node;
            node.prev = this.tail;
        }
        this.tail = node;
        this.length++;
    }
    insertBefore(node, data) {
        const newNode = new LinkedListNode(data);
        newNode.next = node;
        newNode.prev = node.prev;
        if (newNode.prev !== null) {
            newNode.prev.next = newNode;
        }
        newNode.next.prev = newNode;
        if (node == this.head) {
            this.head = newNode;
        }
        this.length++;
    }
    remove(data) {
        if (this.head === null || this.tail === null) {
            return;
        }
        let tempNode = this.head;
        if (data === this.head.data) {
            this.head = this.head.next;
        }
        if (data === this.tail.data) {
            this.tail = this.tail.prev;
        }
        while (tempNode.next !== null && tempNode.data !== data) {
            tempNode = tempNode.next;
        }
        if (tempNode.data === data) {
            if (tempNode.prev !== null)
                tempNode.prev.next = tempNode.next;
            if (tempNode.next !== null)
                tempNode.next.prev = tempNode.prev;
            this.length--;
        }
    }
    *values() {
        let current = this.head;
        while (current !== null) {
            yield current.data;
            current = current.next;
        }
    }
}

class NodeParticle {
    constructor() {
        this.position = new THREE.Vector3();
        this.velocity = new THREE.Vector3();
        this.age = 0;
        this.life = 1;
        this.size = 1;
        this.rotation = 0;
        this.color = new THREE.Vector4(1, 1, 1, 1);
        this.uvTile = 0;
    }
    get died() {
        return this.age >= this.life;
    }
    reset() {
        this.position.set(0, 0, 0);
        this.velocity.set(0, 0, 0);
        this.age = 0;
        this.life = 1;
        this.size = 1;
        this.rotation = 0;
        this.color.set(1, 1, 1, 1);
        this.uvTile = 0;
    }
}
class SpriteParticle {
    constructor() {
        this.startSpeed = 0;
        this.startColor = new THREE.Vector4();
        this.startSize = 1;
        this.position = new THREE.Vector3();
        this.velocity = new THREE.Vector3();
        this.age = 0;
        this.life = 1;
        this.size = 1;
        this.speedModifier = 1;
        this.rotation = 0;
        this.color = new THREE.Vector4();
        this.uvTile = 0;
    }
    get died() {
        return this.age >= this.life;
    }
}
class RecordState {
    constructor(position, size, color) {
        this.position = position;
        this.size = size;
        this.color = color;
    }
}
class TrailParticle {
    constructor() {
        this.startSpeed = 0;
        this.startColor = new THREE.Vector4();
        this.startSize = 1;
        this.position = new THREE.Vector3();
        this.velocity = new THREE.Vector3();
        this.age = 0;
        this.life = 1;
        this.size = 1;
        this.length = 100;
        this.speedModifier = 1;
        this.color = new THREE.Vector4();
        this.previous = new LinkedList();
        this.uvTile = 0;
    }
    update() {
        if (this.age <= this.life) {
            this.previous.push(new RecordState(this.position.clone(), this.size, this.color.clone()));
        }
        else {
            if (this.previous.length > 0) {
                this.previous.dequeue();
            }
        }
        while (this.previous.length > this.length) {
            this.previous.dequeue();
        }
    }
    get died() {
        return this.age >= this.life;
    }
    reset() {
        this.previous.clear();
    }
}

class Bezier {
    constructor(p1, p2, p3, p4) {
        this.p = [p1, p2, p3, p4];
    }
    genValue(t) {
        const t2 = t * t;
        const t3 = t * t * t;
        const mt = 1 - t;
        const mt2 = mt * mt;
        const mt3 = mt2 * mt;
        return this.p[0] * mt3 + this.p[1] * mt2 * t * 3 + this.p[2] * mt * t2 * 3 + this.p[3] * t3;
    }
    derivativeCoefficients(points) {
        const dpoints = [];
        for (let p = points, c = p.length - 1; c > 0; c--) {
            const list = [];
            for (let j = 0; j < c; j++) {
                const dpt = c * (p[j + 1] - p[j]);
                list.push(dpt);
            }
            dpoints.push(list);
            p = list;
        }
        return dpoints;
    }
    getSlope(t) {
        const p = this.derivativeCoefficients(this.p)[0];
        const mt = 1 - t;
        const a = mt * mt;
        const b = mt * t * 2;
        const c = t * t;
        return a * p[0] + b * p[1] + c * p[2];
    }
    controlCurve(d0, d1) {
        this.p[1] = d0 / 3 + this.p[0];
        this.p[2] = this.p[3] - d1 / 3;
    }
    hull(t) {
        let p = this.p;
        let _p = [], pt, idx = 0, i = 0, l = 0;
        const q = [];
        q[idx++] = p[0];
        q[idx++] = p[1];
        q[idx++] = p[2];
        q[idx++] = p[3];
        while (p.length > 1) {
            _p = [];
            for (i = 0, l = p.length - 1; i < l; i++) {
                pt = t * p[i] + (1 - t) * p[i + 1];
                q[idx++] = pt;
                _p.push(pt);
            }
            p = _p;
        }
        return q;
    }
    split(t) {
        const q = this.hull(t);
        const result = {
            left: new Bezier(q[0], q[4], q[7], q[9]),
            right: new Bezier(q[9], q[8], q[6], q[3]),
            span: q
        };
        return result;
    }
    clone() {
        return new Bezier(this.p[0], this.p[1], this.p[2], this.p[3]);
    }
    toJSON() {
        return {
            p0: this.p[0],
            p1: this.p[1],
            p2: this.p[2],
            p3: this.p[3],
        };
    }
    static fromJSON(json) {
        return new Bezier(json.p0, json.p1, json.p2, json.p3);
    }
}

const ColorToJSON = (color) => {
    return { r: color.x, g: color.y, b: color.z, a: color.w };
};
const JSONToColor = (json) => {
    return new THREE.Vector4(json.r, json.g, json.b, json.a);
};
const JSONToValue = (json, type) => {
    switch (type) {
        case 'Vector3':
            return new THREE.Vector3(json.x, json.y, json.z);
        case 'Vector4':
            return new THREE.Vector4(json.x, json.y, json.z, json.w);
        case 'Color':
            return new THREE.Vector3(json.r, json.g, json.b);
        case 'Number':
            return json;
        default:
            return json;
    }
};
const ValueToJSON = (value, type) => {
    switch (type) {
        case 'Vector3':
            return { x: value.x, y: value.y, z: value.z };
        case 'Vector4':
            return { x: value.x, y: value.y, z: value.z, w: value.w };
        case 'Color':
            return { r: value.x, g: value.y, b: value.z };
        case 'Number':
            return value;
        default:
            return value;
    }
};

class RandomColor {
    constructor(a, b) {
        this.a = a;
        this.b = b;
        this.type = "value";
    }
    genColor(color) {
        const rand = Math.random();
        return color.copy(this.a).lerp(this.b, rand);
    }
    toJSON() {
        return {
            type: "RandomColor",
            a: ColorToJSON(this.a),
            b: ColorToJSON(this.b),
        };
    }
    static fromJSON(json) {
        return new RandomColor(JSONToColor(json.a), JSONToColor(json.b));
    }
    clone() {
        return new RandomColor(this.a.clone(), this.b.clone());
    }
}

class ColorRange {
    constructor(a, b) {
        this.a = a;
        this.b = b;
        this.type = 'value';
    }
    genColor(color, t) {
        return color.copy(this.a).lerp(this.b, Math.random());
    }
    toJSON() {
        return {
            type: 'ColorRange',
            a: ColorToJSON(this.a),
            b: ColorToJSON(this.b),
        };
    }
    static fromJSON(json) {
        return new ColorRange(JSONToColor(json.a), JSONToColor(json.b));
    }
    clone() {
        return new ColorRange(this.a.clone(), this.b.clone());
    }
}

class ContinuousLinearFunction {
    constructor(keys, subType) {
        this.subType = subType;
        this.type = 'function';
        this.keys = keys;
    }
    findKey(t) {
        let mid = 0;
        let left = 0, right = this.keys.length - 1;
        while (left + 1 < right) {
            mid = Math.floor((left + right) / 2);
            if (t < this.getStartX(mid))
                right = mid - 1;
            else if (t > this.getEndX(mid))
                left = mid + 1;
            else
                return mid;
        }
        for (let i = left; i <= right; i++) {
            if (t >= this.getStartX(i) && t <= this.getEndX(i))
                return i;
        }
        return -1;
    }
    getStartX(index) {
        return this.keys[index][1];
    }
    getEndX(index) {
        if (index + 1 < this.keys.length)
            return this.keys[index + 1][1];
        return 1;
    }
    genValue(value, t) {
        const index = this.findKey(t);
        if (this.subType === 'Number') {
            if (index === -1) {
                return this.keys[0][0];
            }
            else if (index + 1 >= this.keys.length) {
                return this.keys[this.keys.length - 1][0];
            }
            return ((this.keys[index + 1][0] - this.keys[index][0]) *
                ((t - this.getStartX(index)) / (this.getEndX(index) - this.getStartX(index))) +
                this.keys[index][0]);
        }
        else {
            if (index === -1) {
                return value.copy(this.keys[0][0]);
            }
            if (index + 1 >= this.keys.length) {
                return value.copy(this.keys[this.keys.length - 1][0]);
            }
            return value
                .copy(this.keys[index][0])
                .lerp(this.keys[index + 1][0], (t - this.getStartX(index)) / (this.getEndX(index) - this.getStartX(index)));
        }
    }
    toJSON() {
        this.keys[0][0].constructor.name;
        return {
            type: 'CLinearFunction',
            subType: this.subType,
            keys: this.keys.map(([color, pos]) => ({ value: ValueToJSON(color, this.subType), pos: pos })),
        };
    }
    static fromJSON(json) {
        return new ContinuousLinearFunction(json.keys.map((pair) => [JSONToValue(pair.value, json.subType), pair.pos]), json.subType);
    }
    clone() {
        if (this.subType === 'Number') {
            return new ContinuousLinearFunction(this.keys.map(([value, pos]) => [value, pos]), this.subType);
        }
        else {
            return new ContinuousLinearFunction(this.keys.map(([value, pos]) => [value.clone(), pos]), this.subType);
        }
    }
}

const tempVec3 = new THREE.Vector3();
class Gradient {
    constructor(color = [
        [new THREE.Vector3(0, 0, 0), 0],
        [new THREE.Vector3(1, 1, 1), 0],
    ], alpha = [
        [1, 0],
        [1, 1],
    ]) {
        this.type = 'function';
        this.color = new ContinuousLinearFunction(color, 'Color');
        this.alpha = new ContinuousLinearFunction(alpha, 'Number');
    }
    genColor(color, t) {
        this.color.genValue(tempVec3, t);
        return color.set(tempVec3.x, tempVec3.y, tempVec3.z, this.alpha.genValue(1, t));
    }
    toJSON() {
        return {
            type: 'Gradient',
            color: this.color.toJSON(),
            alpha: this.alpha.toJSON(),
        };
    }
    static fromJSON(json) {
        if (json.functions) {
            const keys = json.functions.map((func) => [ColorRange.fromJSON(func.function).a, func.start]);
            if (json.functions.length > 0) {
                keys.push([ColorRange.fromJSON(json.functions[json.functions.length - 1].function).b, 1]);
            }
            return new Gradient(keys.map((key) => [new THREE.Vector3(key[0].x, key[0].y, key[0].z), key[1]]), keys.map((key) => [key[0].w, key[1]]));
        }
        else {
            const gradient = new Gradient();
            gradient.alpha = ContinuousLinearFunction.fromJSON(json.alpha);
            gradient.color = ContinuousLinearFunction.fromJSON(json.color);
            return gradient;
        }
    }
    clone() {
        const gradient = new Gradient();
        gradient.alpha = this.alpha.clone();
        gradient.color = this.color.clone();
        return gradient;
    }
}

const tempColor = new THREE.Vector4();
class RandomColorBetweenGradient {
    constructor(gradient1, gradient2) {
        this.type = 'memorizedFunction';
        this.gradient1 = gradient1;
        this.gradient2 = gradient2;
    }
    startGen(memory) {
        memory.rand = Math.random();
    }
    genColor(color, t, memory) {
        this.gradient1.genColor(color, t);
        this.gradient2.genColor(tempColor, t);
        if (memory && memory.rand) {
            color.lerp(tempColor, memory.rand);
        }
        else {
            color.lerp(tempColor, Math.random());
        }
        return color;
    }
    toJSON() {
        return {
            type: 'RandomColorBetweenGradient',
            gradient1: this.gradient1.toJSON(),
            gradient2: this.gradient2.toJSON(),
        };
    }
    static fromJSON(json) {
        return new RandomColorBetweenGradient(Gradient.fromJSON(json.gradient1), Gradient.fromJSON(json.gradient2));
    }
    clone() {
        return new RandomColorBetweenGradient(this.gradient1.clone(), this.gradient2.clone());
    }
}

class ConstantColor {
    constructor(color) {
        this.color = color;
        this.type = 'value';
    }
    genColor(color) {
        return color.copy(this.color);
    }
    toJSON() {
        return {
            type: 'ConstantColor',
            color: ColorToJSON(this.color),
        };
    }
    static fromJSON(json) {
        return new ConstantColor(JSONToColor(json.color));
    }
    clone() {
        return new ConstantColor(this.color.clone());
    }
}
function ColorGeneratorFromJSON(json) {
    switch (json.type) {
        case 'ConstantColor':
            return ConstantColor.fromJSON(json);
        case 'ColorRange':
            return ColorRange.fromJSON(json);
        case 'RandomColor':
            return RandomColor.fromJSON(json);
        case 'Gradient':
            return Gradient.fromJSON(json);
        case 'RandomColorBetweenGradient':
            return RandomColorBetweenGradient.fromJSON(json);
        default:
            return new ConstantColor(new THREE.Vector4(1, 1, 1, 1));
    }
}

class ConstantValue {
    constructor(value) {
        this.value = value;
        this.type = 'value';
    }
    genValue() {
        return this.value;
    }
    toJSON() {
        return {
            type: "ConstantValue",
            value: this.value
        };
    }
    static fromJSON(json) {
        return new ConstantValue(json.value);
    }
    clone() {
        return new ConstantValue(this.value);
    }
}

class IntervalValue {
    constructor(a, b) {
        this.a = a;
        this.b = b;
        this.type = 'value';
    }
    genValue() {
        return THREE.MathUtils.lerp(this.a, this.b, Math.random());
    }
    toJSON() {
        return {
            type: 'IntervalValue',
            a: this.a,
            b: this.b,
        };
    }
    static fromJSON(json) {
        return new IntervalValue(json.a, json.b);
    }
    clone() {
        return new IntervalValue(this.a, this.b);
    }
}

class PiecewiseFunction {
    constructor() {
        this.functions = new Array();
    }
    findFunction(t) {
        let mid = 0;
        let left = 0, right = this.functions.length - 1;
        while (left + 1 < right) {
            mid = Math.floor((left + right) / 2);
            if (t < this.getStartX(mid))
                right = mid - 1;
            else if (t > this.getEndX(mid))
                left = mid + 1;
            else
                return mid;
        }
        for (let i = left; i <= right; i++) {
            if (t >= this.functions[i][1] && t <= this.getEndX(i))
                return i;
        }
        return -1;
    }
    getStartX(index) {
        return this.functions[index][1];
    }
    setStartX(index, x) {
        if (index > 0)
            this.functions[index][1] = x;
    }
    getEndX(index) {
        if (index + 1 < this.functions.length)
            return this.functions[index + 1][1];
        return 1;
    }
    setEndX(index, x) {
        if (index + 1 < this.functions.length)
            this.functions[index + 1][1] = x;
    }
    insertFunction(t, func) {
        const index = this.findFunction(t);
        this.functions.splice(index + 1, 0, [func, t]);
    }
    removeFunction(index) {
        return this.functions.splice(index, 1)[0][0];
    }
    getFunction(index) {
        return this.functions[index][0];
    }
    setFunction(index, func) {
        this.functions[index][0] = func;
    }
    get numOfFunctions() {
        return this.functions.length;
    }
}

class PiecewiseBezier extends PiecewiseFunction {
    constructor(curves = [[new Bezier(0, 1.0 / 3, 1.0 / 3 * 2, 1), 0]]) {
        super();
        this.type = "function";
        this.functions = curves;
    }
    genValue(t = 0) {
        const index = this.findFunction(t);
        if (index === -1) {
            return 0;
        }
        return this.functions[index][0].genValue((t - this.getStartX(index)) / (this.getEndX(index) - this.getStartX(index)));
    }
    toSVG(length, segments) {
        if (segments < 1)
            return "";
        let result = ["M", 0, this.functions[0][0].p[0]].join(" ");
        for (let i = 1.0 / segments; i <= 1; i += 1.0 / segments) {
            result = [result, "L", i * length, this.genValue(i)].join(" ");
        }
        return result;
    }
    toJSON() {
        return {
            type: "PiecewiseBezier",
            functions: this.functions.map(([bezier, start]) => ({ function: bezier.toJSON(), start: start })),
        };
    }
    static fromJSON(json) {
        return new PiecewiseBezier(json.functions.map((piecewiseFunction) => ([Bezier.fromJSON(piecewiseFunction.function), piecewiseFunction.start])));
    }
    clone() {
        return new PiecewiseBezier(this.functions.map(([bezier, start]) => ([bezier.clone(), start])));
    }
}

function ValueGeneratorFromJSON(json) {
    switch (json.type) {
        case 'ConstantValue':
            return ConstantValue.fromJSON(json);
        case 'IntervalValue':
            return IntervalValue.fromJSON(json);
        case 'PiecewiseBezier':
            return PiecewiseBezier.fromJSON(json);
        default:
            return new ConstantValue(0);
    }
}

class RandomQuatGenerator {
    constructor() {
        this.type = "rotation";
    }
    genValue(quat, t) {
        let x, y, z, u, v, w;
        do {
            x = Math.random() * 2 - 1;
            y = Math.random() * 2 - 1;
            z = x * x + y * y;
        } while (z > 1);
        do {
            u = Math.random() * 2 - 1;
            v = Math.random() * 2 - 1;
            w = u * u + v * v;
        } while (w > 1);
        const s = Math.sqrt((1 - z) / w);
        quat.set(x, y, s * u, s * v);
        return quat;
    }
    toJSON() {
        return {
            type: "RandomQuat"
        };
    }
    static fromJSON(json) {
        return new RandomQuatGenerator();
    }
    clone() {
        return new RandomQuatGenerator();
    }
}

class AxisAngleGenerator {
    constructor(axis, angle) {
        this.axis = axis;
        this.angle = angle;
        this.type = 'rotation';
    }
    genValue(quat, t) {
        return quat.setFromAxisAngle(this.axis, this.angle.genValue(t));
    }
    toJSON() {
        return {
            type: 'AxisAngle',
            axis: { x: this.axis.x, y: this.axis.y, z: this.axis.z },
            angle: this.angle.toJSON(),
        };
    }
    static fromJSON(json) {
        return new AxisAngleGenerator(new THREE.Vector3(json.axis.x, json.axis.y, json.axis.z), ValueGeneratorFromJSON(json.angle));
    }
    clone() {
        return new AxisAngleGenerator(this.axis.clone(), this.angle.clone());
    }
}

class EulerGenerator {
    constructor(angleX, angleY, angleZ, eulerOrder) {
        this.angleX = angleX;
        this.angleY = angleY;
        this.angleZ = angleZ;
        this.type = 'rotation';
        this.eular = new THREE.Euler(0, 0, 0, eulerOrder);
    }
    genValue(quat, t) {
        this.eular.set(this.angleX.genValue(t), this.angleY.genValue(t), this.angleZ.genValue(t));
        return quat.setFromEuler(this.eular);
    }
    toJSON() {
        return {
            type: 'Euler',
            angleX: this.angleX.toJSON(),
            angleY: this.angleY.toJSON(),
            angleZ: this.angleZ.toJSON(),
            eulerOrder: this.eular.order,
        };
    }
    static fromJSON(json) {
        return new EulerGenerator(ValueGeneratorFromJSON(json.angleX), ValueGeneratorFromJSON(json.angleY), ValueGeneratorFromJSON(json.angleZ), json.eulerOrder);
    }
    clone() {
        return new EulerGenerator(this.angleX, this.angleY, this.angleZ, this.eular.order);
    }
}

function RotationGeneratorFromJSON(json) {
    switch (json.type) {
        case 'AxisAngle':
            return AxisAngleGenerator.fromJSON(json);
        case 'Euler':
            return EulerGenerator.fromJSON(json);
        case 'RandomQuat':
            return RandomQuatGenerator.fromJSON(json);
        default:
            return new RandomQuatGenerator();
    }
}

function GeneratorFromJSON(json) {
    switch (json.type) {
        case 'ConstantValue':
        case 'IntervalValue':
        case 'PiecewiseBezier':
            return ValueGeneratorFromJSON(json);
        case 'AxisAngle':
        case 'RandomQuat':
        case 'Euler':
            return RotationGeneratorFromJSON(json);
        default:
            return new ConstantValue(0);
    }
}

class ColorOverLife {
    constructor(color) {
        this.color = color;
        this.type = 'ColorOverLife';
    }
    initialize(particle) {
        if (this.color.type === 'memorizedFunction') {
            particle.colorOverLifeMemory = {};
            this.color.startGen(particle.colorOverLifeMemory);
        }
    }
    update(particle, delta) {
        if (this.color.type === 'memorizedFunction') {
            this.color.genColor(particle.color, particle.age / particle.life, particle.colorOverLifeMemory);
        }
        else {
            this.color.genColor(particle.color, particle.age / particle.life);
        }
        particle.color.x *= particle.startColor.x;
        particle.color.y *= particle.startColor.y;
        particle.color.z *= particle.startColor.z;
        particle.color.w *= particle.startColor.w;
    }
    frameUpdate(delta) { }
    toJSON() {
        return {
            type: this.type,
            color: this.color.toJSON(),
        };
    }
    static fromJSON(json) {
        return new ColorOverLife(ColorGeneratorFromJSON(json.color));
    }
    clone() {
        return new ColorOverLife(this.color.clone());
    }
    reset() { }
}

class RotationOverLife {
    constructor(angularVelocity) {
        this.angularVelocity = angularVelocity;
        this.type = 'RotationOverLife';
        this.dynamic = !(angularVelocity instanceof ConstantValue || angularVelocity instanceof IntervalValue);
    }
    initialize(particle) {
        this.dynamic = !(this.angularVelocity instanceof ConstantValue || this.angularVelocity instanceof IntervalValue);
        if (!this.dynamic && typeof particle.rotation === 'number') {
            particle.angularVelocity = this.angularVelocity.genValue();
        }
    }
    update(particle, delta) {
        if (!this.dynamic) {
            if (typeof particle.rotation === 'number') {
                particle.rotation += delta * particle.angularVelocity;
            }
        }
        else {
            if (typeof particle.rotation === 'number') {
                particle.rotation +=
                    delta * this.angularVelocity.genValue(particle.age / particle.life);
            }
        }
    }
    toJSON() {
        return {
            type: this.type,
            angularVelocity: this.angularVelocity.toJSON(),
        };
    }
    static fromJSON(json) {
        return new RotationOverLife(ValueGeneratorFromJSON(json.angularVelocity));
    }
    frameUpdate(delta) { }
    clone() {
        return new RotationOverLife(this.angularVelocity.clone());
    }
    reset() { }
}

const IdentityQuaternion = new THREE.Quaternion();
class Rotation3DOverLife {
    constructor(angularVelocity) {
        this.angularVelocity = angularVelocity;
        this.type = 'Rotation3DOverLife';
        this.tempQuat = new THREE.Quaternion();
        this.dynamic = !(angularVelocity instanceof RandomQuatGenerator);
    }
    initialize(particle) {
        this.dynamic = !(this.angularVelocity instanceof RandomQuatGenerator);
        if (particle.rotation instanceof THREE.Quaternion) {
            particle.angularVelocity = new THREE.Quaternion();
            this.angularVelocity.genValue(particle.angularVelocity);
        }
    }
    update(particle, delta) {
        if (particle.rotation instanceof THREE.Quaternion) {
            if (!this.dynamic) {
                this.tempQuat.slerpQuaternions(IdentityQuaternion, particle.angularVelocity, delta);
                particle.rotation.multiply(this.tempQuat);
            }
            else {
                this.angularVelocity.genValue(this.tempQuat, particle.age / particle.life);
                this.tempQuat.slerpQuaternions(IdentityQuaternion, this.tempQuat, delta);
                particle.rotation.multiply(this.tempQuat);
            }
        }
    }
    toJSON() {
        return {
            type: this.type,
            angularVelocity: this.angularVelocity.toJSON(),
        };
    }
    static fromJSON(json) {
        return new Rotation3DOverLife(RotationGeneratorFromJSON(json.angularVelocity));
    }
    frameUpdate(delta) { }
    clone() {
        return new Rotation3DOverLife(this.angularVelocity.clone());
    }
    reset() { }
}

class ForceOverLife {
    initialize(particle) { }
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.type = 'ForceOverLife';
        this._temp = new THREE.Vector3();
    }
    update(particle, delta) {
        this._temp.set(this.x.genValue(particle.age / particle.life), this.y.genValue(particle.age / particle.life), this.z.genValue(particle.age / particle.life));
        particle.velocity.addScaledVector(this._temp, delta);
    }
    toJSON() {
        return {
            type: this.type,
            x: this.x.toJSON(),
            y: this.y.toJSON(),
            z: this.z.toJSON(),
        };
    }
    static fromJSON(json) {
        return new ForceOverLife(ValueGeneratorFromJSON(json.x), ValueGeneratorFromJSON(json.y), ValueGeneratorFromJSON(json.z));
    }
    frameUpdate(delta) { }
    clone() {
        return new ForceOverLife(this.x.clone(), this.y.clone(), this.z.clone());
    }
    reset() { }
}

class SizeOverLife {
    initialize(particle) {
    }
    constructor(size) {
        this.size = size;
        this.type = 'SizeOverLife';
    }
    update(particle) {
        particle.size = particle.startSize * this.size.genValue(particle.age / particle.life);
    }
    toJSON() {
        return {
            type: this.type,
            size: this.size.toJSON(),
        };
    }
    static fromJSON(json) {
        return new SizeOverLife(ValueGeneratorFromJSON(json.size));
    }
    frameUpdate(delta) {
    }
    clone() {
        return new SizeOverLife(this.size.clone());
    }
    reset() {
    }
}

class SpeedOverLife {
    initialize(particle) {
    }
    constructor(speed) {
        this.speed = speed;
        this.type = 'SpeedOverLife';
    }
    update(particle) {
        particle.speedModifier = this.speed.genValue(particle.age / particle.life);
    }
    toJSON() {
        return {
            type: this.type,
            speed: this.speed.toJSON(),
        };
    }
    static fromJSON(json) {
        return new SpeedOverLife(ValueGeneratorFromJSON(json.speed));
    }
    frameUpdate(delta) {
    }
    clone() {
        return new SpeedOverLife(this.speed.clone());
    }
    reset() {
    }
}

class FrameOverLife {
    constructor(frame) {
        this.frame = frame;
        this.type = 'FrameOverLife';
    }
    initialize(particle) {
        if (!(this.frame instanceof PiecewiseBezier)) {
            particle.uvTile = Math.floor(this.frame.genValue(0) + 0.001);
        }
    }
    update(particle, delta) {
        if (this.frame instanceof PiecewiseBezier) {
            particle.uvTile = Math.floor(this.frame.genValue(particle.age / particle.life) + 0.001);
        }
    }
    frameUpdate(delta) { }
    toJSON() {
        return {
            type: this.type,
            frame: this.frame.toJSON(),
        };
    }
    static fromJSON(json) {
        return new FrameOverLife(ValueGeneratorFromJSON(json.frame));
    }
    clone() {
        return new FrameOverLife(this.frame.clone());
    }
    reset() { }
}

new THREE.Vector3(0, 0, 1);
class OrbitOverLife {
    constructor(orbitSpeed, axis = new THREE.Vector3(0, 1, 0)) {
        this.orbitSpeed = orbitSpeed;
        this.axis = axis;
        this.type = 'OrbitOverLife';
        this.temp = new THREE.Vector3();
        this.rotation = new THREE.Quaternion();
        this.line = new THREE.Line3();
    }
    initialize(particle) {
    }
    update(particle, delta) {
        this.line.set(new THREE.Vector3(0, 0, 0), this.axis);
        this.line.closestPointToPoint(particle.position, false, this.temp);
        this.rotation.setFromAxisAngle(this.axis, this.orbitSpeed.genValue(particle.age / particle.life) * delta);
        particle.position.sub(this.temp);
        particle.position.applyQuaternion(this.rotation);
        particle.position.add(this.temp);
    }
    frameUpdate(delta) {
    }
    toJSON() {
        return {
            type: this.type,
            orbitSpeed: this.orbitSpeed.toJSON(),
            axis: [this.axis.x, this.axis.y, this.axis.z],
        };
    }
    static fromJSON(json) {
        return new OrbitOverLife(ValueGeneratorFromJSON(json.orbitSpeed), json.axis ? new THREE.Vector3(json.axis[0], json.axis[1], json.axis[2]) : undefined);
    }
    clone() {
        return new OrbitOverLife(this.orbitSpeed.clone());
    }
    reset() {
    }
}

class WidthOverLength {
    initialize(particle) {
    }
    constructor(width) {
        this.width = width;
        this.type = 'WidthOverLength';
    }
    update(particle) {
        if (particle instanceof TrailParticle) {
            const iter = particle.previous.values();
            for (let i = 0; i < particle.previous.length; i++) {
                const cur = iter.next();
                cur.value.size = this.width.genValue((particle.previous.length - i) / particle.length);
            }
        }
    }
    frameUpdate(delta) {
    }
    toJSON() {
        return {
            type: this.type,
            width: this.width.toJSON(),
        };
    }
    static fromJSON(json) {
        return new WidthOverLength(ValueGeneratorFromJSON(json.width));
    }
    clone() {
        return new WidthOverLength(this.width.clone());
    }
    reset() {
    }
}

class ApplyForce {
    constructor(direction, magnitude) {
        this.direction = direction;
        this.magnitude = magnitude;
        this.type = 'ApplyForce';
        this.magnitudeValue = this.magnitude.genValue();
    }
    initialize(particle) {
    }
    update(particle, delta) {
        particle.velocity.addScaledVector(this.direction, this.magnitudeValue * delta);
    }
    frameUpdate(delta) {
        this.magnitudeValue = this.magnitude.genValue();
    }
    toJSON() {
        return {
            type: this.type,
            direction: [this.direction.x, this.direction.y, this.direction.z],
            magnitude: this.magnitude.toJSON(),
        };
    }
    static fromJSON(json) {
        var _a;
        return new ApplyForce(new THREE.Vector3(json.direction[0], json.direction[1], json.direction[2]), ValueGeneratorFromJSON((_a = json.magnitude) !== null && _a !== void 0 ? _a : json.force));
    }
    clone() {
        return new ApplyForce(this.direction.clone(), this.magnitude.clone());
    }
    reset() {
    }
}

class GravityForce {
    constructor(center, magnitude) {
        this.center = center;
        this.magnitude = magnitude;
        this.type = 'GravityForce';
        this.temp = new THREE.Vector3();
    }
    initialize(particle) {
    }
    update(particle, delta) {
        this.temp.copy(this.center).sub(particle.position).normalize();
        particle.velocity.addScaledVector(this.temp, this.magnitude / particle.position.distanceToSquared(this.center) * delta);
    }
    frameUpdate(delta) {
    }
    toJSON() {
        return {
            type: this.type,
            center: [this.center.x, this.center.y, this.center.z],
            magnitude: this.magnitude,
        };
    }
    static fromJSON(json) {
        return new GravityForce(new THREE.Vector3(json.center[0], json.center[1], json.center[2]), json.magnitude);
    }
    clone() {
        return new GravityForce(this.center.clone(), this.magnitude);
    }
    reset() {
    }
}

new THREE.Vector3(0, 0, 1);
class ChangeEmitDirection {
    constructor(angle) {
        this.angle = angle;
        this.type = 'ChangeEmitDirection';
        this._temp = new THREE.Vector3();
        this._q = new THREE.Quaternion();
    }
    initialize(particle) {
        const len = particle.velocity.length();
        if (len == 0)
            return;
        particle.velocity.normalize();
        if (particle.velocity.x === 0 && particle.velocity.y === 0) {
            this._temp.set(0, particle.velocity.z, 0);
        }
        else {
            this._temp.set(-particle.velocity.y, particle.velocity.x, 0);
        }
        this._q.setFromAxisAngle(this._temp.normalize(), this.angle.genValue());
        this._temp.copy(particle.velocity);
        particle.velocity.applyQuaternion(this._q);
        this._q.setFromAxisAngle(this._temp, Math.random() * Math.PI * 2);
        particle.velocity.applyQuaternion(this._q);
        particle.velocity.setLength(len);
    }
    update(particle, delta) {
    }
    frameUpdate(delta) {
    }
    toJSON() {
        return {
            type: this.type,
            angle: this.angle.toJSON(),
        };
    }
    static fromJSON(json) {
        return new ChangeEmitDirection(ValueGeneratorFromJSON(json.angle));
    }
    clone() {
        return new ChangeEmitDirection(this.angle);
    }
    reset() {
    }
}

const VECTOR_ONE = new THREE.Vector3(1, 1, 1);
const VECTOR_Z = new THREE.Vector3(0, 0, 1);
gdjs.__particleEmmiter3DExtension.SubParticleEmitMode = void 0;
(function (SubParticleEmitMode) {
    SubParticleEmitMode[SubParticleEmitMode["Death"] = 0] = "Death";
    SubParticleEmitMode[SubParticleEmitMode["Birth"] = 1] = "Birth";
    SubParticleEmitMode[SubParticleEmitMode["Frame"] = 2] = "Frame";
})(gdjs.__particleEmmiter3DExtension.SubParticleEmitMode || (gdjs.__particleEmmiter3DExtension.SubParticleEmitMode = {}));
class EmitSubParticleSystem {
    constructor(particleSystem, useVelocityAsBasis, subParticleSystem, mode = gdjs.__particleEmmiter3DExtension.SubParticleEmitMode.Frame, emitProbability = 1) {
        this.particleSystem = particleSystem;
        this.useVelocityAsBasis = useVelocityAsBasis;
        this.subParticleSystem = subParticleSystem;
        this.mode = mode;
        this.emitProbability = emitProbability;
        this.type = 'EmitSubParticleSystem';
        this.q_ = new THREE.Quaternion();
        this.v_ = new THREE.Vector3();
        this.v2_ = new THREE.Vector3();
        this.subEmissions = new Array();
        if (this.subParticleSystem && this.subParticleSystem.system) {
            this.subParticleSystem.system.onlyUsedByOther = true;
        }
    }
    initialize(particle) {
    }
    update(particle, delta) {
        if (this.mode === gdjs.__particleEmmiter3DExtension.SubParticleEmitMode.Frame) {
            this.emit(particle, delta);
        }
        else if (this.mode === gdjs.__particleEmmiter3DExtension.SubParticleEmitMode.Birth && particle.age === 0) {
            this.emit(particle, delta);
        }
        else if (this.mode === gdjs.__particleEmmiter3DExtension.SubParticleEmitMode.Death && particle.age + delta >= particle.life) {
            this.emit(particle, delta);
        }
    }
    emit(particle, delta) {
        if (!this.subParticleSystem)
            return;
        if (Math.random() > this.emitProbability) {
            return;
        }
        const m = new THREE.Matrix4();
        this.setMatrixFromParticle(m, particle);
        this.subEmissions.push({
            burstIndex: 0,
            burstWaveIndex: 0,
            time: 0,
            waitEmiting: 0,
            matrix: m,
            travelDistance: 0,
            particle: particle,
        });
    }
    frameUpdate(delta) {
        if (!this.subParticleSystem)
            return;
        for (let i = 0; i < this.subEmissions.length; i++) {
            if (this.subEmissions[i].time >= this.subParticleSystem.system.duration) {
                this.subEmissions[i] = this.subEmissions[this.subEmissions.length - 1];
                this.subEmissions.length = this.subEmissions.length - 1;
                i--;
            }
            else {
                let subEmissionState = this.subEmissions[i];
                if (subEmissionState.particle && subEmissionState.particle.age < subEmissionState.particle.life) {
                    this.setMatrixFromParticle(subEmissionState.matrix, subEmissionState.particle);
                }
                else {
                    subEmissionState.particle = undefined;
                }
                this.subParticleSystem.system.emit(delta, subEmissionState, subEmissionState.matrix);
            }
        }
    }
    toJSON() {
        return {
            type: this.type,
            subParticleSystem: this.subParticleSystem ? this.subParticleSystem.uuid : '',
            useVelocityAsBasis: this.useVelocityAsBasis,
            mode: this.mode,
            emitProbability: this.emitProbability,
        };
    }
    static fromJSON(json, particleSystem) {
        return new EmitSubParticleSystem(particleSystem, json.useVelocityAsBasis, json.subParticleSystem, json.mode, json.emitProbability);
    }
    clone() {
        return new EmitSubParticleSystem(this.particleSystem, this.useVelocityAsBasis, this.subParticleSystem, this.mode, this.emitProbability);
    }
    reset() { }
    setMatrixFromParticle(m, particle) {
        let rotation;
        if (particle.rotation === undefined || this.useVelocityAsBasis) {
            if (particle.velocity.x === 0 &&
                particle.velocity.y === 0 &&
                (particle.velocity.z === 1 || particle.velocity.z === 0)) {
                m.set(1, 0, 0, particle.position.x, 0, 1, 0, particle.position.y, 0, 0, 1, particle.position.z, 0, 0, 0, 1);
            }
            else {
                this.v_.copy(VECTOR_Z).cross(particle.velocity);
                this.v2_.copy(particle.velocity).cross(this.v_);
                const len = this.v_.length();
                const len2 = this.v2_.length();
                m.set(this.v_.x / len, this.v2_.x / len2, particle.velocity.x, particle.position.x, this.v_.y / len, this.v2_.y / len2, particle.velocity.y, particle.position.y, this.v_.z / len, this.v2_.z / len2, particle.velocity.z, particle.position.z, 0, 0, 0, 1);
            }
        }
        else {
            if (particle.rotation instanceof THREE.Quaternion) {
                rotation = particle.rotation;
            }
            else {
                this.q_.setFromAxisAngle(VECTOR_Z, particle.rotation);
                rotation = this.q_;
            }
            m.compose(particle.position, rotation, VECTOR_ONE);
        }
        if (!this.particleSystem.worldSpace) {
            m.multiplyMatrices(this.particleSystem.emitter.matrixWorld, m);
        }
    }
}

const F2 = 0.5 * (Math.sqrt(3.0) - 1.0);
const G2 = (3.0 - Math.sqrt(3.0)) / 6.0;
const F3 = 1.0 / 3.0;
const G3 = 1.0 / 6.0;
const F4 = (Math.sqrt(5.0) - 1.0) / 4.0;
const G4 = (5.0 - Math.sqrt(5.0)) / 20.0;
const grad3 = new Float32Array([1, 1, 0,
    -1, 1, 0,
    1, -1, 0,
    -1, -1, 0,
    1, 0, 1,
    -1, 0, 1,
    1, 0, -1,
    -1, 0, -1,
    0, 1, 1,
    0, -1, 1,
    0, 1, -1,
    0, -1, -1]);
const grad4 = new Float32Array([0, 1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1,
    0, -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1,
    1, 0, 1, 1, 1, 0, 1, -1, 1, 0, -1, 1, 1, 0, -1, -1,
    -1, 0, 1, 1, -1, 0, 1, -1, -1, 0, -1, 1, -1, 0, -1, -1,
    1, 1, 0, 1, 1, 1, 0, -1, 1, -1, 0, 1, 1, -1, 0, -1,
    -1, 1, 0, 1, -1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, -1,
    1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1, 0,
    -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1, 0]);
class SimplexNoise {
    constructor(randomOrSeed = Math.random) {
        const random = typeof randomOrSeed == 'function' ? randomOrSeed : alea(randomOrSeed);
        this.p = buildPermutationTable(random);
        this.perm = new Uint8Array(512);
        this.permMod12 = new Uint8Array(512);
        for (let i = 0; i < 512; i++) {
            this.perm[i] = this.p[i & 255];
            this.permMod12[i] = this.perm[i] % 12;
        }
    }
    noise2D(x, y) {
        const permMod12 = this.permMod12;
        const perm = this.perm;
        let n0 = 0;
        let n1 = 0;
        let n2 = 0;
        const s = (x + y) * F2;
        const i = Math.floor(x + s);
        const j = Math.floor(y + s);
        const t = (i + j) * G2;
        const X0 = i - t;
        const Y0 = j - t;
        const x0 = x - X0;
        const y0 = y - Y0;
        let i1, j1;
        if (x0 > y0) {
            i1 = 1;
            j1 = 0;
        }
        else {
            i1 = 0;
            j1 = 1;
        }
        const x1 = x0 - i1 + G2;
        const y1 = y0 - j1 + G2;
        const x2 = x0 - 1.0 + 2.0 * G2;
        const y2 = y0 - 1.0 + 2.0 * G2;
        const ii = i & 255;
        const jj = j & 255;
        let t0 = 0.5 - x0 * x0 - y0 * y0;
        if (t0 >= 0) {
            const gi0 = permMod12[ii + perm[jj]] * 3;
            t0 *= t0;
            n0 = t0 * t0 * (grad3[gi0] * x0 + grad3[gi0 + 1] * y0);
        }
        let t1 = 0.5 - x1 * x1 - y1 * y1;
        if (t1 >= 0) {
            const gi1 = permMod12[ii + i1 + perm[jj + j1]] * 3;
            t1 *= t1;
            n1 = t1 * t1 * (grad3[gi1] * x1 + grad3[gi1 + 1] * y1);
        }
        let t2 = 0.5 - x2 * x2 - y2 * y2;
        if (t2 >= 0) {
            const gi2 = permMod12[ii + 1 + perm[jj + 1]] * 3;
            t2 *= t2;
            n2 = t2 * t2 * (grad3[gi2] * x2 + grad3[gi2 + 1] * y2);
        }
        return 70.0 * (n0 + n1 + n2);
    }
    noise3D(x, y, z) {
        const permMod12 = this.permMod12;
        const perm = this.perm;
        let n0, n1, n2, n3;
        const s = (x + y + z) * F3;
        const i = Math.floor(x + s);
        const j = Math.floor(y + s);
        const k = Math.floor(z + s);
        const t = (i + j + k) * G3;
        const X0 = i - t;
        const Y0 = j - t;
        const Z0 = k - t;
        const x0 = x - X0;
        const y0 = y - Y0;
        const z0 = z - Z0;
        let i1, j1, k1;
        let i2, j2, k2;
        if (x0 >= y0) {
            if (y0 >= z0) {
                i1 = 1;
                j1 = 0;
                k1 = 0;
                i2 = 1;
                j2 = 1;
                k2 = 0;
            }
            else if (x0 >= z0) {
                i1 = 1;
                j1 = 0;
                k1 = 0;
                i2 = 1;
                j2 = 0;
                k2 = 1;
            }
            else {
                i1 = 0;
                j1 = 0;
                k1 = 1;
                i2 = 1;
                j2 = 0;
                k2 = 1;
            }
        }
        else {
            if (y0 < z0) {
                i1 = 0;
                j1 = 0;
                k1 = 1;
                i2 = 0;
                j2 = 1;
                k2 = 1;
            }
            else if (x0 < z0) {
                i1 = 0;
                j1 = 1;
                k1 = 0;
                i2 = 0;
                j2 = 1;
                k2 = 1;
            }
            else {
                i1 = 0;
                j1 = 1;
                k1 = 0;
                i2 = 1;
                j2 = 1;
                k2 = 0;
            }
        }
        const x1 = x0 - i1 + G3;
        const y1 = y0 - j1 + G3;
        const z1 = z0 - k1 + G3;
        const x2 = x0 - i2 + 2.0 * G3;
        const y2 = y0 - j2 + 2.0 * G3;
        const z2 = z0 - k2 + 2.0 * G3;
        const x3 = x0 - 1.0 + 3.0 * G3;
        const y3 = y0 - 1.0 + 3.0 * G3;
        const z3 = z0 - 1.0 + 3.0 * G3;
        const ii = i & 255;
        const jj = j & 255;
        const kk = k & 255;
        let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
        if (t0 < 0)
            n0 = 0.0;
        else {
            const gi0 = permMod12[ii + perm[jj + perm[kk]]] * 3;
            t0 *= t0;
            n0 = t0 * t0 * (grad3[gi0] * x0 + grad3[gi0 + 1] * y0 + grad3[gi0 + 2] * z0);
        }
        let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
        if (t1 < 0)
            n1 = 0.0;
        else {
            const gi1 = permMod12[ii + i1 + perm[jj + j1 + perm[kk + k1]]] * 3;
            t1 *= t1;
            n1 = t1 * t1 * (grad3[gi1] * x1 + grad3[gi1 + 1] * y1 + grad3[gi1 + 2] * z1);
        }
        let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
        if (t2 < 0)
            n2 = 0.0;
        else {
            const gi2 = permMod12[ii + i2 + perm[jj + j2 + perm[kk + k2]]] * 3;
            t2 *= t2;
            n2 = t2 * t2 * (grad3[gi2] * x2 + grad3[gi2 + 1] * y2 + grad3[gi2 + 2] * z2);
        }
        let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
        if (t3 < 0)
            n3 = 0.0;
        else {
            const gi3 = permMod12[ii + 1 + perm[jj + 1 + perm[kk + 1]]] * 3;
            t3 *= t3;
            n3 = t3 * t3 * (grad3[gi3] * x3 + grad3[gi3 + 1] * y3 + grad3[gi3 + 2] * z3);
        }
        return 32.0 * (n0 + n1 + n2 + n3);
    }
    noise4D(x, y, z, w) {
        const perm = this.perm;
        let n0, n1, n2, n3, n4;
        const s = (x + y + z + w) * F4;
        const i = Math.floor(x + s);
        const j = Math.floor(y + s);
        const k = Math.floor(z + s);
        const l = Math.floor(w + s);
        const t = (i + j + k + l) * G4;
        const X0 = i - t;
        const Y0 = j - t;
        const Z0 = k - t;
        const W0 = l - t;
        const x0 = x - X0;
        const y0 = y - Y0;
        const z0 = z - Z0;
        const w0 = w - W0;
        let rankx = 0;
        let ranky = 0;
        let rankz = 0;
        let rankw = 0;
        if (x0 > y0)
            rankx++;
        else
            ranky++;
        if (x0 > z0)
            rankx++;
        else
            rankz++;
        if (x0 > w0)
            rankx++;
        else
            rankw++;
        if (y0 > z0)
            ranky++;
        else
            rankz++;
        if (y0 > w0)
            ranky++;
        else
            rankw++;
        if (z0 > w0)
            rankz++;
        else
            rankw++;
        const i1 = rankx >= 3 ? 1 : 0;
        const j1 = ranky >= 3 ? 1 : 0;
        const k1 = rankz >= 3 ? 1 : 0;
        const l1 = rankw >= 3 ? 1 : 0;
        const i2 = rankx >= 2 ? 1 : 0;
        const j2 = ranky >= 2 ? 1 : 0;
        const k2 = rankz >= 2 ? 1 : 0;
        const l2 = rankw >= 2 ? 1 : 0;
        const i3 = rankx >= 1 ? 1 : 0;
        const j3 = ranky >= 1 ? 1 : 0;
        const k3 = rankz >= 1 ? 1 : 0;
        const l3 = rankw >= 1 ? 1 : 0;
        const x1 = x0 - i1 + G4;
        const y1 = y0 - j1 + G4;
        const z1 = z0 - k1 + G4;
        const w1 = w0 - l1 + G4;
        const x2 = x0 - i2 + 2.0 * G4;
        const y2 = y0 - j2 + 2.0 * G4;
        const z2 = z0 - k2 + 2.0 * G4;
        const w2 = w0 - l2 + 2.0 * G4;
        const x3 = x0 - i3 + 3.0 * G4;
        const y3 = y0 - j3 + 3.0 * G4;
        const z3 = z0 - k3 + 3.0 * G4;
        const w3 = w0 - l3 + 3.0 * G4;
        const x4 = x0 - 1.0 + 4.0 * G4;
        const y4 = y0 - 1.0 + 4.0 * G4;
        const z4 = z0 - 1.0 + 4.0 * G4;
        const w4 = w0 - 1.0 + 4.0 * G4;
        const ii = i & 255;
        const jj = j & 255;
        const kk = k & 255;
        const ll = l & 255;
        let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0 - w0 * w0;
        if (t0 < 0)
            n0 = 0.0;
        else {
            const gi0 = (perm[ii + perm[jj + perm[kk + perm[ll]]]] % 32) * 4;
            t0 *= t0;
            n0 = t0 * t0 * (grad4[gi0] * x0 + grad4[gi0 + 1] * y0 + grad4[gi0 + 2] * z0 + grad4[gi0 + 3] * w0);
        }
        let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1 - w1 * w1;
        if (t1 < 0)
            n1 = 0.0;
        else {
            const gi1 = (perm[ii + i1 + perm[jj + j1 + perm[kk + k1 + perm[ll + l1]]]] % 32) * 4;
            t1 *= t1;
            n1 = t1 * t1 * (grad4[gi1] * x1 + grad4[gi1 + 1] * y1 + grad4[gi1 + 2] * z1 + grad4[gi1 + 3] * w1);
        }
        let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2 - w2 * w2;
        if (t2 < 0)
            n2 = 0.0;
        else {
            const gi2 = (perm[ii + i2 + perm[jj + j2 + perm[kk + k2 + perm[ll + l2]]]] % 32) * 4;
            t2 *= t2;
            n2 = t2 * t2 * (grad4[gi2] * x2 + grad4[gi2 + 1] * y2 + grad4[gi2 + 2] * z2 + grad4[gi2 + 3] * w2);
        }
        let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3 - w3 * w3;
        if (t3 < 0)
            n3 = 0.0;
        else {
            const gi3 = (perm[ii + i3 + perm[jj + j3 + perm[kk + k3 + perm[ll + l3]]]] % 32) * 4;
            t3 *= t3;
            n3 = t3 * t3 * (grad4[gi3] * x3 + grad4[gi3 + 1] * y3 + grad4[gi3 + 2] * z3 + grad4[gi3 + 3] * w3);
        }
        let t4 = 0.6 - x4 * x4 - y4 * y4 - z4 * z4 - w4 * w4;
        if (t4 < 0)
            n4 = 0.0;
        else {
            const gi4 = (perm[ii + 1 + perm[jj + 1 + perm[kk + 1 + perm[ll + 1]]]] % 32) * 4;
            t4 *= t4;
            n4 = t4 * t4 * (grad4[gi4] * x4 + grad4[gi4 + 1] * y4 + grad4[gi4 + 2] * z4 + grad4[gi4 + 3] * w4);
        }
        return 27.0 * (n0 + n1 + n2 + n3 + n4);
    }
}
function buildPermutationTable(random) {
    const p = new Uint8Array(256);
    for (let i = 0; i < 256; i++) {
        p[i] = i;
    }
    for (let i = 0; i < 255; i++) {
        const r = i + ~~(random() * (256 - i));
        const aux = p[i];
        p[i] = p[r];
        p[r] = aux;
    }
    return p;
}
function alea(seed) {
    let s0 = 0;
    let s1 = 0;
    let s2 = 0;
    let c = 1;
    const mash = masher();
    s0 = mash(' ');
    s1 = mash(' ');
    s2 = mash(' ');
    s0 -= mash(seed);
    if (s0 < 0) {
        s0 += 1;
    }
    s1 -= mash(seed);
    if (s1 < 0) {
        s1 += 1;
    }
    s2 -= mash(seed);
    if (s2 < 0) {
        s2 += 1;
    }
    return function () {
        const t = 2091639 * s0 + c * 2.3283064365386963e-10;
        s0 = s1;
        s1 = s2;
        return s2 = t - (c = t | 0);
    };
}
function masher() {
    let n = 0xefc8249d;
    return function (data) {
        data = data.toString();
        for (let i = 0; i < data.length; i++) {
            n += data.charCodeAt(i);
            let h = 0.02519603282416938 * n;
            n = h >>> 0;
            h -= n;
            h *= n;
            n = h >>> 0;
            h -= n;
            n += h * 0x100000000;
        }
        return (n >>> 0) * 2.3283064365386963e-10;
    };
}

class TurbulenceField {
    constructor(scale, octaves, velocityMultiplier, timeScale) {
        this.scale = scale;
        this.octaves = octaves;
        this.velocityMultiplier = velocityMultiplier;
        this.timeScale = timeScale;
        this.type = 'TurbulenceField';
        this.generator = new SimplexNoise();
        this.timeOffset = new THREE.Vector3();
        this.temp = new THREE.Vector3();
        this.temp2 = new THREE.Vector3();
        this.timeOffset.x = Math.random() / this.scale.x * this.timeScale.x;
        this.timeOffset.y = Math.random() / this.scale.y * this.timeScale.y;
        this.timeOffset.z = Math.random() / this.scale.z * this.timeScale.z;
    }
    initialize(particle) {
    }
    update(particle, delta) {
        const x = particle.position.x / this.scale.x;
        const y = particle.position.y / this.scale.y;
        const z = particle.position.z / this.scale.z;
        this.temp.set(0, 0, 0);
        let lvl = 1;
        for (let i = 0; i < this.octaves; i++) {
            this.temp2.set(this.generator.noise4D(x * lvl, y * lvl, z * lvl, this.timeOffset.x * lvl) / lvl, this.generator.noise4D(x * lvl, y * lvl, z * lvl, this.timeOffset.y * lvl) / lvl, this.generator.noise4D(x * lvl, y * lvl, z * lvl, this.timeOffset.z * lvl) / lvl);
            this.temp.add(this.temp2);
            lvl *= 2;
        }
        this.temp.multiply(this.velocityMultiplier);
        particle.velocity.addScaledVector(this.temp, delta);
    }
    toJSON() {
        return {
            type: this.type,
            scale: [this.scale.x, this.scale.y, this.scale.z],
            octaves: this.octaves,
            velocityMultiplier: [this.velocityMultiplier.x, this.velocityMultiplier.y, this.velocityMultiplier.z],
            timeScale: [this.timeScale.x, this.timeScale.y, this.timeScale.z],
        };
    }
    frameUpdate(delta) {
        this.timeOffset.x += delta * this.timeScale.x;
        this.timeOffset.y += delta * this.timeScale.y;
        this.timeOffset.z += delta * this.timeScale.z;
    }
    static fromJSON(json) {
        return new TurbulenceField(new THREE.Vector3(json.scale[0], json.scale[1], json.scale[2]), json.octaves, new THREE.Vector3(json.velocityMultiplier[0], json.velocityMultiplier[1], json.velocityMultiplier[2]), new THREE.Vector3(json.timeScale[0], json.timeScale[1], json.timeScale[2]));
    }
    clone() {
        return new TurbulenceField(this.scale.clone(), this.octaves, this.velocityMultiplier.clone(), this.timeScale.clone());
    }
    reset() {
    }
}

function randomInt(a, b) {
    return Math.floor(Math.random() * (b - a)) + a;
}

const generators = [];
const tempV$2 = new THREE.Vector3();
const tempQ$2 = new THREE.Quaternion();
class Noise {
    constructor(frequency, power, positionAmount = new ConstantValue(1), rotationAmount = new ConstantValue(0)) {
        this.frequency = frequency;
        this.power = power;
        this.positionAmount = positionAmount;
        this.rotationAmount = rotationAmount;
        this.type = 'Noise';
        this.duration = 0;
        if (generators.length === 0) {
            for (let i = 0; i < 100; i++) {
                generators.push(new SimplexNoise());
            }
        }
    }
    initialize(particle) {
        particle.lastPosNoise = new THREE.Vector3();
        if (typeof particle.rotation === 'number') {
            particle.lastRotNoise = 0;
        }
        else {
            particle.lastRotNoise = new THREE.Quaternion();
        }
        particle.generatorIndex = [randomInt(0, 100), randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)];
    }
    update(particle, _) {
        let frequency = this.frequency.genValue(particle.age / particle.life);
        let power = this.power.genValue(particle.age / particle.life);
        let positionAmount = this.positionAmount.genValue(particle.age / particle.life);
        let rotationAmount = this.rotationAmount.genValue(particle.age / particle.life);
        if (positionAmount > 0 && particle.lastPosNoise !== undefined) {
            particle.position.sub(particle.lastPosNoise);
            tempV$2.set(generators[particle.generatorIndex[0]].noise2D(0, particle.age * frequency) *
                power *
                positionAmount, generators[particle.generatorIndex[1]].noise2D(0, particle.age * frequency) *
                power *
                positionAmount, generators[particle.generatorIndex[2]].noise2D(0, particle.age * frequency) *
                power *
                positionAmount);
            particle.position.add(tempV$2);
            particle.lastPosNoise.copy(tempV$2);
        }
        if (rotationAmount > 0 && particle.lastRotNoise !== undefined) {
            if (typeof particle.rotation === 'number') {
                particle.rotation -= particle.lastRotNoise;
                particle.rotation +=
                    generators[particle.generatorIndex[3]].noise2D(0, particle.age * frequency) *
                    Math.PI *
                    power *
                    rotationAmount;
            }
            else {
                particle.lastRotNoise.invert();
                particle.rotation.multiply(particle.lastRotNoise);
                tempQ$2
                    .set(generators[particle.generatorIndex[0]].noise2D(0, particle.age * frequency) *
                        power *
                        rotationAmount, generators[particle.generatorIndex[1]].noise2D(0, particle.age * frequency) *
                        power *
                        rotationAmount, generators[particle.generatorIndex[2]].noise2D(0, particle.age * frequency) *
                        power *
                        rotationAmount, generators[particle.generatorIndex[3]].noise2D(0, particle.age * frequency) *
                        power *
                        rotationAmount)
                    .normalize();
                particle.rotation.multiply(tempQ$2);
                particle.lastRotNoise.copy(tempQ$2);
            }
        }
    }
    toJSON() {
        return {
            type: this.type,
            frequency: this.frequency.toJSON(),
            power: this.power.toJSON(),
            positionAmount: this.positionAmount.toJSON(),
            rotationAmount: this.rotationAmount.toJSON(),
        };
    }
    frameUpdate(delta) {
        this.duration += delta;
    }
    static fromJSON(json) {
        return new Noise(ValueGeneratorFromJSON(json.frequency), ValueGeneratorFromJSON(json.power), ValueGeneratorFromJSON(json.positionAmount), ValueGeneratorFromJSON(json.rotationAmount));
    }
    clone() {
        return new Noise(this.frequency.clone(), this.power.clone(), this.positionAmount.clone(), this.rotationAmount.clone());
    }
    reset() { }
}

class TextureSequencer {
    constructor(scaleX = 0, scaleY = 0, position = new THREE.Vector3()) {
        this.scaleX = scaleX;
        this.scaleY = scaleY;
        this.position = position;
        this.locations = [];
    }
    transform(position, index) {
        position.x = this.locations[index % this.locations.length].x * this.scaleX + this.position.x;
        position.y = this.locations[index % this.locations.length].y * this.scaleY + this.position.y;
        position.z = this.position.z;
    }
    static fromJSON(json) {
        const textureSequencer = new TextureSequencer(json.scaleX, json.scaleY, new THREE.Vector3(json.position[0], json.position[1], json.position[2]));
        textureSequencer.locations = json.locations.map((loc) => new THREE.Vector2(loc.x, loc.y));
        return textureSequencer;
    }
    clone() {
        const textureSequencer = new TextureSequencer(this.scaleX, this.scaleY, this.position.clone());
        textureSequencer.locations = this.locations.map(loc => loc.clone());
        return textureSequencer;
    }
    toJSON() {
        return {
            scaleX: this.scaleX,
            scaleY: this.scaleY,
            position: this.position,
            locations: this.locations.map(loc => ({
                x: loc.x,
                y: loc.y,
            }))
        };
    }
    fromImage(img, threshold) {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            return;
        }
        ctx.drawImage(img, 0, 0);
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height, { colorSpace: "srgb" });
        canvas.remove();
        this.locations.length = 0;
        for (let i = 0; i < data.height; i++) {
            for (let j = 0; j < data.width; j++) {
                if (data.data[(i * data.width + j) * 4 + 3] > threshold) {
                    this.locations.push(new THREE.Vector2(j, data.height - i));
                }
            }
        }
    }
}

function SequencerFromJSON(json) {
    switch (json.type) {
        case 'TextureSequencer':
            return TextureSequencer.fromJSON(json);
        default:
            return new TextureSequencer();
    }
}

class ApplySequences {
    constructor(delayBetweenParticles) {
        this.type = 'ApplySequences';
        this.sequencers = [];
        this.time = 0;
        this.index = 0;
        this.pCount = 0;
        this.tempV = new THREE.Vector3();
        this.delay = delayBetweenParticles;
    }
    initialize(particle) {
        particle.id = this.pCount;
        particle.dst = new THREE.Vector3();
        particle.begin = new THREE.Vector3();
        particle.inMotion = false;
        this.pCount++;
    }
    reset() {
        this.time = 0;
        this.index = 0;
        this.pCount = 0;
    }
    update(particle, delta) {
        const sequencer = this.sequencers[this.index];
        const delay = particle.id * this.delay;
        if (this.time >= sequencer[0].a + delay && this.time <= sequencer[0].b + delay) {
            if (!particle.inMotion) {
                particle.inMotion = true;
                particle.begin.copy(particle.position);
                sequencer[1].transform(particle.dst, particle.id);
            }
            particle.position.lerpVectors(particle.begin, particle.dst, ApplySequences.BEZIER.genValue((this.time - sequencer[0].a - delay) / (sequencer[0].b - sequencer[0].a)));
        }
        else if (this.time > sequencer[0].b + delay) {
            particle.inMotion = false;
        }
    }
    frameUpdate(delta) {
        while (this.index + 1 < this.sequencers.length && this.time >= this.sequencers[this.index + 1][0].a) {
            this.index++;
        }
        this.time += delta;
    }
    appendSequencer(range, sequencer) {
        this.sequencers.push([range, sequencer]);
    }
    toJSON() {
        return {
            type: this.type,
            delay: this.delay,
            sequencers: this.sequencers.map(([range, sequencer]) => ({
                range: range.toJSON(),
                sequencer: sequencer.toJSON(),
            })),
        };
    }
    static fromJSON(json) {
        const seq = new ApplySequences(json.delay);
        json.sequencers.forEach((sequencerJson) => {
            seq.sequencers.push([ValueGeneratorFromJSON(sequencerJson.range), SequencerFromJSON(sequencerJson.sequencer)]);
        });
        return seq;
    }
    clone() {
        const applySequences = new ApplySequences(this.delay);
        applySequences.sequencers = this.sequencers.map(seq => [seq[0].clone(), seq[1].clone()]);
        return applySequences;
    }
}
ApplySequences.BEZIER = new Bezier(0, 0, 1, 1);

let physicsResolver;
function setPhysicsResolver(resolver) {
    physicsResolver = resolver;
}
function getPhysicsResolver() {
    return physicsResolver;
}
class ApplyCollision {
    constructor(resolver, bounce) {
        this.resolver = resolver;
        this.bounce = bounce;
        this.type = 'ApplyCollision';
        this.tempV = new THREE.Vector3();
    }
    initialize(particle) {
    }
    update(particle, delta) {
        if (this.resolver.resolve(particle.position, this.tempV)) {
            particle.velocity.reflect(this.tempV).multiplyScalar(this.bounce);
        }
    }
    frameUpdate(delta) {
    }
    toJSON() {
        return {
            type: this.type,
            bounce: this.bounce,
        };
    }
    static fromJSON(json) {
        return new ApplyCollision(getPhysicsResolver(), json.bounce);
    }
    clone() {
        return new ApplyCollision(this.resolver, this.bounce);
    }
    reset() {
    }
}

class ColorBySpeed {
    constructor(color, speedRange) {
        this.color = color;
        this.speedRange = speedRange;
        this.type = 'ColorBySpeed';
    }
    initialize(particle) {
        if (this.color.type === 'memorizedFunction') {
            particle.colorOverLifeMemory = {};
            this.color.startGen(particle.colorOverLifeMemory);
        }
    }
    update(particle, delta) {
        const t = (particle.startSpeed - this.speedRange.a) / (this.speedRange.b - this.speedRange.a);
        if (this.color.type === 'memorizedFunction') {
            this.color.genColor(particle.color, t, particle.colorOverLifeMemory);
        }
        else {
            this.color.genColor(particle.color, t);
        }
        particle.color.x *= particle.startColor.x;
        particle.color.y *= particle.startColor.y;
        particle.color.z *= particle.startColor.z;
        particle.color.w *= particle.startColor.w;
    }
    frameUpdate(delta) { }
    toJSON() {
        return {
            type: this.type,
            color: this.color.toJSON(),
            speedRange: this.speedRange.toJSON(),
        };
    }
    static fromJSON(json) {
        return new ColorBySpeed(ColorGeneratorFromJSON(json.color), IntervalValue.fromJSON(json.speedRange));
    }
    clone() {
        return new ColorBySpeed(this.color.clone(), this.speedRange.clone());
    }
    reset() { }
}

class SizeBySpeed {
    initialize(particle) { }
    constructor(size, speedRange) {
        this.size = size;
        this.speedRange = speedRange;
        this.type = 'SizeBySpeed';
    }
    update(particle) {
        const t = (particle.startSpeed - this.speedRange.a) / (this.speedRange.b - this.speedRange.a);
        particle.size = particle.startSize * this.size.genValue(t);
    }
    toJSON() {
        return {
            type: this.type,
            size: this.size.toJSON(),
            speedRange: this.speedRange.toJSON(),
        };
    }
    static fromJSON(json) {
        return new SizeBySpeed(ValueGeneratorFromJSON(json.size), IntervalValue.fromJSON(json.speedRange));
    }
    frameUpdate(delta) { }
    clone() {
        return new SizeBySpeed(this.size.clone(), this.speedRange.clone());
    }
    reset() { }
}

class RotationBySpeed {
    constructor(angularVelocity, speedRange) {
        this.angularVelocity = angularVelocity;
        this.speedRange = speedRange;
        this.type = 'RotationBySpeed';
        this.tempQuat = new THREE.Quaternion();
    }
    initialize(particle) { }
    update(particle, delta) {
        const t = (particle.startSpeed - this.speedRange.a) / (this.speedRange.b - this.speedRange.a);
        particle.rotation += delta * this.angularVelocity.genValue(t);
    }
    toJSON() {
        return {
            type: this.type,
            angularVelocity: this.angularVelocity.toJSON(),
            speedRange: this.speedRange.toJSON(),
        };
    }
    static fromJSON(json) {
        return new RotationBySpeed(ValueGeneratorFromJSON(json.angularVelocity), IntervalValue.fromJSON(json.speedRange));
    }
    frameUpdate(delta) { }
    clone() {
        return new RotationBySpeed(this.angularVelocity.clone(), this.speedRange.clone());
    }
    reset() { }
}

class LimitSpeedOverLife {
    initialize(particle) { }
    constructor(speed, dampen) {
        this.speed = speed;
        this.dampen = dampen;
        this.type = 'LimitSpeedOverLife';
    }
    update(particle, delta) {
        let speed = particle.velocity.length();
        let limit = this.speed.genValue(particle.age / particle.life);
        if (speed > limit) {
            const percent = (speed - limit) / speed;
            particle.velocity.multiplyScalar(1 - percent * this.dampen * delta * 20);
        }
    }
    toJSON() {
        return {
            type: this.type,
            speed: this.speed.toJSON(),
            dampen: this.dampen,
        };
    }
    static fromJSON(json) {
        return new LimitSpeedOverLife(ValueGeneratorFromJSON(json.speed), json.dampen);
    }
    frameUpdate(delta) { }
    clone() {
        return new LimitSpeedOverLife(this.speed.clone(), this.dampen);
    }
    reset() { }
}

const BehaviorTypes = {
    ApplyForce: {
        type: 'ApplyForce',
        constructor: ApplyForce,
        params: [
            ['direction', 'vec3'],
            ['magnitude', 'value'],
        ],
        loadJSON: ApplyForce.fromJSON,
    },
    Noise: {
        type: 'Noise',
        constructor: Noise,
        params: [
            ['frequency', 'value'],
            ['power', 'value'],
            ['positionAmount', 'value'],
            ['rotationAmount', 'value'],
        ],
        loadJSON: Noise.fromJSON,
    },
    TurbulenceField: {
        type: 'TurbulenceField',
        constructor: TurbulenceField,
        params: [
            ['scale', 'vec3'],
            ['octaves', 'number'],
            ['velocityMultiplier', 'vec3'],
            ['timeScale', 'vec3'],
        ],
        loadJSON: TurbulenceField.fromJSON,
    },
    GravityForce: {
        type: 'GravityForce',
        constructor: GravityForce,
        params: [
            ['center', 'vec3'],
            ['magnitude', 'number'],
        ],
        loadJSON: GravityForce.fromJSON,
    },
    ColorOverLife: {
        type: 'ColorOverLife',
        constructor: ColorOverLife,
        params: [['color', 'colorFunc']],
        loadJSON: ColorOverLife.fromJSON,
    },
    RotationOverLife: {
        type: 'RotationOverLife',
        constructor: RotationOverLife,
        params: [['angularVelocity', 'valueFunc']],
        loadJSON: RotationOverLife.fromJSON,
    },
    Rotation3DOverLife: {
        type: 'Rotation3DOverLife',
        constructor: Rotation3DOverLife,
        params: [['angularVelocity', 'rotationFunc']],
        loadJSON: Rotation3DOverLife.fromJSON,
    },
    SizeOverLife: {
        type: 'SizeOverLife',
        constructor: SizeOverLife,
        params: [['size', 'valueFunc']],
        loadJSON: SizeOverLife.fromJSON,
    },
    ColorBySpeed: {
        type: 'ColorBySpeed',
        constructor: ColorBySpeed,
        params: [
            ['color', 'colorFunc'],
            ['speedRange', 'range'],
        ],
        loadJSON: ColorBySpeed.fromJSON,
    },
    RotationBySpeed: {
        type: 'RotationBySpeed',
        constructor: RotationBySpeed,
        params: [
            ['angularVelocity', 'valueFunc'],
            ['speedRange', 'range'],
        ],
        loadJSON: RotationBySpeed.fromJSON,
    },
    SizeBySpeed: {
        type: 'SizeBySpeed',
        constructor: SizeBySpeed,
        params: [
            ['size', 'valueFunc'],
            ['speedRange', 'range'],
        ],
        loadJSON: SizeBySpeed.fromJSON,
    },
    SpeedOverLife: {
        type: 'SpeedOverLife',
        constructor: SpeedOverLife,
        params: [['speed', 'valueFunc']],
        loadJSON: SpeedOverLife.fromJSON,
    },
    FrameOverLife: {
        type: 'FrameOverLife',
        constructor: FrameOverLife,
        params: [['frame', 'valueFunc']],
        loadJSON: FrameOverLife.fromJSON,
    },
    ForceOverLife: {
        type: 'ForceOverLife',
        constructor: ForceOverLife,
        params: [
            ['x', 'valueFunc'],
            ['y', 'valueFunc'],
            ['z', 'valueFunc'],
        ],
        loadJSON: ForceOverLife.fromJSON,
    },
    OrbitOverLife: {
        type: 'OrbitOverLife',
        constructor: OrbitOverLife,
        params: [
            ['orbitSpeed', 'valueFunc'],
            ['axis', 'vec3'],
        ],
        loadJSON: OrbitOverLife.fromJSON,
    },
    WidthOverLength: {
        type: 'WidthOverLength',
        constructor: WidthOverLength,
        params: [['width', 'valueFunc']],
        loadJSON: WidthOverLength.fromJSON,
    },
    ChangeEmitDirection: {
        type: 'ChangeEmitDirection',
        constructor: ChangeEmitDirection,
        params: [['angle', 'value']],
        loadJSON: ChangeEmitDirection.fromJSON,
    },
    EmitSubParticleSystem: {
        type: 'EmitSubParticleSystem',
        constructor: EmitSubParticleSystem,
        params: [
            ['particleSystem', 'self'],
            ['useVelocityAsBasis', 'boolean'],
            ['subParticleSystem', 'particleSystem'],
            ['mode', 'number'],
            ['emitProbability', 'number'],
        ],
        loadJSON: EmitSubParticleSystem.fromJSON,
    },
    LimitSpeedOverLife: {
        type: 'LimitSpeedOverLife',
        constructor: LimitSpeedOverLife,
        params: [
            ['speed', 'valueFunc'],
            ['dampen', 'number'],
        ],
        loadJSON: LimitSpeedOverLife.fromJSON,
    },
};
function BehaviorFromJSON(json, particleSystem) {
    return BehaviorTypes[json.type].loadJSON(json, particleSystem);
}

gdjs.__particleEmmiter3DExtension.EmitterMode = void 0;
(function (EmitterMode) {
    EmitterMode[EmitterMode["Random"] = 0] = "Random";
    EmitterMode[EmitterMode["Loop"] = 1] = "Loop";
    EmitterMode[EmitterMode["PingPong"] = 2] = "PingPong";
    EmitterMode[EmitterMode["Burst"] = 3] = "Burst";
})(gdjs.__particleEmmiter3DExtension.EmitterMode || (gdjs.__particleEmmiter3DExtension.EmitterMode = {}));
function getValueFromEmitterMode(mode, currentValue, spread) {
    let u;
    if (gdjs.__particleEmmiter3DExtension.EmitterMode.Random === mode) {
        currentValue = Math.random();
    }
    if (spread > 0) {
        u = Math.floor(currentValue / spread) * spread;
    }
    else {
        u = currentValue;
    }
    switch (mode) {
        case gdjs.__particleEmmiter3DExtension.EmitterMode.Loop:
            u = u % 1;
            break;
        case gdjs.__particleEmmiter3DExtension.EmitterMode.PingPong:
            u = Math.abs((u % 2) - 1);
            break;
    }
    return u;
}

class ConeEmitter {
    constructor(parameters = {}) {
        var _a, _b, _c, _d, _e, _f, _g;
        this.type = 'cone';
        this.currentValue = 0;
        this.radius = (_a = parameters.radius) !== null && _a !== void 0 ? _a : 10;
        this.arc = (_b = parameters.arc) !== null && _b !== void 0 ? _b : 2.0 * Math.PI;
        this.thickness = (_c = parameters.thickness) !== null && _c !== void 0 ? _c : 1;
        this.angle = (_d = parameters.angle) !== null && _d !== void 0 ? _d : Math.PI / 6;
        this.mode = (_e = parameters.mode) !== null && _e !== void 0 ? _e : gdjs.__particleEmmiter3DExtension.EmitterMode.Random;
        this.spread = (_f = parameters.spread) !== null && _f !== void 0 ? _f : 0;
        this.speed = (_g = parameters.speed) !== null && _g !== void 0 ? _g : new ConstantValue(1);
    }
    update(system, delta) {
        if (gdjs.__particleEmmiter3DExtension.EmitterMode.Random != this.mode) {
            this.currentValue += this.speed.genValue(system.emissionState.time / system.duration) * delta;
        }
    }
    initialize(p) {
        const u = getValueFromEmitterMode(this.mode, this.currentValue, this.spread);
        const rand = THREE.MathUtils.lerp(1 - this.thickness, 1, Math.random());
        const theta = u * this.arc;
        const r = Math.sqrt(rand);
        const sinTheta = Math.sin(theta);
        const cosTheta = Math.cos(theta);
        p.position.x = r * cosTheta;
        p.position.y = r * sinTheta;
        p.position.z = 0;
        const angle = this.angle * r;
        p.velocity.set(0, 0, Math.cos(angle)).addScaledVector(p.position, Math.sin(angle)).multiplyScalar(p.startSpeed);
        p.position.multiplyScalar(this.radius);
    }
    toJSON() {
        return {
            type: 'cone',
            radius: this.radius,
            arc: this.arc,
            thickness: this.thickness,
            angle: this.angle,
            mode: this.mode,
            spread: this.spread,
            speed: this.speed.toJSON(),
        };
    }
    static fromJSON(json) {
        return new ConeEmitter({
            radius: json.radius,
            arc: json.arc,
            thickness: json.thickness,
            angle: json.angle,
            mode: json.mode,
            speed: json.speed ? ValueGeneratorFromJSON(json.speed) : undefined,
            spread: json.spread,
        });
    }
    clone() {
        return new ConeEmitter({
            radius: this.radius,
            arc: this.arc,
            thickness: this.thickness,
            angle: this.angle,
            mode: this.mode,
            speed: this.speed.clone(),
            spread: this.spread,
        });
    }
}

class CircleEmitter {
    constructor(parameters = {}) {
        var _a, _b, _c, _d, _e, _f;
        this.type = 'circle';
        this.currentValue = 0;
        this.radius = (_a = parameters.radius) !== null && _a !== void 0 ? _a : 10;
        this.arc = (_b = parameters.arc) !== null && _b !== void 0 ? _b : 2.0 * Math.PI;
        this.thickness = (_c = parameters.thickness) !== null && _c !== void 0 ? _c : 1;
        this.mode = (_d = parameters.mode) !== null && _d !== void 0 ? _d : gdjs.__particleEmmiter3DExtension.EmitterMode.Random;
        this.spread = (_e = parameters.spread) !== null && _e !== void 0 ? _e : 0;
        this.speed = (_f = parameters.speed) !== null && _f !== void 0 ? _f : new ConstantValue(1);
    }
    update(system, delta) {
        this.currentValue += this.speed.genValue(system.emissionState.time / system.duration) * delta;
    }
    initialize(p) {
        const u = getValueFromEmitterMode(this.mode, this.currentValue, this.spread);
        const r = THREE.MathUtils.lerp(1 - this.thickness, 1, Math.random());
        const theta = u * this.arc;
        p.position.x = Math.cos(theta);
        p.position.y = Math.sin(theta);
        p.position.z = 0;
        p.velocity.copy(p.position).multiplyScalar(p.startSpeed);
        p.position.multiplyScalar(this.radius * r);
    }
    toJSON() {
        return {
            type: 'circle',
            radius: this.radius,
            arc: this.arc,
            thickness: this.thickness,
            mode: this.mode,
            spread: this.spread,
            speed: this.speed.toJSON(),
        };
    }
    static fromJSON(json) {
        return new CircleEmitter({
            radius: json.radius,
            arc: json.arc,
            thickness: json.thickness,
            mode: json.mode,
            speed: json.speed ? ValueGeneratorFromJSON(json.speed) : undefined,
            spread: json.spread,
        });
    }
    clone() {
        return new CircleEmitter({
            radius: this.radius,
            arc: this.arc,
            thickness: this.thickness,
            mode: this.mode,
            speed: this.speed.clone(),
            spread: this.spread,
        });
    }
}

class DonutEmitter {
    constructor(parameters = {}) {
        var _a, _b, _c, _d, _e, _f, _g;
        this.type = 'donut';
        this.currentValue = 0;
        this.radius = (_a = parameters.radius) !== null && _a !== void 0 ? _a : 10;
        this.arc = (_b = parameters.arc) !== null && _b !== void 0 ? _b : 2.0 * Math.PI;
        this.thickness = (_c = parameters.thickness) !== null && _c !== void 0 ? _c : 1;
        this.donutRadius = (_d = parameters.donutRadius) !== null && _d !== void 0 ? _d : this.radius * 0.2;
        this.mode = (_e = parameters.mode) !== null && _e !== void 0 ? _e : gdjs.__particleEmmiter3DExtension.EmitterMode.Random;
        this.spread = (_f = parameters.spread) !== null && _f !== void 0 ? _f : 0;
        this.speed = (_g = parameters.speed) !== null && _g !== void 0 ? _g : new ConstantValue(1);
    }
    update(system, delta) {
        if (gdjs.__particleEmmiter3DExtension.EmitterMode.Random != this.mode) {
            this.currentValue += this.speed.genValue(system.emissionState.time / system.duration) * delta;
        }
    }
    initialize(p) {
        const u = getValueFromEmitterMode(this.mode, this.currentValue, this.spread);
        const v = Math.random();
        const rand = THREE.MathUtils.lerp(1 - this.thickness, 1, Math.random());
        const theta = u * this.arc;
        const phi = v * Math.PI * 2;
        const sinTheta = Math.sin(theta);
        const cosTheta = Math.cos(theta);
        p.position.x = this.radius * cosTheta;
        p.position.y = this.radius * sinTheta;
        p.position.z = 0;
        p.velocity.z = this.donutRadius * rand * Math.sin(phi);
        p.velocity.x = this.donutRadius * rand * Math.cos(phi) * cosTheta;
        p.velocity.y = this.donutRadius * rand * Math.cos(phi) * sinTheta;
        p.position.add(p.velocity);
        p.velocity.normalize().multiplyScalar(p.startSpeed);
    }
    toJSON() {
        return {
            type: 'donut',
            radius: this.radius,
            arc: this.arc,
            thickness: this.thickness,
            donutRadius: this.donutRadius,
            mode: this.mode,
            spread: this.spread,
            speed: this.speed.toJSON(),
        };
    }
    static fromJSON(json) {
        return new DonutEmitter({
            radius: json.radius,
            arc: json.arc,
            thickness: json.thickness,
            donutRadius: json.donutRadius,
            mode: json.mode,
            speed: json.speed ? ValueGeneratorFromJSON(json.speed) : undefined,
            spread: json.spread,
        });
    }
    clone() {
        return new DonutEmitter({
            radius: this.radius,
            arc: this.arc,
            thickness: this.thickness,
            donutRadius: this.donutRadius,
            mode: this.mode,
            speed: this.speed.clone(),
            spread: this.spread,
        });
    }
}

class PointEmitter {
    constructor() {
        this.type = 'point';
    }
    update(system, delta) { }
    initialize(p) {
        const u = Math.random();
        const v = Math.random();
        const theta = u * Math.PI * 2;
        const phi = Math.acos(2.0 * v - 1.0);
        const r = Math.cbrt(Math.random());
        const sinTheta = Math.sin(theta);
        const cosTheta = Math.cos(theta);
        const sinPhi = Math.sin(phi);
        const cosPhi = Math.cos(phi);
        p.velocity.x = r * sinPhi * cosTheta;
        p.velocity.y = r * sinPhi * sinTheta;
        p.velocity.z = r * cosPhi;
        p.velocity.multiplyScalar(p.startSpeed);
        p.position.setScalar(0);
    }
    toJSON() {
        return {
            type: 'point',
        };
    }
    static fromJSON(json) {
        return new PointEmitter();
    }
    clone() {
        return new PointEmitter();
    }
}

class SphereEmitter {
    constructor(parameters = {}) {
        var _a, _b, _c, _d, _e, _f;
        this.type = 'sphere';
        this.currentValue = 0;
        this.radius = (_a = parameters.radius) !== null && _a !== void 0 ? _a : 10;
        this.arc = (_b = parameters.arc) !== null && _b !== void 0 ? _b : 2.0 * Math.PI;
        this.thickness = (_c = parameters.thickness) !== null && _c !== void 0 ? _c : 1;
        this.mode = (_d = parameters.mode) !== null && _d !== void 0 ? _d : gdjs.__particleEmmiter3DExtension.EmitterMode.Random;
        this.spread = (_e = parameters.spread) !== null && _e !== void 0 ? _e : 0;
        this.speed = (_f = parameters.speed) !== null && _f !== void 0 ? _f : new ConstantValue(1);
    }
    update(system, delta) {
        if (gdjs.__particleEmmiter3DExtension.EmitterMode.Random != this.mode) {
            this.currentValue += this.speed.genValue(system.emissionState.time / system.duration) * delta;
        }
    }
    initialize(p) {
        const u = getValueFromEmitterMode(this.mode, this.currentValue, this.spread);
        const v = Math.random();
        const rand = THREE.MathUtils.lerp(1 - this.thickness, 1, Math.random());
        const theta = u * this.arc;
        const phi = Math.acos(2.0 * v - 1.0);
        const sinTheta = Math.sin(theta);
        const cosTheta = Math.cos(theta);
        const sinPhi = Math.sin(phi);
        const cosPhi = Math.cos(phi);
        p.position.x = sinPhi * cosTheta;
        p.position.y = sinPhi * sinTheta;
        p.position.z = cosPhi;
        p.velocity.copy(p.position).multiplyScalar(p.startSpeed);
        p.position.multiplyScalar(this.radius * rand);
    }
    toJSON() {
        return {
            type: 'sphere',
            radius: this.radius,
            arc: this.arc,
            thickness: this.thickness,
            mode: this.mode,
            spread: this.spread,
            speed: this.speed.toJSON(),
        };
    }
    static fromJSON(json) {
        return new SphereEmitter({
            radius: json.radius,
            arc: json.arc,
            thickness: json.thickness,
            mode: json.mode,
            speed: json.speed ? ValueGeneratorFromJSON(json.speed) : undefined,
            spread: json.spread,
        });
    }
    clone() {
        return new SphereEmitter({
            radius: this.radius,
            arc: this.arc,
            thickness: this.thickness,
            mode: this.mode,
            speed: this.speed.clone(),
            spread: this.spread,
        });
    }
}

class HemisphereEmitter {
    constructor(parameters = {}) {
        var _a, _b, _c, _d, _e, _f;
        this.type = 'sphere';
        this.currentValue = 0;
        this.radius = (_a = parameters.radius) !== null && _a !== void 0 ? _a : 10;
        this.arc = (_b = parameters.arc) !== null && _b !== void 0 ? _b : 2.0 * Math.PI;
        this.thickness = (_c = parameters.thickness) !== null && _c !== void 0 ? _c : 1;
        this.mode = (_d = parameters.mode) !== null && _d !== void 0 ? _d : gdjs.__particleEmmiter3DExtension.EmitterMode.Random;
        this.spread = (_e = parameters.spread) !== null && _e !== void 0 ? _e : 0;
        this.speed = (_f = parameters.speed) !== null && _f !== void 0 ? _f : new ConstantValue(1);
    }
    update(system, delta) {
        if (gdjs.__particleEmmiter3DExtension.EmitterMode.Random != this.mode) {
            this.currentValue += this.speed.genValue(system.emissionState.time / system.duration) * delta;
        }
    }
    initialize(p) {
        const u = getValueFromEmitterMode(this.mode, this.currentValue, this.spread);
        const v = Math.random();
        const rand = THREE.MathUtils.lerp(1 - this.thickness, 1, Math.random());
        const theta = u * this.arc;
        const phi = Math.acos(v);
        const sinTheta = Math.sin(theta);
        const cosTheta = Math.cos(theta);
        const sinPhi = Math.sin(phi);
        const cosPhi = Math.cos(phi);
        p.position.x = sinPhi * cosTheta;
        p.position.y = sinPhi * sinTheta;
        p.position.z = cosPhi;
        p.velocity.copy(p.position).multiplyScalar(p.startSpeed);
        p.position.multiplyScalar(this.radius * rand);
    }
    toJSON() {
        return {
            type: 'hemisphere',
            radius: this.radius,
            arc: this.arc,
            thickness: this.thickness,
            mode: this.mode,
            spread: this.spread,
            speed: this.speed.toJSON(),
        };
    }
    static fromJSON(json) {
        return new HemisphereEmitter({
            radius: json.radius,
            arc: json.arc,
            thickness: json.thickness,
            mode: json.mode,
            speed: json.speed ? ValueGeneratorFromJSON(json.speed) : undefined,
            spread: json.spread,
        });
    }
    clone() {
        return new HemisphereEmitter({
            radius: this.radius,
            arc: this.arc,
            thickness: this.thickness,
            mode: this.mode,
            speed: this.speed.clone(),
            spread: this.spread,
        });
    }
}

class GridEmitter {
    constructor(parameters = {}) {
        var _a, _b, _c, _d;
        this.type = 'grid';
        this.width = (_a = parameters.width) !== null && _a !== void 0 ? _a : 1;
        this.height = (_b = parameters.height) !== null && _b !== void 0 ? _b : 1;
        this.column = (_c = parameters.column) !== null && _c !== void 0 ? _c : 10;
        this.row = (_d = parameters.row) !== null && _d !== void 0 ? _d : 10;
    }
    initialize(p) {
        const r = Math.floor(Math.random() * this.row);
        const c = Math.floor(Math.random() * this.column);
        p.position.x = (c * this.width) / this.column - this.width / 2;
        p.position.y = (r * this.height) / this.row - this.height / 2;
        p.position.z = 0;
        p.velocity.set(0, 0, p.startSpeed);
    }
    toJSON() {
        return {
            type: 'grid',
            width: this.width,
            height: this.height,
            column: this.column,
            row: this.row,
        };
    }
    static fromJSON(json) {
        return new GridEmitter(json);
    }
    clone() {
        return new GridEmitter({
            width: this.width,
            height: this.height,
            column: this.column,
            row: this.row,
        });
    }
    update(system, delta) { }
}

class MeshSurfaceEmitter {
    get geometry() {
        return this._geometry;
    }
    set geometry(geometry) {
        this._geometry = geometry;
        if (geometry === undefined) {
            return;
        }
        if (typeof geometry === 'string') {
            return;
        }
        const tri = new THREE.Triangle();
        this._triangleIndexToArea.length = 0;
        let area = 0;
        if (!geometry.getIndex()) {
            return;
        }
        const array = geometry.getIndex().array;
        const triCount = array.length / 3;
        this._triangleIndexToArea.push(0);
        for (let i = 0; i < triCount; i++) {
            tri.setFromAttributeAndIndices(geometry.getAttribute('position'), array[i * 3], array[i * 3 + 1], array[i * 3 + 2]);
            area += tri.getArea();
            this._triangleIndexToArea.push(area);
        }
        geometry.userData.triangleIndexToArea = this._triangleIndexToArea;
    }
    constructor(geometry) {
        this.type = 'mesh_surface';
        this._triangleIndexToArea = [];
        this._tempA = new THREE.Vector3();
        this._tempB = new THREE.Vector3();
        this._tempC = new THREE.Vector3();
        if (!geometry) {
            return;
        }
        this.geometry = geometry;
    }
    initialize(p) {
        const geometry = this._geometry;
        if (!geometry || geometry.getIndex() === null) {
            p.position.set(0, 0, 0);
            p.velocity.set(0, 0, 1).multiplyScalar(p.startSpeed);
            return;
        }
        const triCount = this._triangleIndexToArea.length - 1;
        let left = 0, right = triCount;
        const target = Math.random() * this._triangleIndexToArea[triCount];
        while (left + 1 < right) {
            const mid = Math.floor((left + right) / 2);
            if (target < this._triangleIndexToArea[mid]) {
                right = mid;
            }
            else {
                left = mid;
            }
        }
        let u1 = Math.random();
        let u2 = Math.random();
        if (u1 + u2 > 1) {
            u1 = 1 - u1;
            u2 = 1 - u2;
        }
        const index1 = geometry.getIndex().array[left * 3];
        const index2 = geometry.getIndex().array[left * 3 + 1];
        const index3 = geometry.getIndex().array[left * 3 + 2];
        const positionBuffer = geometry.getAttribute('position');
        this._tempA.fromBufferAttribute(positionBuffer, index1);
        this._tempB.fromBufferAttribute(positionBuffer, index2);
        this._tempC.fromBufferAttribute(positionBuffer, index3);
        this._tempB.sub(this._tempA);
        this._tempC.sub(this._tempA);
        this._tempA.addScaledVector(this._tempB, u1).addScaledVector(this._tempC, u2);
        p.position.copy(this._tempA);
        this._tempA.copy(this._tempB).cross(this._tempC).normalize();
        p.velocity.copy(this._tempA).normalize().multiplyScalar(p.startSpeed);
    }
    toJSON() {
        return {
            type: 'mesh_surface',
            mesh: this._geometry ? this._geometry.uuid : '',
        };
    }
    static fromJSON(json, meta) {
        return new MeshSurfaceEmitter(meta.geometries[json.geometry]);
    }
    clone() {
        return new MeshSurfaceEmitter(this._geometry);
    }
    update(system, delta) { }
}

const EmitterShapes = {
    circle: {
        type: 'circle',
        params: [
            ['radius', 'number'],
            ['arc', 'radian'],
            ['thickness', 'number'],
            ['mode', 'emitterMode'],
            ['spread', 'number'],
            ['speed', 'valueFunc'],
        ],
        constructor: CircleEmitter,
        loadJSON: CircleEmitter.fromJSON,
    },
    cone: {
        type: 'cone',
        params: [
            ['radius', 'number'],
            ['arc', 'radian'],
            ['thickness', 'number'],
            ['angle', 'radian'],
            ['mode', 'emitterMode'],
            ['spread', 'number'],
            ['speed', 'valueFunc'],
        ],
        constructor: ConeEmitter,
        loadJSON: ConeEmitter.fromJSON,
    },
    donut: {
        type: 'donut',
        params: [
            ['radius', 'number'],
            ['arc', 'radian'],
            ['thickness', 'number'],
            ['donutRadius', 'number'],
            ['mode', 'emitterMode'],
            ['spread', 'number'],
            ['speed', 'valueFunc'],
        ],
        constructor: DonutEmitter,
        loadJSON: DonutEmitter.fromJSON,
    },
    point: { type: 'point', params: [], constructor: PointEmitter, loadJSON: PointEmitter.fromJSON },
    sphere: {
        type: 'sphere',
        params: [
            ['radius', 'number'],
            ['arc', 'radian'],
            ['thickness', 'number'],
            ['angle', 'radian'],
            ['mode', 'emitterMode'],
            ['spread', 'number'],
            ['speed', 'valueFunc'],
        ],
        constructor: SphereEmitter,
        loadJSON: SphereEmitter.fromJSON,
    },
    hemisphere: {
        type: 'hemisphere',
        params: [
            ['radius', 'number'],
            ['arc', 'radian'],
            ['thickness', 'number'],
            ['angle', 'radian'],
            ['mode', 'emitterMode'],
            ['spread', 'number'],
            ['speed', 'valueFunc'],
        ],
        constructor: HemisphereEmitter,
        loadJSON: HemisphereEmitter.fromJSON,
    },
    grid: {
        type: 'grid',
        params: [
            ['width', 'number'],
            ['height', 'number'],
            ['rows', 'number'],
            ['column', 'number'],
        ],
        constructor: GridEmitter,
        loadJSON: GridEmitter.fromJSON,
    },
    mesh_surface: {
        type: 'mesh_surface',
        params: [['geometry', 'geometry']],
        constructor: MeshSurfaceEmitter,
        loadJSON: MeshSurfaceEmitter.fromJSON,
    },
};
function EmitterFromJSON(json, meta) {
    return EmitterShapes[json.type].loadJSON(json, meta);
}

gdjs.__particleEmmiter3DExtension.RenderMode = void 0;
(function (RenderMode) {
    RenderMode[RenderMode["BillBoard"] = 0] = "BillBoard";
    RenderMode[RenderMode["StretchedBillBoard"] = 1] = "StretchedBillBoard";
    RenderMode[RenderMode["Mesh"] = 2] = "Mesh";
    RenderMode[RenderMode["Trail"] = 3] = "Trail";
    RenderMode[RenderMode["HorizontalBillBoard"] = 4] = "HorizontalBillBoard";
    RenderMode[RenderMode["VerticalBillBoard"] = 5] = "VerticalBillBoard";
})(gdjs.__particleEmmiter3DExtension.RenderMode || (gdjs.__particleEmmiter3DExtension.RenderMode = {}));
class VFXBatch extends THREE.Mesh {
    constructor(settings) {
        super();
        this.type = 'VFXBatch';
        this.maxParticles = 1000;
        this.systems = new Set();
        const layers = new THREE.Layers();
        layers.mask = settings.layers.mask;
        const newMat = settings.material.clone();
        newMat.defines = {};
        Object.assign(newMat.defines, settings.material.defines);
        this.settings = {
            instancingGeometry: settings.instancingGeometry,
            renderMode: settings.renderMode,
            renderOrder: settings.renderOrder,
            material: newMat,
            uTileCount: settings.uTileCount,
            vTileCount: settings.vTileCount,
            layers: layers,
        };
        this.frustumCulled = false;
        this.renderOrder = this.settings.renderOrder;
    }
    addSystem(system) {
        this.systems.add(system);
    }
    removeSystem(system) {
        this.systems.delete(system);
    }
}

const UP = new THREE.Vector3(0, 0, 1);
const tempQ$1 = new THREE.Quaternion();
const tempV$1 = new THREE.Vector3();
const tempV2$1 = new THREE.Vector3();
new THREE.Vector3();
const PREWARM_FPS$1 = 60;
const DEFAULT_GEOMETRY$1 = new THREE.PlaneGeometry(1, 1, 1, 1);
class ParticleSystem {
    set time(time) {
        this.emissionState.time = time;
    }
    get time() {
        return this.emissionState.time;
    }
    get layers() {
        return this.rendererSettings.layers;
    }
    get texture() {
        return this.rendererSettings.material.map;
    }
    set texture(texture) {
        this.rendererSettings.material.map = texture;
        this.neededToUpdateRender = true;
    }
    get material() {
        return this.rendererSettings.material;
    }
    set material(material) {
        this.rendererSettings.material = material;
        this.neededToUpdateRender = true;
    }
    get uTileCount() {
        return this.rendererSettings.uTileCount;
    }
    set uTileCount(u) {
        this.rendererSettings.uTileCount = u;
        this.neededToUpdateRender = true;
    }
    get vTileCount() {
        return this.rendererSettings.vTileCount;
    }
    set vTileCount(v) {
        this.rendererSettings.vTileCount = v;
        this.neededToUpdateRender = true;
    }
    get instancingGeometry() {
        return this.rendererSettings.instancingGeometry;
    }
    set instancingGeometry(geometry) {
        this.restart();
        this.particles.length = 0;
        this.rendererSettings.instancingGeometry = geometry;
        this.neededToUpdateRender = true;
    }
    get renderMode() {
        return this.rendererSettings.renderMode;
    }
    set renderMode(renderMode) {
        if ((this.rendererSettings.renderMode != gdjs.__particleEmmiter3DExtension.RenderMode.Trail && renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.Trail) ||
            (this.rendererSettings.renderMode == gdjs.__particleEmmiter3DExtension.RenderMode.Trail && renderMode !== gdjs.__particleEmmiter3DExtension.RenderMode.Trail)) {
            this.restart();
            this.particles.length = 0;
        }
        if (this.rendererSettings.renderMode !== renderMode) {
            switch (renderMode) {
                case gdjs.__particleEmmiter3DExtension.RenderMode.Trail:
                    this.rendererEmitterSettings = {
                        startLength: new ConstantValue(30),
                        followLocalOrigin: false,
                    };
                    break;
                case gdjs.__particleEmmiter3DExtension.RenderMode.Mesh:
                    this.rendererEmitterSettings = {
                        geometry: new THREE.PlaneGeometry(1, 1),
                    };
                    this.startRotation = new AxisAngleGenerator(new THREE.Vector3(0, 1, 0), new ConstantValue(0));
                    break;
                case gdjs.__particleEmmiter3DExtension.RenderMode.StretchedBillBoard:
                    this.rendererEmitterSettings = { speedFactor: 0, lengthFactor: 2 };
                    if (this.rendererSettings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.Mesh) {
                        this.startRotation = new ConstantValue(0);
                    }
                    break;
                case gdjs.__particleEmmiter3DExtension.RenderMode.BillBoard:
                case gdjs.__particleEmmiter3DExtension.RenderMode.VerticalBillBoard:
                case gdjs.__particleEmmiter3DExtension.RenderMode.HorizontalBillBoard:
                    this.rendererEmitterSettings = {};
                    if (this.rendererSettings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.Mesh) {
                        this.startRotation = new ConstantValue(0);
                    }
                    break;
            }
        }
        this.rendererSettings.renderMode = renderMode;
        this.neededToUpdateRender = true;
    }
    get renderOrder() {
        return this.rendererSettings.renderOrder;
    }
    set renderOrder(renderOrder) {
        this.rendererSettings.renderOrder = renderOrder;
        this.neededToUpdateRender = true;
    }
    get blending() {
        return this.rendererSettings.material.blending;
    }
    set blending(blending) {
        this.rendererSettings.material.blending = blending;
        this.neededToUpdateRender = true;
    }
    constructor(parameters) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
        this.temp = new THREE.Vector3();
        this.travelDistance = 0;
        this.normalMatrix = new THREE.Matrix3();
        this.firstTimeUpdate = true;
        this.autoDestroy = parameters.autoDestroy === undefined ? false : parameters.autoDestroy;
        this.duration = (_a = parameters.duration) !== null && _a !== void 0 ? _a : 1;
        this.looping = parameters.looping === undefined ? true : parameters.looping;
        this.prewarm = parameters.prewarm === undefined ? false : parameters.prewarm;
        this.startLife = (_b = parameters.startLife) !== null && _b !== void 0 ? _b : new ConstantValue(5);
        this.startSpeed = (_c = parameters.startSpeed) !== null && _c !== void 0 ? _c : new ConstantValue(0);
        this.startRotation = (_d = parameters.startRotation) !== null && _d !== void 0 ? _d : new ConstantValue(0);
        this.startSize = (_e = parameters.startSize) !== null && _e !== void 0 ? _e : new ConstantValue(1);
        this.startColor = (_f = parameters.startColor) !== null && _f !== void 0 ? _f : new ConstantColor(new THREE.Vector4(1, 1, 1, 1));
        this.emissionOverTime = (_g = parameters.emissionOverTime) !== null && _g !== void 0 ? _g : new ConstantValue(10);
        this.emissionOverDistance = (_h = parameters.emissionOverDistance) !== null && _h !== void 0 ? _h : new ConstantValue(0);
        this.emissionBursts = (_j = parameters.emissionBursts) !== null && _j !== void 0 ? _j : [];
        this.onlyUsedByOther = (_k = parameters.onlyUsedByOther) !== null && _k !== void 0 ? _k : false;
        this.emitterShape = (_l = parameters.shape) !== null && _l !== void 0 ? _l : new SphereEmitter();
        this.behaviors = (_m = parameters.behaviors) !== null && _m !== void 0 ? _m : new Array();
        this.worldSpace = (_o = parameters.worldSpace) !== null && _o !== void 0 ? _o : false;
        this.rendererEmitterSettings = (_p = parameters.rendererEmitterSettings) !== null && _p !== void 0 ? _p : {};
        if (parameters.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.StretchedBillBoard) {
            const stretchedBillboardSettings = this.rendererEmitterSettings;
            if (parameters.speedFactor !== undefined) {
                stretchedBillboardSettings.speedFactor = parameters.speedFactor;
            }
            stretchedBillboardSettings.speedFactor = (_q = stretchedBillboardSettings.speedFactor) !== null && _q !== void 0 ? _q : 0;
            stretchedBillboardSettings.lengthFactor = (_r = stretchedBillboardSettings.lengthFactor) !== null && _r !== void 0 ? _r : 0;
        }
        this.rendererSettings = {
            instancingGeometry: (_s = parameters.instancingGeometry) !== null && _s !== void 0 ? _s : DEFAULT_GEOMETRY$1,
            renderMode: (_t = parameters.renderMode) !== null && _t !== void 0 ? _t : gdjs.__particleEmmiter3DExtension.RenderMode.BillBoard,
            renderOrder: (_u = parameters.renderOrder) !== null && _u !== void 0 ? _u : 0,
            material: parameters.material,
            uTileCount: (_v = parameters.uTileCount) !== null && _v !== void 0 ? _v : 1,
            vTileCount: (_w = parameters.vTileCount) !== null && _w !== void 0 ? _w : 1,
            layers: (_x = parameters.layers) !== null && _x !== void 0 ? _x : new THREE.Layers(),
        };
        this.neededToUpdateRender = true;
        this.particles = new Array();
        this.startTileIndex = parameters.startTileIndex || new ConstantValue(0);
        this.emitter = new ParticleEmitter(this);
        this.paused = false;
        this.particleNum = 0;
        this.emissionState = {
            burstIndex: 0,
            burstWaveIndex: 0,
            time: 0,
            waitEmiting: 0,
            travelDistance: 0,
        };
        this.emitEnded = false;
        this.markForDestroy = false;
        this.prewarmed = false;
    }
    pause() {
        this.paused = true;
    }
    play() {
        this.paused = false;
    }
    spawn(count, emissionState, matrix) {
        tempQ$1.setFromRotationMatrix(matrix);
        const translation = tempV$1;
        const quaternion = tempQ$1;
        const scale = tempV2$1;
        matrix.decompose(translation, quaternion, scale);
        for (let i = 0; i < count; i++) {
            this.particleNum++;
            while (this.particles.length < this.particleNum) {
                if (this.rendererSettings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.Trail) {
                    this.particles.push(new TrailParticle());
                }
                else {
                    this.particles.push(new SpriteParticle());
                }
            }
            const particle = this.particles[this.particleNum - 1];
            particle.speedModifier = 1;
            this.startColor.genColor(particle.startColor, this.emissionState.time, {});
            particle.color.copy(particle.startColor);
            particle.startSpeed = this.startSpeed.genValue(emissionState.time / this.duration);
            particle.life = this.startLife.genValue(emissionState.time / this.duration);
            particle.age = 0;
            particle.startSize = this.startSize.genValue(emissionState.time / this.duration);
            particle.uvTile = Math.floor(this.startTileIndex.genValue() + 0.001);
            particle.size = particle.startSize;
            if (this.rendererSettings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.Mesh ||
                this.rendererSettings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.BillBoard ||
                this.rendererSettings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.VerticalBillBoard ||
                this.rendererSettings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.HorizontalBillBoard ||
                this.rendererSettings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.StretchedBillBoard) {
                const sprite = particle;
                if (this.rendererSettings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.Mesh) {
                    if (!(sprite.rotation instanceof THREE.Quaternion)) {
                        sprite.rotation = new THREE.Quaternion();
                    }
                    if (this.startRotation.type === 'rotation') {
                        this.startRotation.genValue(sprite.rotation, emissionState.time / this.duration);
                    }
                    else {
                        sprite.rotation.setFromAxisAngle(UP, this.startRotation.genValue((emissionState.time / this.duration)));
                    }
                }
                else {
                    if (this.startRotation.type === 'rotation') {
                        sprite.rotation = 0;
                    }
                    else {
                        sprite.rotation = this.startRotation.genValue(emissionState.time / this.duration);
                    }
                }
            }
            else if (this.rendererSettings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.Trail) {
                const trail = particle;
                trail.length = this.rendererEmitterSettings.startLength.genValue(emissionState.time / this.duration);
            }
            this.emitterShape.initialize(particle);
            if (this.rendererSettings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.Trail &&
                this.rendererEmitterSettings.followLocalOrigin) {
                const trail = particle;
                trail.localPosition = new THREE.Vector3().copy(trail.position);
            }
            if (this.worldSpace) {
                particle.position.applyMatrix4(matrix);
                particle.startSize =
                    (particle.startSize * (Math.abs(scale.x) + Math.abs(scale.y) + Math.abs(scale.z))) / 3;
                particle.size = particle.startSize;
                particle.velocity.multiply(scale).applyMatrix3(this.normalMatrix);
                if (particle.rotation && particle.rotation instanceof THREE.Quaternion) {
                    particle.rotation.multiplyQuaternions(tempQ$1, particle.rotation);
                }
            }
            else {
                if (this.onlyUsedByOther) {
                    particle.parentMatrix = matrix;
                }
            }
            for (let j = 0; j < this.behaviors.length; j++) {
                this.behaviors[j].initialize(particle);
            }
        }
    }
    endEmit() {
        this.emitEnded = true;
        if (this.autoDestroy) {
            this.markForDestroy = true;
        }
    }
    dispose() {
        if (this._renderer)
            this._renderer.deleteSystem(this);
        this.emitter.dispose();
        if (this.emitter.parent)
            this.emitter.parent.remove(this.emitter);
    }
    restart() {
        this.paused = false;
        this.particleNum = 0;
        this.emissionState.burstIndex = 0;
        this.emissionState.burstWaveIndex = 0;
        this.emissionState.time = 0;
        this.emissionState.waitEmiting = 0;
        this.behaviors.forEach((behavior) => {
            behavior.reset();
        });
        this.emitEnded = false;
        this.markForDestroy = false;
        this.prewarmed = false;
    }
    update(delta) {
        if (this.paused)
            return;
        let currentParent = this.emitter;
        while (currentParent.parent) {
            currentParent = currentParent.parent;
        }
        if (currentParent.type !== 'Scene') {
            this.dispose();
            return;
        }
        if (this.firstTimeUpdate) {
            this.firstTimeUpdate = false;
            this.emitter.updateWorldMatrix(true, false);
        }
        if (this.emitEnded && this.particleNum === 0) {
            if (this.markForDestroy && this.emitter.parent)
                this.dispose();
            return;
        }
        if (this.looping && this.prewarm && !this.prewarmed) {
            this.prewarmed = true;
            for (let i = 0; i < this.duration * PREWARM_FPS$1; i++) {
                this.update(1.0 / PREWARM_FPS$1);
            }
        }
        if (delta > 0.1) {
            delta = 0.1;
        }
        if (this.neededToUpdateRender) {
            if (this._renderer)
                this._renderer.updateSystem(this);
            this.neededToUpdateRender = false;
        }
        if (!this.onlyUsedByOther) {
            this.emit(delta, this.emissionState, this.emitter.matrixWorld);
        }
        this.emitterShape.update(this, delta);
        for (let j = 0; j < this.behaviors.length; j++) {
            for (let i = 0; i < this.particleNum; i++) {
                if (!this.particles[i].died) {
                    this.behaviors[j].update(this.particles[i], delta);
                }
            }
            this.behaviors[j].frameUpdate(delta);
        }
        for (let i = 0; i < this.particleNum; i++) {
            if (this.rendererEmitterSettings.followLocalOrigin &&
                this.particles[i].localPosition) {
                this.particles[i].position.copy(this.particles[i].localPosition);
                if (this.particles[i].parentMatrix) {
                    this.particles[i].position.applyMatrix4(this.particles[i].parentMatrix);
                }
                else {
                    this.particles[i].position.applyMatrix4(this.emitter.matrixWorld);
                }
            }
            else {
                this.particles[i].position.addScaledVector(this.particles[i].velocity, delta * this.particles[i].speedModifier);
            }
            this.particles[i].age += delta;
        }
        if (this.rendererSettings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.Trail) {
            for (let i = 0; i < this.particleNum; i++) {
                const particle = this.particles[i];
                particle.update();
            }
        }
        for (let i = 0; i < this.particleNum; i++) {
            const particle = this.particles[i];
            if (particle.died && (!(particle instanceof TrailParticle) || particle.previous.length === 0)) {
                this.particles[i] = this.particles[this.particleNum - 1];
                this.particles[this.particleNum - 1] = particle;
                this.particleNum--;
                i--;
            }
        }
    }
    emit(delta, emissionState, emitterMatrix) {
        if (emissionState.time > this.duration) {
            if (this.looping) {
                emissionState.time -= this.duration;
                emissionState.burstIndex = 0;
                this.behaviors.forEach((behavior) => {
                    behavior.reset();
                });
            }
            else {
                if (!this.emitEnded && !this.onlyUsedByOther) {
                    this.endEmit();
                }
            }
        }
        this.normalMatrix.getNormalMatrix(emitterMatrix);
        const totalSpawn = Math.ceil(emissionState.waitEmiting);
        this.spawn(totalSpawn, emissionState, emitterMatrix);
        emissionState.waitEmiting -= totalSpawn;
        while (emissionState.burstIndex < this.emissionBursts.length &&
            this.emissionBursts[emissionState.burstIndex].time <= emissionState.time) {
            if (Math.random() < this.emissionBursts[emissionState.burstIndex].probability) {
                const count = this.emissionBursts[emissionState.burstIndex].count.genValue(this.time);
                this.spawn(count, emissionState, emitterMatrix);
            }
            emissionState.burstIndex++;
        }
        if (!this.emitEnded) {
            emissionState.waitEmiting += delta * this.emissionOverTime.genValue(emissionState.time / this.duration);
            if (emissionState.previousWorldPos != undefined) {
                this.temp.set(emitterMatrix.elements[12], emitterMatrix.elements[13], emitterMatrix.elements[14]);
                emissionState.travelDistance += emissionState.previousWorldPos.distanceTo(this.temp);
                const emitPerMeter = this.emissionOverDistance.genValue(emissionState.time / this.duration);
                if (emissionState.travelDistance * emitPerMeter > 0) {
                    const count = Math.floor(emissionState.travelDistance * emitPerMeter);
                    emissionState.travelDistance -= count / emitPerMeter;
                    emissionState.waitEmiting += count;
                }
            }
        }
        if (emissionState.previousWorldPos === undefined)
            emissionState.previousWorldPos = new THREE.Vector3();
        emissionState.previousWorldPos.set(emitterMatrix.elements[12], emitterMatrix.elements[13], emitterMatrix.elements[14]);
        emissionState.time += delta;
    }
    toJSON(meta, options = {}) {
        const isRootObject = meta === undefined || typeof meta === 'string';
        if (isRootObject) {
            meta = {
                geometries: {},
                materials: {},
                textures: {},
                images: {},
                shapes: {},
                skeletons: {},
                animations: {},
                nodes: {},
            };
        }
        meta.materials[this.rendererSettings.material.uuid] = this.rendererSettings.material.toJSON(meta);
        if (options.useUrlForImage) {
            if (this.texture.source !== undefined) {
                const image = this.texture.source;
                meta.images[image.uuid] = {
                    uuid: image.uuid,
                    url: this.texture.image.url,
                };
            }
        }
        let rendererSettingsJSON;
        if (this.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.Trail) {
            rendererSettingsJSON = {
                startLength: this.rendererEmitterSettings.startLength.toJSON(),
                followLocalOrigin: this.rendererEmitterSettings.followLocalOrigin,
            };
        }
        else if (this.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.Mesh) {
            rendererSettingsJSON = {};
        }
        else if (this.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.StretchedBillBoard) {
            rendererSettingsJSON = {
                speedFactor: this.rendererEmitterSettings.speedFactor,
                lengthFactor: this.rendererEmitterSettings.lengthFactor,
            };
        }
        else {
            rendererSettingsJSON = {};
        }
        const geometry = this.rendererSettings.instancingGeometry;
        if (meta.geometries && !meta.geometries[geometry.uuid]) {
            meta.geometries[geometry.uuid] = geometry.toJSON();
        }
        return {
            version: '2.0',
            autoDestroy: this.autoDestroy,
            looping: this.looping,
            prewarm: this.prewarm,
            duration: this.duration,
            shape: this.emitterShape.toJSON(),
            startLife: this.startLife.toJSON(),
            startSpeed: this.startSpeed.toJSON(),
            startRotation: this.startRotation.toJSON(),
            startSize: this.startSize.toJSON(),
            startColor: this.startColor.toJSON(),
            emissionOverTime: this.emissionOverTime.toJSON(),
            emissionOverDistance: this.emissionOverDistance.toJSON(),
            emissionBursts: this.emissionBursts.map((burst) => ({
                time: burst.time,
                count: burst.count.toJSON(),
                probability: burst.probability,
                interval: burst.interval,
                cycle: burst.cycle,
            })),
            onlyUsedByOther: this.onlyUsedByOther,
            instancingGeometry: this.rendererSettings.instancingGeometry.uuid,
            renderOrder: this.renderOrder,
            renderMode: this.renderMode,
            rendererEmitterSettings: rendererSettingsJSON,
            material: this.rendererSettings.material.uuid,
            layers: this.layers.mask,
            startTileIndex: this.startTileIndex.toJSON(),
            uTileCount: this.uTileCount,
            vTileCount: this.vTileCount,
            behaviors: this.behaviors.map((behavior) => behavior.toJSON()),
            worldSpace: this.worldSpace,
        };
    }
    static fromJSON(json, meta, dependencies) {
        var _a, _b;
        const shape = EmitterFromJSON(json.shape, meta);
        let rendererEmitterSettings;
        if (json.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.Trail) {
            let trailSettings = json.rendererEmitterSettings;
            rendererEmitterSettings = {
                startLength: trailSettings.startLength != undefined
                    ? ValueGeneratorFromJSON(trailSettings.startLength)
                    : new ConstantValue(30),
                followLocalOrigin: trailSettings.followLocalOrigin,
            };
        }
        else if (json.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.Mesh) {
            rendererEmitterSettings = {};
        }
        else if (json.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.StretchedBillBoard) {
            rendererEmitterSettings = json.rendererEmitterSettings;
            if (json.speedFactor != undefined) {
                rendererEmitterSettings.speedFactor = json.speedFactor;
            }
        }
        else {
            rendererEmitterSettings = {};
        }
        const layers = new THREE.Layers();
        if (json.layers) {
            layers.mask = json.layers;
        }
        const ps = new ParticleSystem({
            autoDestroy: json.autoDestroy,
            looping: json.looping,
            prewarm: json.prewarm,
            duration: json.duration,
            shape: shape,
            startLife: ValueGeneratorFromJSON(json.startLife),
            startSpeed: ValueGeneratorFromJSON(json.startSpeed),
            startRotation: GeneratorFromJSON(json.startRotation),
            startSize: ValueGeneratorFromJSON(json.startSize),
            startColor: ColorGeneratorFromJSON(json.startColor),
            emissionOverTime: ValueGeneratorFromJSON(json.emissionOverTime),
            emissionOverDistance: ValueGeneratorFromJSON(json.emissionOverDistance),
            emissionBursts: (_a = json.emissionBursts) === null || _a === void 0 ? void 0 : _a.map((burst) => ({
                time: burst.time,
                count: typeof burst.count === 'number'
                    ? new ConstantValue(burst.count)
                    : ValueGeneratorFromJSON(burst.count),
                probability: burst.probability,
                interval: burst.interval,
                cycle: burst.cycle,
            })),
            onlyUsedByOther: json.onlyUsedByOther,
            instancingGeometry: meta.geometries[json.instancingGeometry],
            renderMode: json.renderMode,
            rendererEmitterSettings: rendererEmitterSettings,
            renderOrder: json.renderOrder,
            layers: layers,
            material: json.material
                ? meta.materials[json.material]
                : json.texture
                    ? new THREE.MeshBasicMaterial({
                        map: meta.textures[json.texture],
                        transparent: (_b = json.transparent) !== null && _b !== void 0 ? _b : true,
                        blending: json.blending,
                        side: THREE.DoubleSide,
                    })
                    : new THREE.MeshBasicMaterial({
                        color: 0xffffff,
                        transparent: true,
                        blending: THREE.AdditiveBlending,
                        side: THREE.DoubleSide,
                    }),
            startTileIndex: typeof json.startTileIndex === 'number'
                ? new ConstantValue(json.startTileIndex)
                : ValueGeneratorFromJSON(json.startTileIndex),
            uTileCount: json.uTileCount,
            vTileCount: json.vTileCount,
            behaviors: [],
            worldSpace: json.worldSpace,
        });
        ps.behaviors = json.behaviors.map((behaviorJson) => {
            const behavior = BehaviorFromJSON(behaviorJson, ps);
            if (behavior.type === 'EmitSubParticleSystem') {
                dependencies[behaviorJson.subParticleSystem] = behavior;
            }
            return behavior;
        });
        return ps;
    }
    addBehavior(behavior) {
        this.behaviors.push(behavior);
    }
    getRendererSettings() {
        return this.rendererSettings;
    }
    clone() {
        const newEmissionBursts = [];
        for (const emissionBurst of this.emissionBursts) {
            const newEmissionBurst = {};
            Object.assign(newEmissionBurst, emissionBurst);
            newEmissionBursts.push(newEmissionBurst);
        }
        const newBehaviors = [];
        for (const behavior of this.behaviors) {
            newBehaviors.push(behavior.clone());
        }
        let rendererEmitterSettings;
        if (this.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.Trail) {
            rendererEmitterSettings = {
                startLength: this.rendererEmitterSettings.startLength.clone(),
                followLocalOrigin: this.rendererEmitterSettings.followLocalOrigin,
            };
        }
        else {
            rendererEmitterSettings = {};
        }
        const layers = new THREE.Layers();
        layers.mask = this.layers.mask;
        return new ParticleSystem({
            autoDestroy: this.autoDestroy,
            looping: this.looping,
            duration: this.duration,
            shape: this.emitterShape.clone(),
            startLife: this.startLife.clone(),
            startSpeed: this.startSpeed.clone(),
            startRotation: this.startRotation.clone(),
            startSize: this.startSize.clone(),
            startColor: this.startColor.clone(),
            emissionOverTime: this.emissionOverTime.clone(),
            emissionOverDistance: this.emissionOverDistance.clone(),
            emissionBursts: newEmissionBursts,
            onlyUsedByOther: this.onlyUsedByOther,
            instancingGeometry: this.rendererSettings.instancingGeometry,
            renderMode: this.renderMode,
            renderOrder: this.renderOrder,
            rendererEmitterSettings: rendererEmitterSettings,
            material: this.rendererSettings.material,
            startTileIndex: this.startTileIndex,
            uTileCount: this.uTileCount,
            vTileCount: this.vTileCount,
            behaviors: newBehaviors,
            worldSpace: this.worldSpace,
            layers: layers,
        });
    }
}

var particle_frag = `

#include <common>
#include <uv_pars_fragment>
#include <color_pars_fragment>
#include <map_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
#include <alphatest_pars_fragment>

void main() {

    #include <clipping_planes_fragment>
    
    vec3 outgoingLight = vec3( 0.0 );
    vec4 diffuseColor = vColor;
    
    #include <logdepthbuf_fragment>
    
    #ifdef USE_MAP
    diffuseColor *= texture2D( map, vMapUv);
    #endif
    
    #include <alphatest_fragment>

    outgoingLight = diffuseColor.rgb;
    
    #ifdef USE_COLOR_AS_ALPHA
    gl_FragColor = vec4( outgoingLight, diffuseColor.r );
    #else
    gl_FragColor = vec4( outgoingLight, diffuseColor.a );
    #endif
    
    
    #include <tonemapping_fragment>

}
`;

var particle_physics_frag = `
#define STANDARD
#ifdef PHYSICAL
#define IOR
#define SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
uniform float ior;
#endif
#ifdef SPECULAR
uniform float specularIntensity;
uniform vec3 specularColor;
#ifdef USE_SPECULARINTENSITYMAP
uniform sampler2D specularIntensityMap;
#endif
#ifdef USE_SPECULARCOLORMAP
uniform sampler2D specularColorMap;
#endif
#endif
#ifdef USE_CLEARCOAT
uniform float clearcoat;
uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
uniform float iridescence;
uniform float iridescenceIOR;
uniform float iridescenceThicknessMinimum;
uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
uniform vec3 sheenColor;
uniform float sheenRoughness;
#ifdef USE_SHEENCOLORMAP
uniform sampler2D sheenColorMap;
#endif
#ifdef USE_SHEENROUGHNESSMAP
uniform sampler2D sheenRoughnessMap;
#endif
#endif

varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <bsdfs>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
    #include <clipping_planes_fragment>
    vec4 diffuseColor = vec4( diffuse, opacity );
    ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
    vec3 totalEmissiveRadiance = emissive;
    #include <logdepthbuf_fragment>
    #include <map_fragment>
    #include <color_fragment>
    #include <alphamap_fragment>
    #include <alphatest_fragment>
    #include <roughnessmap_fragment>
    #include <metalnessmap_fragment>
    #include <normal_fragment_begin>
    #include <normal_fragment_maps>
    #include <clearcoat_normal_fragment_begin>
    #include <clearcoat_normal_fragment_maps>
    #include <emissivemap_fragment>
    // accumulation
    #include <lights_physical_fragment>
    #include <lights_fragment_begin>
    #include <lights_fragment_maps>
    #include <lights_fragment_end>
    // modulation
    #include <aomap_fragment>
    vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
    vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
    #include <transmission_fragment>
    vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
    #ifdef USE_SHEEN
    // Sheen energy compensation approximation calculation can be found at the end of
        // https://drive.google.com/file/d/1T0D1VSyR4AllqIJTQAraEIzjlb5h4FKH/view?usp=sharing
        float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
        outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;
    #endif
    #ifdef USE_CLEARCOAT
        float dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );
        vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
        outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;
    #endif
    #include <output_fragment>
    #include <tonemapping_fragment>
    #include <encodings_fragment>
    #include <fog_fragment>
    #include <premultiplied_alpha_fragment>
    #include <dithering_fragment>
}`;

var uv_vertex_tile = `

    #ifdef UV_TILE
        float col = mod(uvTile, tileCount.x);
        float row = (tileCount.y - floor(uvTile / tileCount.x) - 1.0);
        
        mat3 tileTransform = mat3(
          1.0 / tileCount.x, 0.0, 0.0,
          0.0, 1.0 / tileCount.y, 0.0, 
          col / tileCount.x, row / tileCount.y, 1.0);
    #else
        mat3 tileTransform = mat3(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0);
    #endif

#if defined( USE_UV ) || defined( USE_ANISOTROPY )

vUv = (tileTransform *vec3( uv, 1 )).xy;

#endif
#ifdef USE_MAP

vMapUv = ( tileTransform * (mapTransform * vec3( MAP_UV, 1 ) )).xy;

#endif
#ifdef USE_ALPHAMAP

vAlphaMapUv = ( tileTransform * (alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_LIGHTMAP

vLightMapUv = ( tileTransform * (lightMapTransform * vec3( LIGHTMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_AOMAP

vAoMapUv = ( tileTransform * (aoMapTransform * vec3( AOMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_BUMPMAP

vBumpMapUv = ( tileTransform * (bumpMapTransform * vec3( BUMPMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_NORMALMAP

vNormalMapUv = ( tileTransform * (normalMapTransform * vec3( NORMALMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_DISPLACEMENTMAP

vDisplacementMapUv = ( tileTransform * (displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_EMISSIVEMAP

vEmissiveMapUv = ( tileTransform * (emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_METALNESSMAP

vMetalnessMapUv = ( tileTransform * (metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_ROUGHNESSMAP

vRoughnessMapUv = ( tileTransform * (roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_ANISOTROPYMAP

vAnisotropyMapUv = ( tileTransform * (anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_CLEARCOATMAP

vClearcoatMapUv = ( tileTransform * (clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_CLEARCOAT_NORMALMAP

vClearcoatNormalMapUv = ( tileTransform * (clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP

vClearcoatRoughnessMapUv = ( tileTransform * (clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_IRIDESCENCEMAP

vIridescenceMapUv = ( tileTransform * (iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP

vIridescenceThicknessMapUv = ( tileTransform * (iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_SHEEN_COLORMAP

vSheenColorMapUv = ( tileTransform * (sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_SHEEN_ROUGHNESSMAP

vSheenRoughnessMapUv = ( tileTransform * (sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_SPECULARMAP

vSpecularMapUv = ( tileTransform * (specularMapTransform * vec3( SPECULARMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_SPECULAR_COLORMAP

vSpecularColorMapUv = ( tileTransform * (specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_SPECULAR_INTENSITYMAP

vSpecularIntensityMapUv = ( tileTransform * (specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_TRANSMISSIONMAP

vTransmissionMapUv = ( tileTransform * transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) )).xy;

#endif
#ifdef USE_THICKNESSMAP

vThicknessMapUv = ( tileTransform * thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) )).xy;

#endif
`;

var particle_vert = `
#include <common>
#include <color_pars_vertex>
#include <uv_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

attribute vec3 offset;
attribute float rotation;
attribute float size;
attribute float uvTile;

#ifdef UV_TILE
uniform vec2 tileCount;
#endif

void main() {

    ${uv_vertex_tile}
	
    vec2 alignedPosition = ( position.xy ) * size;
    
    vec2 rotatedPosition;
    rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
    rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
#ifdef HORIZONTAL
    vec4 mvPosition = modelMatrix * vec4( offset, 1.0 );
    mvPosition.x += rotatedPosition.x;
    mvPosition.z -= rotatedPosition.y;
    mvPosition = viewMatrix * mvPosition;
#elif defined(VERTICAL)
    vec4 mvPosition = modelMatrix * vec4( offset, 1.0 );
    mvPosition.y += rotatedPosition.y;
    mvPosition = viewMatrix * mvPosition;
    mvPosition.x += rotatedPosition.x;
#else
    vec4 mvPosition = modelViewMatrix * vec4( offset, 1.0 );
    mvPosition.xy += rotatedPosition;
#endif

	vColor = color;

	gl_Position = projectionMatrix * mvPosition;

	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

}
`;

var local_particle_vert = `
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

attribute vec3 offset;
attribute vec4 rotation;
attribute float size;
// attribute vec4 color;
attribute float uvTile;

#ifdef UV_TILE
uniform vec2 tileCount;
#endif

void main() {

    ${uv_vertex_tile}
    
    float x2 = rotation.x + rotation.x, y2 = rotation.y + rotation.y, z2 = rotation.z + rotation.z;
    float xx = rotation.x * x2, xy = rotation.x * y2, xz = rotation.x * z2;
    float yy = rotation.y * y2, yz = rotation.y * z2, zz = rotation.z * z2;
    float wx = rotation.w * x2, wy = rotation.w * y2, wz = rotation.w * z2;
    float sx = size, sy = size, sz = size;
    
    mat4 matrix = mat4(( 1.0 - ( yy + zz ) ) * sx, ( xy + wz ) * sx, ( xz - wy ) * sx, 0.0,  // 1. column
                      ( xy - wz ) * sy, ( 1.0 - ( xx + zz ) ) * sy, ( yz + wx ) * sy, 0.0,  // 2. column
                      ( xz + wy ) * sz, ( yz - wx ) * sz, ( 1.0 - ( xx + yy ) ) * sz, 0.0,  // 3. column
                      offset.x, offset.y, offset.z, 1.0);
    
    vec4 mvPosition = modelViewMatrix * (matrix * vec4( position, 1.0 ));

	vColor = color;

	gl_Position = projectionMatrix * mvPosition;

	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

}
`;

var local_particle_physics_vert = `
#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>

attribute vec3 offset;
attribute vec4 rotation;
attribute float size;
attribute float uvTile;

#ifdef UV_TILE
uniform vec2 tileCount;
#endif

#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {
    ${uv_vertex_tile}

    float x2 = rotation.x + rotation.x, y2 = rotation.y + rotation.y, z2 = rotation.z + rotation.z;
    float xx = rotation.x * x2, xy = rotation.x * y2, xz = rotation.x * z2;
    float yy = rotation.y * y2, yz = rotation.y * z2, zz = rotation.z * z2;
    float wx = rotation.w * x2, wy = rotation.w * y2, wz = rotation.w * z2;
    float sx = size, sy = size, sz = size;

    mat4 particleMatrix = mat4(( 1.0 - ( yy + zz ) ) * sx, ( xy + wz ) * sx, ( xz - wy ) * sx, 0.0,  // 1. column
                      ( xy - wz ) * sy, ( 1.0 - ( xx + zz ) ) * sy, ( yz + wx ) * sy, 0.0,  // 2. column
                      ( xz + wy ) * sz, ( yz - wx ) * sz, ( 1.0 - ( xx + yy ) ) * sz, 0.0,  // 3. column
                      offset.x, offset.y, offset.z, 1.0);

	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>

	// replace defaultnormal_vertex
	vec3 transformedNormal = objectNormal;
    mat3 m = mat3( particleMatrix );
    transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
    transformedNormal = m * transformedNormal;
    transformedNormal = normalMatrix * transformedNormal;
    #ifdef FLIP_SIDED
        transformedNormal = - transformedNormal;
    #endif
    #ifdef USE_TANGENT
        vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
        #ifdef FLIP_SIDED
        transformedTangent = - transformedTangent;
        #endif
    #endif

	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>

	// replace include <project_vertex>
  vec4 mvPosition = vec4( transformed, 1.0 );
  mvPosition = modelViewMatrix * (particleMatrix * mvPosition);
	gl_Position = projectionMatrix * mvPosition;

	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	
	vViewPosition = - mvPosition.xyz;
	
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}
`;

var stretched_bb_particle_vert = `
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

attribute vec3 offset;
attribute float rotation;
attribute float size;
attribute vec4 velocity;
attribute float uvTile;

#ifdef UV_TILE
uniform vec2 tileCount;
#endif

uniform float speedFactor;

void main() {

    ${uv_vertex_tile}
    
    float lengthFactor = velocity.w;
#ifdef USE_SKEW
    vec4 mvPosition = modelViewMatrix * vec4( offset, 1.0 );
    vec3 viewVelocity = normalMatrix * velocity.xyz;

    vec3 scaledPos = vec3(position.xy * size, position.z);
    float vlength = length(viewVelocity);
    vec3 projVelocity =  dot(scaledPos, viewVelocity) * viewVelocity / vlength;
    mvPosition.xyz += scaledPos + projVelocity * (speedFactor / size + lengthFactor / vlength);
#else
    vec4 mvPosition = modelViewMatrix * vec4( offset, 1.0 );
    vec3 viewVelocity = normalMatrix * velocity.xyz;
    float vlength = length(viewVelocity); 
    mvPosition.xyz += position.y * normalize(cross(mvPosition.xyz, viewVelocity)) * size; // switch the cross to  match unity implementation
    mvPosition.xyz -= (position.x + 0.5) * viewVelocity * (1.0 + lengthFactor / vlength) * size; // minus position.x to match unity implementation
#endif
	vColor = color;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
}
`;

function getMaterialUVChannelName(value) {
    if (value === 0)
        return 'uv';
    return `uv${value}`;
}

new THREE.Vector3(0, 0, 1);
class SpriteBatch extends VFXBatch {
    constructor(settings) {
        super(settings);
        this.vector_ = new THREE.Vector3();
        this.vector2_ = new THREE.Vector3();
        this.vector3_ = new THREE.Vector3();
        this.quaternion_ = new THREE.Quaternion();
        this.quaternion2_ = new THREE.Quaternion();
        this.quaternion3_ = new THREE.Quaternion();
        this.rotationMat_ = new THREE.Matrix3();
        this.rotationMat2_ = new THREE.Matrix3();
        this.maxParticles = 1000;
        this.setupBuffers();
        this.rebuildMaterial();
    }
    buildExpandableBuffers() {
        this.offsetBuffer = new THREE.InstancedBufferAttribute(new Float32Array(this.maxParticles * 3), 3);
        this.offsetBuffer.setUsage(THREE.DynamicDrawUsage);
        this.geometry.setAttribute('offset', this.offsetBuffer);
        this.colorBuffer = new THREE.InstancedBufferAttribute(new Float32Array(this.maxParticles * 4), 4);
        this.colorBuffer.setUsage(THREE.DynamicDrawUsage);
        this.geometry.setAttribute('color', this.colorBuffer);
        if (this.settings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.Mesh) {
            this.rotationBuffer = new THREE.InstancedBufferAttribute(new Float32Array(this.maxParticles * 4), 4);
            this.rotationBuffer.setUsage(THREE.DynamicDrawUsage);
            this.geometry.setAttribute('rotation', this.rotationBuffer);
        }
        else if (this.settings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.BillBoard ||
            this.settings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.HorizontalBillBoard ||
            this.settings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.VerticalBillBoard ||
            this.settings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.StretchedBillBoard) {
            this.rotationBuffer = new THREE.InstancedBufferAttribute(new Float32Array(this.maxParticles), 1);
            this.rotationBuffer.setUsage(THREE.DynamicDrawUsage);
            this.geometry.setAttribute('rotation', this.rotationBuffer);
        }
        this.sizeBuffer = new THREE.InstancedBufferAttribute(new Float32Array(this.maxParticles), 1);
        this.sizeBuffer.setUsage(THREE.DynamicDrawUsage);
        this.geometry.setAttribute('size', this.sizeBuffer);
        this.uvTileBuffer = new THREE.InstancedBufferAttribute(new Float32Array(this.maxParticles), 1);
        this.uvTileBuffer.setUsage(THREE.DynamicDrawUsage);
        this.geometry.setAttribute('uvTile', this.uvTileBuffer);
        if (this.settings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.StretchedBillBoard) {
            this.velocityBuffer = new THREE.InstancedBufferAttribute(new Float32Array(this.maxParticles * 4), 4);
            this.velocityBuffer.setUsage(THREE.DynamicDrawUsage);
            this.geometry.setAttribute('velocity', this.velocityBuffer);
        }
    }
    setupBuffers() {
        if (this.geometry)
            this.geometry.dispose();
        this.geometry = new THREE.InstancedBufferGeometry();
        this.geometry.setIndex(this.settings.instancingGeometry.getIndex());
        if (this.settings.instancingGeometry.hasAttribute('normal')) {
            this.geometry.setAttribute('normal', this.settings.instancingGeometry.getAttribute('normal'));
        }
        this.geometry.setAttribute('position', this.settings.instancingGeometry.getAttribute('position'));
        this.geometry.setAttribute('uv', this.settings.instancingGeometry.getAttribute('uv'));
        this.buildExpandableBuffers();
    }
    expandBuffers(target) {
        while (target >= this.maxParticles) {
            this.maxParticles *= 2;
        }
        this.setupBuffers();
    }
    rebuildMaterial() {
        this.layers.mask = this.settings.layers.mask;
        let uniforms;
        const defines = {};
        if (this.settings.material.type === 'MeshStandardMaterial' ||
            this.settings.material.type === 'MeshPhysicalMaterial') {
            const mat = this.settings.material;
            uniforms = THREE.UniformsUtils.merge([
                THREE.UniformsLib.common,
                THREE.UniformsLib.envmap,
                THREE.UniformsLib.aomap,
                THREE.UniformsLib.lightmap,
                THREE.UniformsLib.emissivemap,
                THREE.UniformsLib.bumpmap,
                THREE.UniformsLib.normalmap,
                THREE.UniformsLib.displacementmap,
                THREE.UniformsLib.roughnessmap,
                THREE.UniformsLib.metalnessmap,
                THREE.UniformsLib.fog,
                THREE.UniformsLib.lights,
                {
                    emissive: { value: new THREE.Color(0x000000) },
                    roughness: { value: 1.0 },
                    metalness: { value: 0.0 },
                    envMapIntensity: { value: 1 },
                },
            ]);
            uniforms['diffuse'].value = mat.color;
            uniforms['opacity'].value = mat.opacity;
            uniforms['emissive'].value = mat.emissive;
            uniforms['roughness'].value = mat.roughness;
            uniforms['metalness'].value = mat.metalness;
            if (mat.envMap) {
                uniforms['envMap'].value = mat.envMap;
                uniforms['envMapIntensity'].value = mat.envMapIntensity;
            }
            if (mat.normalMap) {
                uniforms['normalMap'].value = mat.normalMap;
                uniforms['normalScale'].value = mat.normalScale;
            }
            if (mat.roughnessMap) {
                uniforms['roughnessMap'].value = mat.roughnessMap;
            }
            if (mat.metalnessMap) {
                uniforms['metalnessMap'].value = mat.metalnessMap;
            }
            if (mat.map) {
                uniforms['map'] = new THREE.Uniform(mat.map);
            }
        }
        else {
            uniforms = {};
            uniforms['map'] = new THREE.Uniform(this.settings.material.map);
        }
        if (this.settings.material.alphaTest) {
            defines['USE_ALPHATEST'] = '';
            uniforms['alphaTest'] = new THREE.Uniform(this.settings.material.alphaTest);
        }
        defines['USE_UV'] = '';
        const uTileCount = this.settings.uTileCount;
        const vTileCount = this.settings.vTileCount;
        if (uTileCount > 1 || vTileCount > 1) {
            defines['UV_TILE'] = '';
            uniforms['tileCount'] = new THREE.Uniform(new THREE.Vector2(uTileCount, vTileCount));
        }
        if (this.settings.material.defines &&
            this.settings.material.defines['USE_COLOR_AS_ALPHA'] !== undefined) {
            defines['USE_COLOR_AS_ALPHA'] = '';
        }
        if (this.settings.material.normalMap) {
            defines['USE_NORMALMAP'] = '';
            defines['NORMALMAP_UV'] = getMaterialUVChannelName(this.settings.material.normalMap.channel);
            uniforms['normalMapTransform'] = new THREE.Uniform(new THREE.Matrix3().copy(this.settings.material.normalMap.matrix));
        }
        if (this.settings.material.map) {
            defines['USE_MAP'] = '';
            defines['MAP_UV'] = getMaterialUVChannelName(this.settings.material.map.channel);
            uniforms['mapTransform'] = new THREE.Uniform(new THREE.Matrix3().copy(this.settings.material.map.matrix));
        }
        defines['USE_COLOR_ALPHA'] = '';
        let needLights = false;
        if (this.settings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.BillBoard ||
            this.settings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.VerticalBillBoard ||
            this.settings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.HorizontalBillBoard ||
            this.settings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.Mesh) {
            let vertexShader;
            let fragmentShader;
            if (this.settings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.Mesh) {
                if (this.settings.material.type === 'MeshStandardMaterial' ||
                    this.settings.material.type === 'MeshPhysicalMaterial') {
                    defines['USE_COLOR'] = '';
                    vertexShader = local_particle_physics_vert;
                    fragmentShader = particle_physics_frag;
                    needLights = true;
                }
                else {
                    vertexShader = local_particle_vert;
                    fragmentShader = particle_frag;
                }
            }
            else {
                vertexShader = particle_vert;
                fragmentShader = particle_frag;
            }
            if (this.settings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.VerticalBillBoard) {
                defines['VERTICAL'] = '';
            }
            else if (this.settings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.HorizontalBillBoard) {
                defines['HORIZONTAL'] = '';
            }
            this.material = new THREE.ShaderMaterial({
                uniforms: uniforms,
                defines: defines,
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
                transparent: this.settings.material.transparent,
                depthWrite: !this.settings.material.transparent,
                blending: this.settings.material.blending,
                side: this.settings.material.side,
                alphaTest: this.settings.material.alphaTest,
                lights: needLights,
            });
        }
        else if (this.settings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.StretchedBillBoard) {
            uniforms['speedFactor'] = new THREE.Uniform(1.0);
            this.material = new THREE.ShaderMaterial({
                uniforms: uniforms,
                defines: defines,
                vertexShader: stretched_bb_particle_vert,
                fragmentShader: particle_frag,
                transparent: this.settings.material.transparent,
                depthWrite: !this.settings.material.transparent,
                blending: this.settings.material.blending,
                side: this.settings.material.side,
                alphaTest: this.settings.material.alphaTest,
            });
        }
        else {
            throw new Error('render mode unavailable');
        }
    }
    update() {
        let index = 0;
        let particleCount = 0;
        this.systems.forEach((system) => {
            particleCount += system.particleNum;
        });
        if (particleCount > this.maxParticles) {
            this.expandBuffers(particleCount);
        }
        this.systems.forEach((system) => {
            const particles = system.particles;
            const particleNum = system.particleNum;
            const rotation = this.quaternion2_;
            const translation = this.vector2_;
            const scale = this.vector3_;
            system.emitter.matrixWorld.decompose(translation, rotation, scale);
            this.rotationMat_.setFromMatrix4(system.emitter.matrixWorld);
            for (let j = 0; j < particleNum; j++ , index++) {
                const particle = particles[j];
                if (this.settings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.Mesh) {
                    let q;
                    if (system.worldSpace) {
                        q = particle.rotation;
                    }
                    else {
                        let parentQ;
                        if (particle.parentMatrix) {
                            parentQ = this.quaternion3_.setFromRotationMatrix(particle.parentMatrix);
                        }
                        else {
                            parentQ = rotation;
                        }
                        q = this.quaternion_;
                        q.copy(particle.rotation).multiply(parentQ);
                    }
                    this.rotationBuffer.setXYZW(index, q.x, q.y, q.z, q.w);
                }
                else if (this.settings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.StretchedBillBoard ||
                    this.settings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.VerticalBillBoard ||
                    this.settings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.HorizontalBillBoard ||
                    this.settings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.BillBoard) {
                    this.rotationBuffer.setX(index, particle.rotation);
                }
                let vec;
                if (system.worldSpace) {
                    vec = particle.position;
                }
                else {
                    vec = this.vector_;
                    if (particle.parentMatrix) {
                        vec.copy(particle.position).applyMatrix4(particle.parentMatrix);
                    }
                    else {
                        vec.copy(particle.position).applyMatrix4(system.emitter.matrixWorld);
                    }
                }
                this.offsetBuffer.setXYZ(index, vec.x, vec.y, vec.z);
                this.colorBuffer.setXYZW(index, particle.color.x, particle.color.y, particle.color.z, particle.color.w);
                if (system.worldSpace) {
                    this.sizeBuffer.setX(index, particle.size);
                }
                else {
                    if (particle.parentMatrix) {
                        this.sizeBuffer.setX(index, particle.size);
                    }
                    else {
                        this.sizeBuffer.setX(index, (particle.size * (Math.abs(scale.x) + Math.abs(scale.y) + Math.abs(scale.z))) / 3);
                    }
                }
                this.uvTileBuffer.setX(index, particle.uvTile);
                if (this.settings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.StretchedBillBoard && this.velocityBuffer) {
                    let speedFactor = system.rendererEmitterSettings.speedFactor;
                    if (speedFactor === 0)
                        speedFactor = 0.001;
                    const lengthFactor = system.rendererEmitterSettings.lengthFactor;
                    let vec;
                    if (system.worldSpace) {
                        vec = particle.velocity;
                    }
                    else {
                        vec = this.vector_;
                        if (particle.parentMatrix) {
                            this.rotationMat2_.setFromMatrix4(particle.parentMatrix);
                            vec.copy(particle.velocity).applyMatrix3(this.rotationMat2_);
                        }
                        else {
                            vec.copy(particle.velocity).applyMatrix3(this.rotationMat_);
                        }
                    }
                    this.velocityBuffer.setXYZW(index, vec.x * speedFactor, vec.y * speedFactor, vec.z * speedFactor, lengthFactor);
                }
            }
        });
        this.geometry.instanceCount = index;
        if (index > 0) {
            this.offsetBuffer.updateRange.count = index * 3;
            this.offsetBuffer.needsUpdate = true;
            this.sizeBuffer.updateRange.count = index;
            this.sizeBuffer.needsUpdate = true;
            this.colorBuffer.updateRange.count = index * 4;
            this.colorBuffer.needsUpdate = true;
            this.uvTileBuffer.updateRange.count = index;
            this.uvTileBuffer.needsUpdate = true;
            if (this.settings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.StretchedBillBoard && this.velocityBuffer) {
                this.velocityBuffer.updateRange.count = index * 4;
                this.velocityBuffer.needsUpdate = true;
            }
            if (this.settings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.Mesh) {
                this.rotationBuffer.updateRange.count = index * 4;
                this.rotationBuffer.needsUpdate = true;
            }
            else if (this.settings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.StretchedBillBoard ||
                this.settings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.HorizontalBillBoard ||
                this.settings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.VerticalBillBoard ||
                this.settings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.BillBoard) {
                this.rotationBuffer.updateRange.count = index;
                this.rotationBuffer.needsUpdate = true;
            }
        }
    }
    dispose() {
        this.geometry.dispose();
    }
}

var trail_frag = `

#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

uniform sampler2D alphaMap;
uniform float useAlphaMap;
uniform float visibility;
uniform float alphaTest;
uniform vec2 repeat;

varying vec4 vColor;
    
void main() {
    #include <clipping_planes_fragment>
    #include <logdepthbuf_fragment>

    vec4 c = vColor;
    
    #ifdef USE_MAP
    #ifdef USE_COLOR_AS_ALPHA
    vec4 tex = texture2D( map, vUv * repeat );
    c *= vec4(tex.rgb, tex.r);
    #else
    c *= texture2D( map, vUv * repeat );
    #endif
    #endif
    if( useAlphaMap == 1. ) c.a *= texture2D( alphaMap, vUv * repeat ).a;
    if( c.a < alphaTest ) discard;
    gl_FragColor = c;

    #include <fog_fragment>
    #include <tonemapping_fragment>
}`;

var trail_vert = `
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <clipping_planes_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <fog_pars_vertex>

attribute vec3 previous;
attribute vec3 next;
attribute float side;
attribute float width;

uniform vec2 resolution;
uniform float lineWidth;
uniform float sizeAttenuation;
    
vec2 fix(vec4 i, float aspect) {
    vec2 res = i.xy / i.w;
    res.x *= aspect;
    return res;
}
    
void main() {

    ${uv_vertex_tile}
    
    float aspect = resolution.x / resolution.y;

    vColor = color;

    mat4 m = projectionMatrix * modelViewMatrix;
    vec4 finalPosition = m * vec4( position, 1.0 );
    vec4 prevPos = m * vec4( previous, 1.0 );
    vec4 nextPos = m * vec4( next, 1.0 );

    vec2 currentP = fix( finalPosition, aspect );
    vec2 prevP = fix( prevPos, aspect );
    vec2 nextP = fix( nextPos, aspect );

    float w = lineWidth * width;

    vec2 dir;
    if( nextP == currentP ) dir = normalize( currentP - prevP );
    else if( prevP == currentP ) dir = normalize( nextP - currentP );
    else {
        vec2 dir1 = normalize( currentP - prevP );
        vec2 dir2 = normalize( nextP - currentP );
        dir = normalize( dir1 + dir2 );

        vec2 perp = vec2( -dir1.y, dir1.x );
        vec2 miter = vec2( -dir.y, dir.x );
        //w = clamp( w / dot( miter, perp ), 0., 4., * lineWidth * width );

    }

    //vec2 normal = ( cross( vec3( dir, 0. ) vec3( 0., 0., 1. ) ) ).xy;
    vec4 normal = vec4( -dir.y, dir.x, 0., 1. );
    normal.xy *= .5 * w;
    normal *= projectionMatrix;
    if( sizeAttenuation == 0. ) {
        normal.xy *= finalPosition.w;
        normal.xy /= ( vec4( resolution, 0., 1. ) * projectionMatrix ).xy;
    }

    finalPosition.xy += normal.xy * side;

    gl_Position = finalPosition;

	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    
	#include <fog_vertex>
}`;

new THREE.Vector3(0, 0, 1);
class TrailBatch extends VFXBatch {
    constructor(settings) {
        super(settings);
        this.vector_ = new THREE.Vector3();
        this.vector2_ = new THREE.Vector3();
        this.vector3_ = new THREE.Vector3();
        this.quaternion_ = new THREE.Quaternion();
        this.maxParticles = 10000;
        this.setupBuffers();
        this.rebuildMaterial();
    }
    setupBuffers() {
        if (this.geometry)
            this.geometry.dispose();
        this.geometry = new THREE.BufferGeometry();
        this.indexBuffer = new THREE.BufferAttribute(new Uint32Array(this.maxParticles * 6), 1);
        this.indexBuffer.setUsage(THREE.DynamicDrawUsage);
        this.geometry.setIndex(this.indexBuffer);
        this.positionBuffer = new THREE.BufferAttribute(new Float32Array(this.maxParticles * 6), 3);
        this.positionBuffer.setUsage(THREE.DynamicDrawUsage);
        this.geometry.setAttribute('position', this.positionBuffer);
        this.previousBuffer = new THREE.BufferAttribute(new Float32Array(this.maxParticles * 6), 3);
        this.previousBuffer.setUsage(THREE.DynamicDrawUsage);
        this.geometry.setAttribute('previous', this.previousBuffer);
        this.nextBuffer = new THREE.BufferAttribute(new Float32Array(this.maxParticles * 6), 3);
        this.nextBuffer.setUsage(THREE.DynamicDrawUsage);
        this.geometry.setAttribute('next', this.nextBuffer);
        this.widthBuffer = new THREE.BufferAttribute(new Float32Array(this.maxParticles * 2), 1);
        this.widthBuffer.setUsage(THREE.DynamicDrawUsage);
        this.geometry.setAttribute('width', this.widthBuffer);
        this.sideBuffer = new THREE.BufferAttribute(new Float32Array(this.maxParticles * 2), 1);
        this.sideBuffer.setUsage(THREE.DynamicDrawUsage);
        this.geometry.setAttribute('side', this.sideBuffer);
        this.uvBuffer = new THREE.BufferAttribute(new Float32Array(this.maxParticles * 4), 2);
        this.uvBuffer.setUsage(THREE.DynamicDrawUsage);
        this.geometry.setAttribute('uv', this.uvBuffer);
        this.colorBuffer = new THREE.BufferAttribute(new Float32Array(this.maxParticles * 8), 4);
        this.colorBuffer.setUsage(THREE.DynamicDrawUsage);
        this.geometry.setAttribute('color', this.colorBuffer);
    }
    expandBuffers(target) {
        while (target >= this.maxParticles) {
            this.maxParticles *= 2;
        }
        this.setupBuffers();
    }
    rebuildMaterial() {
        this.layers.mask = this.settings.layers.mask;
        const uniforms = {
            lineWidth: { value: 1 },
            map: { value: null },
            useMap: { value: 0 },
            alphaMap: { value: null },
            useAlphaMap: { value: 0 },
            resolution: { value: new THREE.Vector2(1, 1) },
            sizeAttenuation: { value: 1 },
            visibility: { value: 1 },
            alphaTest: { value: 0 },
            repeat: { value: new THREE.Vector2(1, 1) },
        };
        const defines = {};
        defines['USE_UV'] = '';
        defines['USE_COLOR_ALPHA'] = '';
        if (this.settings.material.map) {
            defines['USE_MAP'] = '';
            defines['MAP_UV'] = getMaterialUVChannelName(this.settings.material.map.channel);
            uniforms['map'] = new THREE.Uniform(this.settings.material.map);
            uniforms['mapTransform'] = new THREE.Uniform(new THREE.Matrix3().copy(this.settings.material.map.matrix));
        }
        if (this.settings.material.defines &&
            this.settings.material.defines['USE_COLOR_AS_ALPHA'] !== undefined) {
            defines['USE_COLOR_AS_ALPHA'] = '';
        }
        if (this.settings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.Trail) {
            this.material = new THREE.ShaderMaterial({
                uniforms: uniforms,
                defines: defines,
                vertexShader: trail_vert,
                fragmentShader: trail_frag,
                transparent: this.settings.material.transparent,
                depthWrite: !this.settings.material.transparent,
                side: this.settings.material.side,
                blending: this.settings.material.blending || THREE.AdditiveBlending,
            });
        }
        else {
            throw new Error('render mode unavailable');
        }
    }
    update() {
        let index = 0;
        let triangles = 0;
        let particleCount = 0;
        this.systems.forEach((system) => {
            for (let j = 0; j < system.particleNum; j++) {
                particleCount += system.particles[j].previous.length * 2;
            }
        });
        if (particleCount > this.maxParticles) {
            this.expandBuffers(particleCount);
        }
        this.systems.forEach((system) => {
            const rotation = this.quaternion_;
            const translation = this.vector2_;
            const scale = this.vector3_;
            system.emitter.matrixWorld.decompose(translation, rotation, scale);
            const particles = system.particles;
            const particleNum = system.particleNum;
            const uTileCount = this.settings.uTileCount;
            const vTileCount = this.settings.vTileCount;
            const tileWidth = 1 / uTileCount;
            const tileHeight = 1 / vTileCount;
            for (let j = 0; j < particleNum; j++) {
                const particle = particles[j];
                const col = particle.uvTile % vTileCount;
                const row = Math.floor(particle.uvTile / vTileCount + 0.001);
                const iter = particle.previous.values();
                let curIter = iter.next();
                let previous = curIter.value;
                let current = previous;
                if (!curIter.done)
                    curIter = iter.next();
                let next;
                if (curIter.value !== undefined) {
                    next = curIter.value;
                }
                else {
                    next = current;
                }
                for (let i = 0; i < particle.previous.length; i++ , index += 2) {
                    this.positionBuffer.setXYZ(index, current.position.x, current.position.y, current.position.z);
                    this.positionBuffer.setXYZ(index + 1, current.position.x, current.position.y, current.position.z);
                    if (system.worldSpace) {
                        this.positionBuffer.setXYZ(index, current.position.x, current.position.y, current.position.z);
                        this.positionBuffer.setXYZ(index + 1, current.position.x, current.position.y, current.position.z);
                    }
                    else {
                        if (particle.parentMatrix) {
                            this.vector_.copy(current.position).applyMatrix4(particle.parentMatrix);
                        }
                        else {
                            this.vector_.copy(current.position).applyMatrix4(system.emitter.matrixWorld);
                        }
                        this.positionBuffer.setXYZ(index, this.vector_.x, this.vector_.y, this.vector_.z);
                        this.positionBuffer.setXYZ(index + 1, this.vector_.x, this.vector_.y, this.vector_.z);
                    }
                    if (system.worldSpace) {
                        this.previousBuffer.setXYZ(index, previous.position.x, previous.position.y, previous.position.z);
                        this.previousBuffer.setXYZ(index + 1, previous.position.x, previous.position.y, previous.position.z);
                    }
                    else {
                        if (particle.parentMatrix) {
                            this.vector_.copy(previous.position).applyMatrix4(particle.parentMatrix);
                        }
                        else {
                            this.vector_.copy(previous.position).applyMatrix4(system.emitter.matrixWorld);
                        }
                        this.previousBuffer.setXYZ(index, this.vector_.x, this.vector_.y, this.vector_.z);
                        this.previousBuffer.setXYZ(index + 1, this.vector_.x, this.vector_.y, this.vector_.z);
                    }
                    if (system.worldSpace) {
                        this.nextBuffer.setXYZ(index, next.position.x, next.position.y, next.position.z);
                        this.nextBuffer.setXYZ(index + 1, next.position.x, next.position.y, next.position.z);
                    }
                    else {
                        if (particle.parentMatrix) {
                            this.vector_.copy(next.position).applyMatrix4(particle.parentMatrix);
                        }
                        else {
                            this.vector_.copy(next.position).applyMatrix4(system.emitter.matrixWorld);
                        }
                        this.nextBuffer.setXYZ(index, this.vector_.x, this.vector_.y, this.vector_.z);
                        this.nextBuffer.setXYZ(index + 1, this.vector_.x, this.vector_.y, this.vector_.z);
                    }
                    this.sideBuffer.setX(index, -1);
                    this.sideBuffer.setX(index + 1, 1);
                    if (system.worldSpace) {
                        this.widthBuffer.setX(index, current.size);
                        this.widthBuffer.setX(index + 1, current.size);
                    }
                    else {
                        if (particle.parentMatrix) {
                            this.widthBuffer.setX(index, current.size);
                            this.widthBuffer.setX(index + 1, current.size);
                        }
                        else {
                            const objectScale = (Math.abs(scale.x) + Math.abs(scale.y) + Math.abs(scale.z)) / 3;
                            this.widthBuffer.setX(index, current.size * objectScale);
                            this.widthBuffer.setX(index + 1, current.size * objectScale);
                        }
                    }
                    this.uvBuffer.setXY(index, (i / particle.previous.length + col) * tileWidth, (vTileCount - row - 1) * tileHeight);
                    this.uvBuffer.setXY(index + 1, (i / particle.previous.length + col) * tileWidth, (vTileCount - row) * tileHeight);
                    this.colorBuffer.setXYZW(index, current.color.x, current.color.y, current.color.z, current.color.w);
                    this.colorBuffer.setXYZW(index + 1, current.color.x, current.color.y, current.color.z, current.color.w);
                    if (i + 1 < particle.previous.length) {
                        this.indexBuffer.setX(triangles * 3, index);
                        this.indexBuffer.setX(triangles * 3 + 1, index + 1);
                        this.indexBuffer.setX(triangles * 3 + 2, index + 2);
                        triangles++;
                        this.indexBuffer.setX(triangles * 3, index + 2);
                        this.indexBuffer.setX(triangles * 3 + 1, index + 1);
                        this.indexBuffer.setX(triangles * 3 + 2, index + 3);
                        triangles++;
                    }
                    previous = current;
                    current = next;
                    if (!curIter.done) {
                        curIter = iter.next();
                        if (curIter.value !== undefined) {
                            next = curIter.value;
                        }
                    }
                }
            }
        });
        this.positionBuffer.updateRange.count = index * 3;
        this.positionBuffer.needsUpdate = true;
        this.previousBuffer.updateRange.count = index * 3;
        this.previousBuffer.needsUpdate = true;
        this.nextBuffer.updateRange.count = index * 3;
        this.nextBuffer.needsUpdate = true;
        this.sideBuffer.updateRange.count = index;
        this.sideBuffer.needsUpdate = true;
        this.widthBuffer.updateRange.count = index;
        this.widthBuffer.needsUpdate = true;
        this.uvBuffer.updateRange.count = index * 2;
        this.uvBuffer.needsUpdate = true;
        this.colorBuffer.updateRange.count = index * 4;
        this.colorBuffer.needsUpdate = true;
        this.indexBuffer.updateRange.count = triangles * 3;
        this.indexBuffer.needsUpdate = true;
        this.geometry.setDrawRange(0, triangles * 3);
    }
    dispose() {
        this.geometry.dispose();
    }
}

class BatchedRenderer extends THREE.Object3D {
    constructor() {
        super();
        this.batches = [];
        this.systemToBatchIndex = new Map();
        this.type = 'BatchedRenderer';
    }
    static equals(a, b) {
        return (a.material.side === b.material.side &&
            a.material.blending === b.material.blending &&
            a.material.transparent === b.material.transparent &&
            a.material.type === b.material.type &&
            a.material.alphaTest === b.material.alphaTest &&
            a.material.map === b.material.map &&
            a.renderMode === b.renderMode &&
            a.uTileCount === b.uTileCount &&
            a.vTileCount === b.vTileCount &&
            a.instancingGeometry === b.instancingGeometry &&
            a.renderOrder === b.renderOrder &&
            a.layers.mask === b.layers.mask);
    }
    addSystem(system) {
        system._renderer = this;
        const settings = system.getRendererSettings();
        for (let i = 0; i < this.batches.length; i++) {
            if (BatchedRenderer.equals(this.batches[i].settings, settings)) {
                this.batches[i].addSystem(system);
                this.systemToBatchIndex.set(system, i);
                return;
            }
        }
        let batch;
        switch (settings.renderMode) {
            case gdjs.__particleEmmiter3DExtension.RenderMode.Trail:
                batch = new TrailBatch(settings);
                break;
            case gdjs.__particleEmmiter3DExtension.RenderMode.Mesh:
            case gdjs.__particleEmmiter3DExtension.RenderMode.BillBoard:
            case gdjs.__particleEmmiter3DExtension.RenderMode.VerticalBillBoard:
            case gdjs.__particleEmmiter3DExtension.RenderMode.HorizontalBillBoard:
            case gdjs.__particleEmmiter3DExtension.RenderMode.StretchedBillBoard:
                batch = new SpriteBatch(settings);
                break;
        }
        batch.addSystem(system);
        this.batches.push(batch);
        this.systemToBatchIndex.set(system, this.batches.length - 1);
        this.add(batch);
    }
    deleteSystem(system) {
        const batchIndex = this.systemToBatchIndex.get(system);
        if (batchIndex != undefined) {
            this.batches[batchIndex].removeSystem(system);
            this.systemToBatchIndex.delete(system);
        }
    }
    updateSystem(system) {
        this.deleteSystem(system);
        this.addSystem(system);
    }
    update(delta) {
        this.systemToBatchIndex.forEach((value, ps) => {
            ps.update(delta);
        });
        for (let i = 0; i < this.batches.length; i++) {
            this.batches[i].update();
        }
    }
}

const BatchedParticleRenderer = BatchedRenderer;

class QuarksLoader extends THREE.ObjectLoader {
    constructor(manager) {
        super(manager);
    }
    linkReference(object) {
        const objectsMap = {};
        object.traverse(function (child) {
            objectsMap[child.uuid] = child;
        });
        object.traverse(function (child) {
            if (child.type === 'ParticleEmitter') {
                const system = child.system;
                system.emitterShape;
                for (let i = 0; i < system.behaviors.length; i++) {
                    if (system.behaviors[i] instanceof EmitSubParticleSystem) {
                        system.behaviors[i].subParticleSystem = objectsMap[system.behaviors[i].subParticleSystem];
                    }
                }
            }
        });
    }
    parse(json, onLoad) {
        const object = super.parse(json, onLoad);
        this.linkReference(object);
        return object;
    }
    parseObject(data, geometries, materials, textures, animations) {
        let object;
        function getGeometry(name) {
            if (geometries[name] === undefined) {
                console.warn('THREE.ObjectLoader: Undefined geometry', name);
            }
            return geometries[name];
        }
        function getMaterial(name) {
            if (name === undefined)
                return undefined;
            if (Array.isArray(name)) {
                const array = [];
                for (let i = 0, l = name.length; i < l; i++) {
                    const uuid = name[i];
                    if (materials[uuid] === undefined) {
                        console.warn('THREE.ObjectLoader: Undefined material', uuid);
                    }
                    array.push(materials[uuid]);
                }
                return array;
            }
            if (materials[name] === undefined) {
                console.warn('THREE.ObjectLoader: Undefined material', name);
            }
            return materials[name];
        }
        function getTexture(uuid) {
            if (textures[uuid] === undefined) {
                console.warn('THREE.ObjectLoader: Undefined texture', uuid);
            }
            return textures[uuid];
        }
        let geometry, material;
        const meta = {
            textures: textures,
            geometries: geometries,
            materials: materials,
        };
        const dependencies = {};
        switch (data.type) {
            case 'ParticleEmitter':
                object = ParticleSystem.fromJSON(data.ps, meta, dependencies).emitter;
                break;
            case 'Scene':
                object = new THREE.Scene();
                if (data.background !== undefined) {
                    if (Number.isInteger(data.background)) {
                        object.background = new THREE.Color(data.background);
                    }
                    else {
                        object.background = getTexture(data.background);
                    }
                }
                if (data.environment !== undefined) {
                    object.environment = getTexture(data.environment);
                }
                if (data.fog !== undefined) {
                    if (data.fog.type === 'Fog') {
                        object.fog = new THREE.Fog(data.fog.color, data.fog.near, data.fog.far);
                    }
                    else if (data.fog.type === 'FogExp2') {
                        object.fog = new THREE.FogExp2(data.fog.color, data.fog.density);
                    }
                }
                if (data.backgroundBlurriness !== undefined)
                    object.backgroundBlurriness = data.backgroundBlurriness;
                break;
            case 'PerspectiveCamera':
                object = new THREE.PerspectiveCamera(data.fov, data.aspect, data.near, data.far);
                if (data.focus !== undefined)
                    object.focus = data.focus;
                if (data.zoom !== undefined)
                    object.zoom = data.zoom;
                if (data.filmGauge !== undefined)
                    object.filmGauge = data.filmGauge;
                if (data.filmOffset !== undefined)
                    object.filmOffset = data.filmOffset;
                if (data.view !== undefined)
                    object.view = Object.assign({}, data.view);
                break;
            case 'OrthographicCamera':
                object = new THREE.OrthographicCamera(data.left, data.right, data.top, data.bottom, data.near, data.far);
                if (data.zoom !== undefined)
                    object.zoom = data.zoom;
                if (data.view !== undefined)
                    object.view = Object.assign({}, data.view);
                break;
            case 'AmbientLight':
                object = new THREE.AmbientLight(data.color, data.intensity);
                break;
            case 'DirectionalLight':
                object = new THREE.DirectionalLight(data.color, data.intensity);
                break;
            case 'PointLight':
                object = new THREE.PointLight(data.color, data.intensity, data.distance, data.decay);
                break;
            case 'RectAreaLight':
                object = new THREE.RectAreaLight(data.color, data.intensity, data.width, data.height);
                break;
            case 'SpotLight':
                object = new THREE.SpotLight(data.color, data.intensity, data.distance, data.angle, data.penumbra, data.decay);
                break;
            case 'HemisphereLight':
                object = new THREE.HemisphereLight(data.color, data.groundColor, data.intensity);
                break;
            case 'LightProbe':
                object = new THREE.LightProbe().fromJSON(data);
                break;
            case 'SkinnedMesh':
                geometry = getGeometry(data.geometry);
                material = getMaterial(data.material);
                object = new THREE.SkinnedMesh(geometry, material);
                if (data.bindMode !== undefined)
                    object.bindMode = data.bindMode;
                if (data.bindMatrix !== undefined)
                    object.bindMatrix.fromArray(data.bindMatrix);
                if (data.skeleton !== undefined)
                    object.skeleton = data.skeleton;
                break;
            case 'Mesh':
                geometry = getGeometry(data.geometry);
                material = getMaterial(data.material);
                object = new THREE.Mesh(geometry, material);
                break;
            case 'InstancedMesh': {
                geometry = getGeometry(data.geometry);
                material = getMaterial(data.material);
                const count = data.count;
                const instanceMatrix = data.instanceMatrix;
                const instanceColor = data.instanceColor;
                object = new THREE.InstancedMesh(geometry, material, count);
                object.instanceMatrix = new THREE.InstancedBufferAttribute(new Float32Array(instanceMatrix.array), 16);
                if (instanceColor !== undefined)
                    object.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(instanceColor.array), instanceColor.itemSize);
                break;
            }
            case 'LOD':
                object = new THREE.LOD();
                break;
            case 'Line':
                object = new THREE.Line(getGeometry(data.geometry), getMaterial(data.material));
                break;
            case 'LineLoop':
                object = new THREE.LineLoop(getGeometry(data.geometry), getMaterial(data.material));
                break;
            case 'LineSegments':
                object = new THREE.LineSegments(getGeometry(data.geometry), getMaterial(data.material));
                break;
            case 'PointCloud':
            case 'Points':
                object = new THREE.Points(getGeometry(data.geometry), getMaterial(data.material));
                break;
            case 'Sprite':
                object = new THREE.Sprite(getMaterial(data.material));
                break;
            case 'Group':
                object = new THREE.Group();
                break;
            case 'Bone':
                object = new THREE.Bone();
                break;
            default:
                object = new THREE.Object3D();
        }
        object.uuid = data.uuid;
        if (data.name !== undefined)
            object.name = data.name;
        if (data.matrix !== undefined) {
            object.matrix.fromArray(data.matrix);
            if (data.matrixAutoUpdate !== undefined)
                object.matrixAutoUpdate = data.matrixAutoUpdate;
            if (object.matrixAutoUpdate)
                object.matrix.decompose(object.position, object.quaternion, object.scale);
        }
        else {
            if (data.position !== undefined)
                object.position.fromArray(data.position);
            if (data.rotation !== undefined)
                object.rotation.fromArray(data.rotation);
            if (data.quaternion !== undefined)
                object.quaternion.fromArray(data.quaternion);
            if (data.scale !== undefined)
                object.scale.fromArray(data.scale);
        }
        if (data.castShadow !== undefined)
            object.castShadow = data.castShadow;
        if (data.receiveShadow !== undefined)
            object.receiveShadow = data.receiveShadow;
        if (data.shadow) {
            if (data.shadow.bias !== undefined)
                object.shadow.bias = data.shadow.bias;
            if (data.shadow.normalBias !== undefined)
                object.normalBias = data.shadow.normalBias;
            if (data.shadow.radius !== undefined)
                object.radius = data.shadow.radius;
            if (data.shadow.mapSize !== undefined)
                object.mapSize.fromArray(data.shadow.mapSize);
            if (data.shadow.camera !== undefined) {
                object.camera = this.parseObject(data.shadow.camera);
            }
        }
        if (data.visible !== undefined)
            object.visible = data.visible;
        if (data.frustumCulled !== undefined)
            object.frustumCulled = data.frustumCulled;
        if (data.renderOrder !== undefined)
            object.renderOrder = data.renderOrder;
        if (data.userData !== undefined)
            object.userData = data.userData;
        if (data.layers !== undefined)
            object.layers.mask = data.layers;
        if (data.children !== undefined) {
            const children = data.children;
            for (let i = 0; i < children.length; i++) {
                object.add(this.parseObject(children[i], geometries, materials, textures, animations));
            }
        }
        if (data.animations !== undefined) {
            const objectAnimations = data.animations;
            for (let i = 0; i < objectAnimations.length; i++) {
                const uuid = objectAnimations[i];
                object.animations.push(animations[uuid]);
            }
        }
        if (data.type === 'LOD') {
            if (data.autoUpdate !== undefined)
                object.autoUpdate = data.autoUpdate;
            const levels = data.levels;
            for (let l = 0; l < levels.length; l++) {
                const level = levels[l];
                const child = object.getObjectByProperty('uuid', level.object);
                if (child !== undefined) {
                    object.addLevel(child, level.distance);
                }
            }
        }
        return object;
    }
}

const Plugins = [];
function loadPlugin(plugin) {
    const existing = Plugins.find((item) => item.id === plugin.id);
    if (!existing) {
        plugin.initialize();
        for (const emitterShape of plugin.emitterShapes) {
            if (!EmitterShapes[emitterShape.type]) {
                EmitterShapes[emitterShape.type] = emitterShape;
            }
        }
        for (const behavior of plugin.behaviors) {
            if (!BehaviorTypes[behavior.type]) {
                BehaviorTypes[behavior.type] = behavior;
            }
        }
    }
}
function unloadPlugin(pluginId) {
    const plugin = Plugins.find((item) => item.id === pluginId);
    if (plugin) {
        for (const emitterShape of plugin.emitterShapes) {
            if (EmitterShapes[emitterShape.type]) {
                delete EmitterShapes[emitterShape.type];
            }
        }
        for (const behavior of plugin.behaviors) {
            if (BehaviorTypes[behavior.type]) {
                delete BehaviorTypes[behavior.type];
            }
        }
    }
}

gdjs.__particleEmmiter3DExtension.NodeValueType = void 0;
(function (NodeValueType) {
    NodeValueType[NodeValueType["Number"] = 0] = "Number";
    NodeValueType[NodeValueType["Vec2"] = 1] = "Vec2";
    NodeValueType[NodeValueType["Vec3"] = 2] = "Vec3";
    NodeValueType[NodeValueType["Vec4"] = 3] = "Vec4";
    NodeValueType[NodeValueType["Boolean"] = 4] = "Boolean";
    NodeValueType[NodeValueType["AnyType"] = 5] = "AnyType";
    NodeValueType[NodeValueType["NullableAnyType"] = 6] = "NullableAnyType";
    NodeValueType[NodeValueType["EventStream"] = 7] = "EventStream";
})(gdjs.__particleEmmiter3DExtension.NodeValueType || (gdjs.__particleEmmiter3DExtension.NodeValueType = {}));
const genDefaultForNodeValueType = (type) => {
    switch (type) {
        case gdjs.__particleEmmiter3DExtension.NodeValueType.Boolean:
            return false;
        case gdjs.__particleEmmiter3DExtension.NodeValueType.Number:
            return 0;
        case gdjs.__particleEmmiter3DExtension.NodeValueType.Vec2:
            return new THREE.Vector2();
        case gdjs.__particleEmmiter3DExtension.NodeValueType.Vec3:
            return new THREE.Vector3();
        case gdjs.__particleEmmiter3DExtension.NodeValueType.Vec4:
            return new THREE.Vector4();
        case gdjs.__particleEmmiter3DExtension.NodeValueType.AnyType:
            return 0;
        case gdjs.__particleEmmiter3DExtension.NodeValueType.NullableAnyType:
            return undefined;
    }
};

class Node {
    constructor(type, signatureIndex = -1, data = {}) {
        this.inputs = [];
        this.outputs = [];
        this.signatureIndex = -1;
        this.position = new THREE.Vector2();
        this.outputValues = [];
        this.id = '' + Math.round(Math.random() * 100000);
        this.type = type;
        this.signatureIndex = signatureIndex;
        this.data = data;
        const realIndex = signatureIndex === -1 ? 0 : signatureIndex;
        for (let i = 0; i < type.nodeTypeSignatures[realIndex].inputTypes.length; i++) {
            this.inputs.push(undefined);
        }
        for (let i = 0; i < type.nodeTypeSignatures[realIndex].outputTypes.length; i++) {
            this.outputs.push([]);
            this.outputValues.push(genDefaultForNodeValueType(type.nodeTypeSignatures[realIndex].outputTypes[i]));
        }
    }
    get inputTypes() {
        const signatureIndex = this.signatureIndex === -1 ? 0 : this.signatureIndex;
        return this.type.nodeTypeSignatures[signatureIndex].inputTypes;
    }
    get outputTypes() {
        const signatureIndex = this.signatureIndex === -1 ? 0 : this.signatureIndex;
        return this.type.nodeTypeSignatures[signatureIndex].outputTypes;
    }
    func(context, inputs, outputs) {
        const signatureIndex = this.signatureIndex === -1 ? 0 : this.signatureIndex;
        this.type.nodeTypeSignatures[signatureIndex].func(context, this.data, inputs, outputs);
    }
}
class Wire {
    constructor(input, inputIndex, output, outputIndex) {
        this.input = input;
        this.inputIndex = inputIndex;
        this.input.outputs[inputIndex].push(this);
        this.output = output;
        this.outputIndex = outputIndex;
        this.output.inputs[outputIndex] = this;
    }
}

class BaseCompiler {
    constructor() {
        this.visited = new Set();
        BaseCompiler.Instance = this;
    }
    buildExecutionOrder(graph, context) {
        graph.nodesInOrder.length = 0;
        this.visited.clear();
        for (let i = 0; i < graph.outputNodes.length; i++) {
            const node = graph.outputNodes[i];
            if (node.inputs[0] !== undefined) {
                this._traverse(node, graph, context);
            }
        }
        graph.compiled = true;
    }
    _traverse(node, graph, context) {
        this.visited.add(node.id);
        for (let i = 0; i < node.inputs.length; i++) {
            if (node.inputs[i] instanceof Wire) {
                const inputNode = node.inputs[i].input;
                if (!this.visited.has(inputNode.id)) {
                    this._traverse(inputNode, graph, context);
                }
            }
            else if (node.inputs[i] !== undefined);
            else;
        }
        graph.nodesInOrder.push(node);
    }
}

class Interpreter extends BaseCompiler {
    constructor() {
        super();
    }
    executeCompiledGraph(graph, context) {
        const nodes = graph.nodesInOrder;
        for (let i = 0; i < nodes.length; i++) {
            const inputValues = [];
            const node = nodes[i];
            for (let j = 0; j < node.inputs.length; j++) {
                if (node.inputs[j] instanceof Wire) {
                    inputValues.push(node.inputs[j].input.outputValues[node.inputs[j].inputIndex]);
                }
                else if (node.inputs[j] !== undefined) {
                    inputValues.push(node.inputs[j].getValue(context));
                }
                else {
                    inputValues.push(undefined);
                }
            }
            node.func(context, inputValues, node.outputValues);
        }
    }
    run(graph, context) {
        if (!graph.compiled) {
            this.buildExecutionOrder(graph, context);
        }
        this.executeCompiledGraph(graph, context);
    }
}

class NodeType {
    constructor(name) {
        this.nodeTypeSignatures = [];
        this.name = name;
    }
    addSignature(inputTypes, outputTypes, func) {
        this.nodeTypeSignatures.push({
            inputTypes: inputTypes,
            outputTypes: outputTypes,
            func: func,
        });
    }
}
class GraphNodeType extends NodeType {
    constructor(nodeGraph) {
        const inputTypes = [];
        for (let i = 0; i < nodeGraph.inputNodes.length; i++) {
            if (nodeGraph.inputNodes[i].type.name === 'input') {
                inputTypes.push(nodeGraph.inputNodes[i].data.type);
            }
        }
        const outputTypes = [];
        for (let i = 0; i < nodeGraph.outputNodes.length; i++) {
            if (nodeGraph.outputNodes[i].type.name === 'output') {
                outputTypes.push(nodeGraph.outputNodes[i].data.type);
            }
        }
        super(nodeGraph.name);
        this.addSignature(inputTypes, outputTypes, (context, data, inputs, outputs) => {
            context.inputs = inputs;
            context.outputs = outputs;
            Interpreter.Instance.run(nodeGraph, context);
        });
        this.nodeGraph = nodeGraph;
    }
}

const NodeTypes = {};
const addNode = new NodeType('add');
addNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Number, gdjs.__particleEmmiter3DExtension.NodeValueType.Number], [gdjs.__particleEmmiter3DExtension.NodeValueType.Number], (context, data, inputs, outputs) => {
    outputs[0] = inputs[0] + inputs[1];
});
addNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Vec2, gdjs.__particleEmmiter3DExtension.NodeValueType.Vec2], [gdjs.__particleEmmiter3DExtension.NodeValueType.Vec2], (context, data, inputs, outputs) => {
    outputs[0].addVectors(inputs[0], inputs[1]);
});
addNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Vec3, gdjs.__particleEmmiter3DExtension.NodeValueType.Vec3], [gdjs.__particleEmmiter3DExtension.NodeValueType.Vec3], (context, data, inputs, outputs) => {
    outputs[0].addVectors(inputs[0], inputs[1]);
});
addNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Vec4, gdjs.__particleEmmiter3DExtension.NodeValueType.Vec4], [gdjs.__particleEmmiter3DExtension.NodeValueType.Vec4], (context, data, inputs, outputs) => {
    outputs[0].addVectors(inputs[0], inputs[1]);
});
NodeTypes['add'] = addNode;
const subNode = new NodeType('sub');
subNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Number, gdjs.__particleEmmiter3DExtension.NodeValueType.Number], [gdjs.__particleEmmiter3DExtension.NodeValueType.Number], (context, data, inputs, outputs) => {
    outputs[0] = inputs[0] - inputs[1];
});
subNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Vec2, gdjs.__particleEmmiter3DExtension.NodeValueType.Vec2], [gdjs.__particleEmmiter3DExtension.NodeValueType.Vec2], (context, data, inputs, outputs) => {
    outputs[0].subVectors(inputs[0], inputs[1]);
});
subNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Vec3, gdjs.__particleEmmiter3DExtension.NodeValueType.Vec3], [gdjs.__particleEmmiter3DExtension.NodeValueType.Vec3], (context, data, inputs, outputs) => {
    outputs[0].subVectors(inputs[0], inputs[1]);
});
subNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Vec4, gdjs.__particleEmmiter3DExtension.NodeValueType.Vec4], [gdjs.__particleEmmiter3DExtension.NodeValueType.Vec4], (context, data, inputs, outputs) => {
    outputs[0].subVectors(inputs[0], inputs[1]);
});
NodeTypes['sub'] = subNode;
const mulNode = new NodeType('mul');
mulNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Number, gdjs.__particleEmmiter3DExtension.NodeValueType.Number], [gdjs.__particleEmmiter3DExtension.NodeValueType.Number], (context, data, inputs, outputs) => {
    outputs[0] = inputs[0] * inputs[1];
});
mulNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Vec2, gdjs.__particleEmmiter3DExtension.NodeValueType.Number], [gdjs.__particleEmmiter3DExtension.NodeValueType.Vec2], (context, data, inputs, outputs) => {
    outputs[0].copy(inputs[0]).multiplyScalar(inputs[1]);
});
mulNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Vec3, gdjs.__particleEmmiter3DExtension.NodeValueType.Number], [gdjs.__particleEmmiter3DExtension.NodeValueType.Vec3], (context, data, inputs, outputs) => {
    outputs[0].copy(inputs[0]).multiplyScalar(inputs[1]);
});
mulNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Vec4, gdjs.__particleEmmiter3DExtension.NodeValueType.Number], [gdjs.__particleEmmiter3DExtension.NodeValueType.Vec4], (context, data, inputs, outputs) => {
    outputs[0].copy(inputs[0]).multiplyScalar(inputs[1]);
});
NodeTypes['mul'] = mulNode;
const divNode = new NodeType('div');
divNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Number, gdjs.__particleEmmiter3DExtension.NodeValueType.Number], [gdjs.__particleEmmiter3DExtension.NodeValueType.Number], (context, data, inputs, outputs) => {
    outputs[0] = inputs[0] / inputs[1];
});
divNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Vec2, gdjs.__particleEmmiter3DExtension.NodeValueType.Number], [gdjs.__particleEmmiter3DExtension.NodeValueType.Vec2], (context, data, inputs, outputs) => {
    outputs[0].copy(inputs[0]).divideScalar(inputs[1]);
});
divNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Vec3, gdjs.__particleEmmiter3DExtension.NodeValueType.Number], [gdjs.__particleEmmiter3DExtension.NodeValueType.Vec3], (context, data, inputs, outputs) => {
    outputs[0].copy(inputs[0]).divideScalar(inputs[1]);
});
divNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Vec4, gdjs.__particleEmmiter3DExtension.NodeValueType.Number], [gdjs.__particleEmmiter3DExtension.NodeValueType.Vec4], (context, data, inputs, outputs) => {
    outputs[0].copy(inputs[0]).divideScalar(inputs[1]);
});
NodeTypes['div'] = divNode;
const sinNode = new NodeType('sin');
sinNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Number], [gdjs.__particleEmmiter3DExtension.NodeValueType.Number], (context, data, inputs, outputs) => {
    outputs[0] = Math.sin(inputs[0]);
});
NodeTypes['sin'] = sinNode;
const cosNode = new NodeType('cos');
cosNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Number], [gdjs.__particleEmmiter3DExtension.NodeValueType.Number], (context, data, inputs, outputs) => {
    outputs[0] = Math.cos(inputs[0]);
});
NodeTypes['cos'] = cosNode;
const tanNode = new NodeType('tan');
tanNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Number], [gdjs.__particleEmmiter3DExtension.NodeValueType.Number], (context, data, inputs, outputs) => {
    outputs[0] = Math.tan(inputs[0]);
});
NodeTypes['tan'] = tanNode;
const absNode = new NodeType('abs');
absNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Number], [gdjs.__particleEmmiter3DExtension.NodeValueType.Number], (context, data, inputs, outputs) => {
    outputs[0] = Math.abs(inputs[0]);
});
NodeTypes['abs'] = absNode;
const minNode = new NodeType('min');
minNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Number, gdjs.__particleEmmiter3DExtension.NodeValueType.Number], [gdjs.__particleEmmiter3DExtension.NodeValueType.Number], (context, data, inputs, outputs) => {
    outputs[0] = Math.min(inputs[0], inputs[1]);
});
NodeTypes['min'] = minNode;
const maxNode = new NodeType('max');
maxNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Number, gdjs.__particleEmmiter3DExtension.NodeValueType.Number], [gdjs.__particleEmmiter3DExtension.NodeValueType.Number], (context, data, inputs, outputs) => {
    outputs[0] = Math.max(inputs[0], inputs[1]);
});
NodeTypes['max'] = maxNode;
const dot = new NodeType('dot');
dot.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Vec2, gdjs.__particleEmmiter3DExtension.NodeValueType.Vec2], [gdjs.__particleEmmiter3DExtension.NodeValueType.Number], (context, data, inputs, outputs) => {
    outputs[0] = inputs[0].dot(inputs[1]);
});
dot.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Vec3, gdjs.__particleEmmiter3DExtension.NodeValueType.Vec3], [gdjs.__particleEmmiter3DExtension.NodeValueType.Number], (context, data, inputs, outputs) => {
    outputs[0] = inputs[0].dot(inputs[1]);
});
dot.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Vec4, gdjs.__particleEmmiter3DExtension.NodeValueType.Vec4], [gdjs.__particleEmmiter3DExtension.NodeValueType.Number], (context, data, inputs, outputs) => {
    outputs[0] = inputs[0].dot(inputs[1]);
});
NodeTypes['dot'] = dot;
const cross = new NodeType('cross');
cross.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Vec3, gdjs.__particleEmmiter3DExtension.NodeValueType.Vec3], [gdjs.__particleEmmiter3DExtension.NodeValueType.Vec3], (context, data, inputs, outputs) => {
    outputs[0].crossVectors(inputs[0], inputs[1]);
});
NodeTypes['cross'] = cross;
const length = new NodeType('length');
length.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Vec2], [gdjs.__particleEmmiter3DExtension.NodeValueType.Number], (context, data, inputs, outputs) => {
    outputs[0] = inputs[0].length();
});
length.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Vec3], [gdjs.__particleEmmiter3DExtension.NodeValueType.Number], (context, data, inputs, outputs) => {
    outputs[0] = inputs[0].length();
});
length.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Vec4], [gdjs.__particleEmmiter3DExtension.NodeValueType.Number], (context, data, inputs, outputs) => {
    outputs[0] = inputs[0].length();
});
NodeTypes['length'] = length;
const lengthSq = new NodeType('lengthSq');
lengthSq.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Vec2], [gdjs.__particleEmmiter3DExtension.NodeValueType.Number], (context, data, inputs, outputs) => {
    outputs[0] = inputs[0].lengthSq();
});
lengthSq.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Vec3], [gdjs.__particleEmmiter3DExtension.NodeValueType.Number], (context, data, inputs, outputs) => {
    outputs[0] = inputs[0].lengthSq();
});
lengthSq.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Vec4], [gdjs.__particleEmmiter3DExtension.NodeValueType.Number], (context, data, inputs, outputs) => {
    outputs[0] = inputs[0].lengthSq();
});
NodeTypes['lengthSq'] = lengthSq;
const normalize = new NodeType('normalize');
normalize.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Vec2], [gdjs.__particleEmmiter3DExtension.NodeValueType.Vec2], (context, data, inputs, outputs) => {
    outputs[0].copy(inputs[0]).normalize();
});
normalize.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Vec3], [gdjs.__particleEmmiter3DExtension.NodeValueType.Vec3], (context, data, inputs, outputs) => {
    outputs[0].copy(inputs[0]).normalize();
});
normalize.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Vec4], [gdjs.__particleEmmiter3DExtension.NodeValueType.Vec4], (context, data, inputs, outputs) => {
    outputs[0].copy(inputs[0]).normalize();
});
NodeTypes['normalize'] = normalize;
const distance = new NodeType('distance');
distance.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Vec2, gdjs.__particleEmmiter3DExtension.NodeValueType.Vec2], [gdjs.__particleEmmiter3DExtension.NodeValueType.Number], (context, data, inputs, outputs) => {
    outputs[0] = inputs[0].distanceTo(inputs[1]);
});
distance.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Vec3, gdjs.__particleEmmiter3DExtension.NodeValueType.Vec3], [gdjs.__particleEmmiter3DExtension.NodeValueType.Number], (context, data, inputs, outputs) => {
    outputs[0] = inputs[0].distanceTo(inputs[1]);
});
NodeTypes['distance'] = distance;
const andNode = new NodeType('and');
andNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Boolean, gdjs.__particleEmmiter3DExtension.NodeValueType.Boolean], [gdjs.__particleEmmiter3DExtension.NodeValueType.Boolean], (context, data, inputs, outputs) => {
    outputs[0] = inputs[0] && inputs[1];
});
NodeTypes['and'] = andNode;
const orNode = new NodeType('or');
orNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Boolean, gdjs.__particleEmmiter3DExtension.NodeValueType.Boolean], [gdjs.__particleEmmiter3DExtension.NodeValueType.Boolean], (context, data, inputs, outputs) => {
    outputs[0] = inputs[0] || inputs[1];
});
NodeTypes['or'] = orNode;
const notNode = new NodeType('not');
notNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Boolean], [gdjs.__particleEmmiter3DExtension.NodeValueType.Boolean], (context, data, inputs, outputs) => {
    outputs[0] = !inputs[0];
});
NodeTypes['not'] = notNode;
const equalNode = new NodeType('equal');
equalNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Number, gdjs.__particleEmmiter3DExtension.NodeValueType.Number], [gdjs.__particleEmmiter3DExtension.NodeValueType.Boolean], (context, data, inputs, outputs) => {
    outputs[0] = inputs[0] === inputs[1];
});
equalNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Vec2, gdjs.__particleEmmiter3DExtension.NodeValueType.Vec2], [gdjs.__particleEmmiter3DExtension.NodeValueType.Boolean], (context, data, inputs, outputs) => {
    outputs[0] = inputs[0].equals(inputs[1]);
});
equalNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Vec3, gdjs.__particleEmmiter3DExtension.NodeValueType.Vec3], [gdjs.__particleEmmiter3DExtension.NodeValueType.Boolean], (context, data, inputs, outputs) => {
    outputs[0] = inputs[0].equals(inputs[1]);
});
equalNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Vec4, gdjs.__particleEmmiter3DExtension.NodeValueType.Vec4], [gdjs.__particleEmmiter3DExtension.NodeValueType.Boolean], (context, data, inputs, outputs) => {
    outputs[0] = inputs[0].equals(inputs[1]);
});
NodeTypes['equal'] = equalNode;
const lessThanNode = new NodeType('lessThan');
lessThanNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Number, gdjs.__particleEmmiter3DExtension.NodeValueType.Number], [gdjs.__particleEmmiter3DExtension.NodeValueType.Boolean], (context, data, inputs, outputs) => {
    outputs[0] = inputs[0] < inputs[1];
});
NodeTypes['lessThan'] = lessThanNode;
const greaterThanNode = new NodeType('greaterThan');
greaterThanNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Number, gdjs.__particleEmmiter3DExtension.NodeValueType.Number], [gdjs.__particleEmmiter3DExtension.NodeValueType.Boolean], (context, data, inputs, outputs) => {
    outputs[0] = inputs[0] > inputs[1];
});
NodeTypes['greaterThan'] = greaterThanNode;
const lessThanOrEqualNode = new NodeType('lessThanOrEqual');
lessThanOrEqualNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Number, gdjs.__particleEmmiter3DExtension.NodeValueType.Number], [gdjs.__particleEmmiter3DExtension.NodeValueType.Boolean], (context, data, inputs, outputs) => {
    outputs[0] = inputs[0] <= inputs[1];
});
NodeTypes['lessThanOrEqual'] = lessThanOrEqualNode;
const greaterThanOrEqualNode = new NodeType('greaterThanOrEqual');
greaterThanOrEqualNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Number, gdjs.__particleEmmiter3DExtension.NodeValueType.Number], [gdjs.__particleEmmiter3DExtension.NodeValueType.Boolean], (context, data, inputs, outputs) => {
    outputs[0] = inputs[0] >= inputs[1];
});
NodeTypes['greaterThanOrEqual'] = greaterThanOrEqualNode;
const ifNode = new NodeType('if');
ifNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Boolean, gdjs.__particleEmmiter3DExtension.NodeValueType.AnyType, gdjs.__particleEmmiter3DExtension.NodeValueType.AnyType], [gdjs.__particleEmmiter3DExtension.NodeValueType.AnyType], (context, data, inputs, outputs) => {
    outputs[0] = inputs[0] ? inputs[1] : inputs[2];
});
NodeTypes['if'] = ifNode;
const numberNode = new NodeType('number');
numberNode.addSignature([], [gdjs.__particleEmmiter3DExtension.NodeValueType.Number], (context, data, inputs, outputs) => {
    outputs[0] = data.value;
});
NodeTypes['number'] = numberNode;
const vec2Node = new NodeType('vec2');
vec2Node.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Number, gdjs.__particleEmmiter3DExtension.NodeValueType.Number], [gdjs.__particleEmmiter3DExtension.NodeValueType.Vec2], (context, data, inputs, outputs) => {
    outputs[0].x = inputs[0];
    outputs[0].y = inputs[1];
});
NodeTypes['vec2'] = vec2Node;
const vec3Node = new NodeType('vec3');
vec3Node.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Number, gdjs.__particleEmmiter3DExtension.NodeValueType.Number, gdjs.__particleEmmiter3DExtension.NodeValueType.Number], [gdjs.__particleEmmiter3DExtension.NodeValueType.Vec3], (context, data, inputs, outputs) => {
    outputs[0].x = inputs[0];
    outputs[0].y = inputs[1];
    outputs[0].z = inputs[2];
});
NodeTypes['vec3'] = vec3Node;
const vec4Node = new NodeType('vec4');
vec4Node.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Number, gdjs.__particleEmmiter3DExtension.NodeValueType.Number, gdjs.__particleEmmiter3DExtension.NodeValueType.Number, gdjs.__particleEmmiter3DExtension.NodeValueType.Number], [gdjs.__particleEmmiter3DExtension.NodeValueType.Vec4], (context, data, inputs, outputs) => {
    outputs[0].x = inputs[0];
    outputs[0].y = inputs[1];
    outputs[0].z = inputs[2];
    outputs[0].w = inputs[3];
});
NodeTypes['vec4'] = vec4Node;
const splitVec2Node = new NodeType('splitVec2');
splitVec2Node.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Vec2], [gdjs.__particleEmmiter3DExtension.NodeValueType.Number, gdjs.__particleEmmiter3DExtension.NodeValueType.Number], (context, data, inputs, outputs) => {
    outputs[0] = inputs[0].x;
    outputs[1] = inputs[0].y;
});
NodeTypes['splitVec2'] = splitVec2Node;
const splitVec3Node = new NodeType('splitVec3');
splitVec3Node.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Vec3], [gdjs.__particleEmmiter3DExtension.NodeValueType.Number, gdjs.__particleEmmiter3DExtension.NodeValueType.Number, gdjs.__particleEmmiter3DExtension.NodeValueType.Number], (context, data, inputs, outputs) => {
    outputs[0] = inputs[0].x;
    outputs[1] = inputs[0].y;
    outputs[2] = inputs[0].z;
});
NodeTypes['splitVec3'] = splitVec3Node;
const splitVec4Node = new NodeType('splitVec4');
splitVec4Node.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Vec4], [gdjs.__particleEmmiter3DExtension.NodeValueType.Number, gdjs.__particleEmmiter3DExtension.NodeValueType.Number, gdjs.__particleEmmiter3DExtension.NodeValueType.Number, gdjs.__particleEmmiter3DExtension.NodeValueType.Number], (context, data, inputs, outputs) => {
    outputs[0] = inputs[0].x;
    outputs[1] = inputs[0].y;
    outputs[2] = inputs[0].z;
    outputs[3] = inputs[0].w;
});
NodeTypes['splitVec4'] = splitVec4Node;
const boolNode = new NodeType('bool');
boolNode.addSignature([], [gdjs.__particleEmmiter3DExtension.NodeValueType.Boolean], (context, data, inputs, outputs) => {
    outputs[0] = data.value;
});
NodeTypes['bool'] = boolNode;
const particlePropertyNode = new NodeType('particleProperty');
particlePropertyNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.NullableAnyType], [gdjs.__particleEmmiter3DExtension.NodeValueType.NullableAnyType], (context, data, inputs, outputs) => {
    if (inputs[0] !== undefined) {
        if (typeof inputs[0] === 'object') {
            context.particle[data.property].copy(inputs[0]);
        }
        else {
            context.particle[data.property] = inputs[0];
        }
    }
    if (context.particle[data.property] !== undefined) {
        if (typeof outputs[0] === 'object') {
            outputs[0].copy(context.particle[data.property]);
        }
        else {
            outputs[0] = context.particle[data.property];
        }
    }
});
NodeTypes['particleProperty'] = particlePropertyNode;
const emitNode = new NodeType('emit');
emitNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.EventStream], [], (context, data, inputs, outputs) => {
    const arr = inputs[0];
    for (let i = 0; i < arr.length; i++) {
        context.signal(i, arr[i]);
    }
});
NodeTypes['emit'] = emitNode;
const graphPropertyNode = new NodeType('graphProperty');
graphPropertyNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.NullableAnyType], [gdjs.__particleEmmiter3DExtension.NodeValueType.NullableAnyType], (context, data, inputs, outputs) => {
    if (inputs[0] !== undefined) {
        if (typeof inputs[0] === 'object') {
            context.graph[data.property].copy(inputs[0]);
        }
        else {
            context.graph[data.property] = inputs[0];
        }
    }
    if (context.graph[data.property] !== undefined) {
        if (typeof outputs[0] === 'object') {
            outputs[0].copy(context.graph[data.property]);
        }
        else {
            outputs[0] = context.graph[data.property];
        }
    }
});
NodeTypes['graphProperty'] = graphPropertyNode;
const startEventNode = new NodeType('startEvent');
startEventNode.addSignature([], [gdjs.__particleEmmiter3DExtension.NodeValueType.EventStream], (context, data, inputs, outputs) => {
    outputs[0] = [{ type: 'start' }];
});
NodeTypes['startEvent'] = startEventNode;
const repeaterNode = new NodeType('repeater');
repeaterNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.EventStream, gdjs.__particleEmmiter3DExtension.NodeValueType.Number], [gdjs.__particleEmmiter3DExtension.NodeValueType.EventStream], (context, data, inputs, outputs) => {
    const arr = inputs[0];
    const count = inputs[1];
    const result = [];
    for (let j = 0; j < arr.length; j++) {
        for (let i = 0; i < count; i++) {
            result.push(arr[j]);
        }
    }
    outputs[0] = result;
});
NodeTypes['repeater'] = repeaterNode;
const timeNode = new NodeType('time');
timeNode.addSignature([], [gdjs.__particleEmmiter3DExtension.NodeValueType.Number], (context, data, inputs, outputs) => {
    outputs[0] = context.emissionState.time;
});
NodeTypes['time'] = timeNode;
const deltaNode = new NodeType('delta');
deltaNode.addSignature([], [gdjs.__particleEmmiter3DExtension.NodeValueType.Number], (context, data, inputs, outputs) => {
    outputs[0] = context.delta;
});
NodeTypes['delta'] = deltaNode;
const outputNode = new NodeType('output');
outputNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Number], [gdjs.__particleEmmiter3DExtension.NodeValueType.Number], (context, data, inputs, outputs) => {
    outputs[0] = inputs[0];
});
outputNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Vec2], [gdjs.__particleEmmiter3DExtension.NodeValueType.Vec2], (context, data, inputs, outputs) => {
    outputs[0] = inputs[0];
});
outputNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Vec3], [gdjs.__particleEmmiter3DExtension.NodeValueType.Vec3], (context, data, inputs, outputs) => {
    outputs[0] = inputs[0];
});
outputNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Vec4], [gdjs.__particleEmmiter3DExtension.NodeValueType.Vec4], (context, data, inputs, outputs) => {
    outputs[0] = inputs[0];
});
outputNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Boolean], [gdjs.__particleEmmiter3DExtension.NodeValueType.Boolean], (context, data, inputs, outputs) => {
    outputs[0] = inputs[0];
});
NodeTypes['output'] = outputNode;
const lerpNode = new NodeType('lerp');
lerpNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Number, gdjs.__particleEmmiter3DExtension.NodeValueType.Number, gdjs.__particleEmmiter3DExtension.NodeValueType.Number], [gdjs.__particleEmmiter3DExtension.NodeValueType.Number], (context, data, inputs, outputs) => {
    outputs[0] =
        inputs[0] * (1 - inputs[2]) + inputs[1] * inputs[2];
});
lerpNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Vec2, gdjs.__particleEmmiter3DExtension.NodeValueType.Vec2, gdjs.__particleEmmiter3DExtension.NodeValueType.Number], [gdjs.__particleEmmiter3DExtension.NodeValueType.Vec2], (context, data, inputs, outputs) => {
    outputs[0].lerpVectors(inputs[0], inputs[1], inputs[2]);
});
lerpNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Vec3, gdjs.__particleEmmiter3DExtension.NodeValueType.Vec3, gdjs.__particleEmmiter3DExtension.NodeValueType.Number], [gdjs.__particleEmmiter3DExtension.NodeValueType.Vec3], (context, data, inputs, outputs) => {
    outputs[0].lerpVectors(inputs[0], inputs[1], inputs[2]);
});
lerpNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Vec4, gdjs.__particleEmmiter3DExtension.NodeValueType.Vec4, gdjs.__particleEmmiter3DExtension.NodeValueType.Number], [gdjs.__particleEmmiter3DExtension.NodeValueType.Vec4], (context, data, inputs, outputs) => {
    outputs[0].lerpVectors(inputs[0], inputs[1], inputs[2]);
});
NodeTypes['lerp'] = lerpNode;
const normalD = (x) => {
    return (1 / Math.sqrt(2 * Math.PI)) * Math.exp(x * x * -0.5);
};
const normalDistributionNode = new NodeType('normDistrib');
normalDistributionNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Number], [gdjs.__particleEmmiter3DExtension.NodeValueType.Number], (context, data, inputs, outputs) => {
    outputs[0] = normalD(inputs[0]);
});
NodeTypes['normDistrib'] = normalDistributionNode;
const normcdfNode = new NodeType('normcdf');
normcdfNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Number], [gdjs.__particleEmmiter3DExtension.NodeValueType.Number], (context, data, inputs, outputs) => {
    let x = inputs[0];
    const a1 = 0.254829592;
    const a2 = -0.284496736;
    const a3 = 1.421413741;
    const a4 = -1.453152027;
    const a5 = 1.061405429;
    const p = 0.3275911;
    let sign = 1;
    if (x < 0)
        sign = -1;
    x = Math.abs(x) / Math.sqrt(2.0);
    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    outputs[0] = 0.5 * (1.0 + sign * y);
});
NodeTypes['normcdf'] = normcdfNode;
const normcdfInvNode = new NodeType('normcdfInv');
const rationalApproximation = (t) => {
    const c = [2.515517, 0.802853, 0.010328];
    const d = [1.432788, 0.189269, 0.001308];
    return t - ((c[2] * t + c[1]) * t + c[0]) / (((d[2] * t + d[1]) * t + d[0]) * t + 1.0);
};
const normcdfInv = (p) => {
    if (p < 0.5) {
        return -rationalApproximation(Math.sqrt(-2.0 * Math.log(p)));
    }
    else {
        return rationalApproximation(Math.sqrt(-2.0 * Math.log(1 - p)));
    }
};
normcdfInvNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Number], [gdjs.__particleEmmiter3DExtension.NodeValueType.Number], (context, data, inputs, outputs) => {
    outputs[0] = normcdfInv(inputs[0]);
});
NodeTypes['normcdfInv'] = normcdfInvNode;
const clampNode = new NodeType('clamp');
clampNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Number, gdjs.__particleEmmiter3DExtension.NodeValueType.Number, gdjs.__particleEmmiter3DExtension.NodeValueType.Number], [gdjs.__particleEmmiter3DExtension.NodeValueType.Number], (context, data, inputs, outputs) => {
    outputs[0] = Math.max(Math.min(inputs[0], inputs[2]), inputs[1]);
});
NodeTypes['clamp'] = clampNode;
const smoothstepNode = new NodeType('smoothstep');
smoothstepNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Number, gdjs.__particleEmmiter3DExtension.NodeValueType.Number, gdjs.__particleEmmiter3DExtension.NodeValueType.Number], [gdjs.__particleEmmiter3DExtension.NodeValueType.Number], (context, data, inputs, outputs) => {
    const x = Math.max(Math.min(inputs[0], inputs[2]), inputs[1]);
    outputs[0] = x * x * (3 - 2 * x);
});
NodeTypes['smoothstep'] = smoothstepNode;
const randomNode = new NodeType('random');
randomNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Number, gdjs.__particleEmmiter3DExtension.NodeValueType.Number], [gdjs.__particleEmmiter3DExtension.NodeValueType.Number], (context, data, inputs, outputs) => {
    outputs[0] = Math.random() * (inputs[1] - inputs[0]) + inputs[0];
});
randomNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Vec2, gdjs.__particleEmmiter3DExtension.NodeValueType.Vec2], [gdjs.__particleEmmiter3DExtension.NodeValueType.Vec2], (context, data, inputs, outputs) => {
    let random = Math.random();
    outputs[0].lerpVectors(inputs[0], inputs[1], random);
});
randomNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Vec3, gdjs.__particleEmmiter3DExtension.NodeValueType.Vec3], [gdjs.__particleEmmiter3DExtension.NodeValueType.Vec3], (context, data, inputs, outputs) => {
    let random = Math.random();
    outputs[0].lerpVectors(inputs[0], inputs[1], random);
});
randomNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Vec4, gdjs.__particleEmmiter3DExtension.NodeValueType.Vec4], [gdjs.__particleEmmiter3DExtension.NodeValueType.Vec4], (context, data, inputs, outputs) => {
    let random = Math.random();
    outputs[0].lerpVectors(inputs[0], inputs[1], random);
});
NodeTypes['random'] = randomNode;
const vrandNode = new NodeType('vrand');
vrandNode.addSignature([], [gdjs.__particleEmmiter3DExtension.NodeValueType.Vec2], (context, data, inputs, outputs) => {
    let x = normcdfInv(Math.random());
    let y = normcdfInv(Math.random());
    const mag = Math.sqrt(x * x + y * y);
    outputs[0].set(x / mag, y / mag);
});
vrandNode.addSignature([], [gdjs.__particleEmmiter3DExtension.NodeValueType.Vec3], (context, data, inputs, outputs) => {
    let x = normcdfInv(Math.random());
    let y = normcdfInv(Math.random());
    let z = normcdfInv(Math.random());
    const mag = Math.sqrt(x * x + y * y + z * z);
    outputs[0].set(x / mag, y / mag, z / mag);
});
vrandNode.addSignature([], [gdjs.__particleEmmiter3DExtension.NodeValueType.Vec4], (context, data, inputs, outputs) => {
    let x = normcdfInv(Math.random());
    let y = normcdfInv(Math.random());
    let z = normcdfInv(Math.random());
    let w = normcdfInv(Math.random());
    const mag = Math.sqrt(x * x + y * y + z * z + w * w);
    outputs[0].set(x / mag, y / mag, z / mag, w / mag);
});
NodeTypes['vrand'] = vrandNode;
const bsdfNode = new NodeType('bsdf');
bsdfNode.addSignature([gdjs.__particleEmmiter3DExtension.NodeValueType.Vec3, gdjs.__particleEmmiter3DExtension.NodeValueType.Vec3, gdjs.__particleEmmiter3DExtension.NodeValueType.Vec3, gdjs.__particleEmmiter3DExtension.NodeValueType.Number], [], (context, data, inputs, outputs) => { });
NodeTypes['bsdf'] = bsdfNode;
const OutputNodeTypeNames = new Set(['output', 'particleProperty', 'graphProperty', 'emit']);

class NodeGraph {
    constructor(name) {
        this.inputNodes = [];
        this.outputNodes = [];
        this.allNodes = new Map();
        this.wires = [];
        this.compiled = false;
        this.nodesInOrder = [];
        this.version = '1.0';
        this.uuid = THREE.MathUtils.generateUUID();
        this.name = name;
        this.revision = 0;
    }
    addWire(wire) {
        this.wires.push(wire);
        this.revision++;
    }
    addNode(node) {
        this.allNodes.set(node.id, node);
        if (node.type === NodeTypes['input']) {
            this.inputNodes.push(node);
        }
        else if (OutputNodeTypeNames.has(node.type.name)) {
            this.outputNodes.push(node);
        }
        this.revision++;
    }
    getNode(id) {
        return this.allNodes.get(id);
    }
    deleteNode(node) {
        this.allNodes.delete(node.id);
        this.revision++;
    }
    deleteWire(wire) {
        let index = wire.input.outputs[wire.inputIndex].indexOf(wire);
        if (index !== -1) {
            wire.input.outputs[wire.inputIndex].splice(index, 1);
        }
        wire.output.inputs[wire.outputIndex] = undefined;
        index = this.wires.indexOf(wire);
        if (index != -1) {
            this.wires[index] = this.wires[this.wires.length - 1];
            this.wires.pop();
        }
        this.revision++;
    }
    toJSON() {
        throw new Error('not implemented');
    }
    clone() {
        throw new Error('not implemented');
    }
}

new THREE.Vector3(0, 0, 1);
const tempQ = new THREE.Quaternion();
const tempV = new THREE.Vector3();
const tempV2 = new THREE.Vector3();
const PREWARM_FPS = 60;
const DEFAULT_GEOMETRY = new THREE.PlaneGeometry(1, 1, 1, 1);
class NodeVFX {
    set time(time) {
        this.emissionState.time = time;
    }
    get time() {
        return this.emissionState.time;
    }
    get layers() {
        return this.rendererSettings.layers;
    }
    get texture() {
        return this.rendererSettings.material.map;
    }
    set texture(texture) {
        this.rendererSettings.material.map = texture;
        this.neededToUpdateRender = true;
    }
    get material() {
        return this.rendererSettings.material;
    }
    set material(material) {
        this.rendererSettings.material = material;
        this.neededToUpdateRender = true;
    }
    get instancingGeometry() {
        return this.rendererSettings.instancingGeometry;
    }
    set instancingGeometry(geometry) {
        this.restart();
        this.particles.length = 0;
        this.rendererSettings.instancingGeometry = geometry;
        this.neededToUpdateRender = true;
    }
    get renderMode() {
        return this.rendererSettings.renderMode;
    }
    set renderMode(renderMode) {
        if ((this.rendererSettings.renderMode != gdjs.__particleEmmiter3DExtension.RenderMode.Trail && renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.Trail) ||
            (this.rendererSettings.renderMode == gdjs.__particleEmmiter3DExtension.RenderMode.Trail && renderMode !== gdjs.__particleEmmiter3DExtension.RenderMode.Trail)) {
            this.restart();
            this.particles.length = 0;
        }
        if (this.rendererSettings.renderMode !== renderMode) {
            switch (renderMode) {
                case gdjs.__particleEmmiter3DExtension.RenderMode.Trail:
                    this.rendererEmitterSettings = {
                        startLength: 30,
                        followLocalOrigin: false,
                    };
                    break;
                case gdjs.__particleEmmiter3DExtension.RenderMode.Mesh:
                    this.rendererEmitterSettings = {
                        geometry: new THREE.PlaneGeometry(1, 1),
                    };
                    break;
                case gdjs.__particleEmmiter3DExtension.RenderMode.BillBoard:
                case gdjs.__particleEmmiter3DExtension.RenderMode.VerticalBillBoard:
                case gdjs.__particleEmmiter3DExtension.RenderMode.HorizontalBillBoard:
                case gdjs.__particleEmmiter3DExtension.RenderMode.StretchedBillBoard:
                    this.rendererEmitterSettings = {};
                    break;
            }
        }
        this.rendererSettings.renderMode = renderMode;
        this.neededToUpdateRender = true;
    }
    get renderOrder() {
        return this.rendererSettings.renderOrder;
    }
    set renderOrder(renderOrder) {
        this.rendererSettings.renderOrder = renderOrder;
        this.neededToUpdateRender = true;
    }
    get blending() {
        return this.rendererSettings.material.blending;
    }
    set blending(blending) {
        this.rendererSettings.material.blending = blending;
        this.neededToUpdateRender = true;
    }
    constructor(parameters) {
        var _a, _b, _c, _d, _e, _f, _g;
        this.temp = new THREE.Vector3();
        this.travelDistance = 0;
        this.normalMatrix = new THREE.Matrix3();
        this.speedFactor = 0;
        this.autoDestroy = parameters.autoDestroy === undefined ? false : parameters.autoDestroy;
        this.duration = (_a = parameters.duration) !== null && _a !== void 0 ? _a : 1;
        this.looping = parameters.looping === undefined ? true : parameters.looping;
        this.prewarm = parameters.prewarm === undefined ? false : parameters.prewarm;
        this.worldSpace = (_b = parameters.worldSpace) !== null && _b !== void 0 ? _b : false;
        this.rendererEmitterSettings = (_c = parameters.rendererEmitterSettings) !== null && _c !== void 0 ? _c : {};
        this.emissionGraph = parameters.emissionGraph;
        this.updateGraph = parameters.updateGraph;
        this.interpreter = new Interpreter();
        this.rendererSettings = {
            instancingGeometry: (_d = parameters.instancingGeometry) !== null && _d !== void 0 ? _d : DEFAULT_GEOMETRY,
            renderMode: (_e = parameters.renderMode) !== null && _e !== void 0 ? _e : gdjs.__particleEmmiter3DExtension.RenderMode.BillBoard,
            renderOrder: (_f = parameters.renderOrder) !== null && _f !== void 0 ? _f : 0,
            material: parameters.material,
            layers: (_g = parameters.layers) !== null && _g !== void 0 ? _g : new THREE.Layers(),
            uTileCount: 1,
            vTileCount: 1,
        };
        this.neededToUpdateRender = true;
        this.particles = new Array();
        this.emitter = new ParticleEmitter(this);
        this.paused = false;
        this.particleNum = 0;
        this.emissionState = {
            time: 0,
        };
        this.emitEnded = false;
        this.markForDestroy = false;
        this.prewarmed = false;
    }
    pause() {
        this.paused = true;
    }
    play() {
        this.paused = false;
    }
    spawn(emissionState, matrix) {
        tempQ.setFromRotationMatrix(matrix);
        const translation = tempV;
        const quaternion = tempQ;
        const scale = tempV2;
        matrix.decompose(translation, quaternion, scale);
        this.particleNum++;
        while (this.particles.length < this.particleNum) {
            this.particles.push(new NodeParticle());
        }
        const particle = this.particles[this.particleNum - 1];
        particle.reset();
        this.interpreter.run(this.updateGraph, { particle: particle, emissionState: this.emissionState });
        if (this.rendererSettings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.Trail &&
            this.rendererEmitterSettings.followLocalOrigin) {
            const trail = particle;
            trail.localPosition = new THREE.Vector3().copy(trail.position);
        }
        if (this.worldSpace) {
            particle.position.applyMatrix4(matrix);
            particle.size *= (Math.abs(scale.x) + Math.abs(scale.y) + Math.abs(scale.z)) / 3;
            particle.velocity.multiply(scale).applyMatrix3(this.normalMatrix);
            if (particle.rotation && particle.rotation instanceof THREE.Quaternion) {
                particle.rotation.multiplyQuaternions(tempQ, particle.rotation);
            }
        }
    }
    endEmit() {
        this.emitEnded = true;
        if (this.autoDestroy) {
            this.markForDestroy = true;
        }
    }
    dispose() {
        if (this._renderer)
            this._renderer.deleteSystem(this);
        this.emitter.dispose();
        if (this.emitter.parent)
            this.emitter.parent.remove(this.emitter);
    }
    restart() {
        this.paused = false;
        this.particleNum = 0;
        this.emissionState.time = 0;
        this.emitEnded = false;
        this.markForDestroy = false;
        this.prewarmed = false;
    }
    update(delta) {
        if (this.paused)
            return;
        let currentParent = this.emitter;
        while (currentParent.parent) {
            currentParent = currentParent.parent;
        }
        if (currentParent.type !== 'Scene') {
            this.dispose();
            return;
        }
        if (this.emitEnded && this.particleNum === 0) {
            if (this.markForDestroy && this.emitter.parent)
                this.dispose();
            return;
        }
        if (this.looping && this.prewarm && !this.prewarmed) {
            this.prewarmed = true;
            for (let i = 0; i < this.duration * PREWARM_FPS; i++) {
                this.update(1.0 / PREWARM_FPS);
            }
        }
        if (delta > 0.1) {
            delta = 0.1;
        }
        if (this.neededToUpdateRender) {
            if (this._renderer)
                this._renderer.updateSystem(this);
            this.neededToUpdateRender = false;
        }
        this.emit(delta, this.emissionState, this.emitter.matrixWorld);
        const context = { particle: undefined, emissionState: this.emissionState, delta };
        for (let i = 0; i < this.particleNum; i++) {
            context.particle = this.particles[i];
            this.interpreter.run(this.updateGraph, context);
        }
        for (let i = 0; i < this.particleNum; i++) {
            if (this.rendererEmitterSettings.followLocalOrigin &&
                this.particles[i].localPosition) {
                this.particles[i].position.copy(this.particles[i].localPosition);
                if (this.particles[i].parentMatrix) {
                    this.particles[i].position.applyMatrix4(this.particles[i].parentMatrix);
                }
                else {
                    this.particles[i].position.applyMatrix4(this.emitter.matrixWorld);
                }
            }
            else {
                this.particles[i].position.addScaledVector(this.particles[i].velocity, delta);
            }
            this.particles[i].age += delta;
        }
        if (this.rendererSettings.renderMode === gdjs.__particleEmmiter3DExtension.RenderMode.Trail) {
            for (let i = 0; i < this.particleNum; i++) {
                const particle = this.particles[i];
                particle.update();
            }
        }
        for (let i = 0; i < this.particleNum; i++) {
            const particle = this.particles[i];
            if (particle.died && (!(particle instanceof TrailParticle) || particle.previous.length === 0)) {
                this.particles[i] = this.particles[this.particleNum - 1];
                this.particles[this.particleNum - 1] = particle;
                this.particleNum--;
                i--;
            }
        }
    }
    emit(delta, emissionState, emitterMatrix) {
        if (emissionState.time > this.duration) {
            if (this.looping) {
                emissionState.time -= this.duration;
            }
            else {
                if (!this.emitEnded) {
                    this.endEmit();
                }
            }
        }
        this.normalMatrix.getNormalMatrix(emitterMatrix);
        const context = {
            signal: () => {
                this.spawn(emissionState, emitterMatrix);
            },
            emissionState,
            delta,
        };
        if (!this.emitEnded) {
            this.interpreter.run(this.emissionGraph, context);
        }
        if (this.previousWorldPos === undefined)
            this.previousWorldPos = new THREE.Vector3();
        this.emitter.getWorldPosition(this.previousWorldPos);
        emissionState.time += delta;
    }
    toJSON(meta, options = {}) {
        return {};
    }
    getRendererSettings() {
        return this.rendererSettings;
    }
    clone() {
        return this;
    }
}

gdjs.__particleEmmiter3DExtension.ApplyCollision = ApplyCollision;
gdjs.__particleEmmiter3DExtension.ApplyForce = ApplyForce;
gdjs.__particleEmmiter3DExtension.ApplySequences = ApplySequences;
gdjs.__particleEmmiter3DExtension.AxisAngleGenerator = AxisAngleGenerator;
gdjs.__particleEmmiter3DExtension.BatchedParticleRenderer = BatchedParticleRenderer;
gdjs.__particleEmmiter3DExtension.BatchedRenderer = BatchedRenderer;
gdjs.__particleEmmiter3DExtension.BehaviorFromJSON = BehaviorFromJSON;
gdjs.__particleEmmiter3DExtension.BehaviorTypes = BehaviorTypes;
gdjs.__particleEmmiter3DExtension.Bezier = Bezier;
gdjs.__particleEmmiter3DExtension.ChangeEmitDirection = ChangeEmitDirection;
gdjs.__particleEmmiter3DExtension.ColorGeneratorFromJSON = ColorGeneratorFromJSON;
gdjs.__particleEmmiter3DExtension.ColorOverLife = ColorOverLife;
gdjs.__particleEmmiter3DExtension.ColorRange = ColorRange;
gdjs.__particleEmmiter3DExtension.ConeEmitter = ConeEmitter;
gdjs.__particleEmmiter3DExtension.ConstantColor = ConstantColor;
gdjs.__particleEmmiter3DExtension.ConstantValue = ConstantValue;
gdjs.__particleEmmiter3DExtension.DonutEmitter = DonutEmitter;
gdjs.__particleEmmiter3DExtension.EmitSubParticleSystem = EmitSubParticleSystem;
gdjs.__particleEmmiter3DExtension.EmitterFromJSON = EmitterFromJSON;
gdjs.__particleEmmiter3DExtension.EmitterShapes = EmitterShapes;
gdjs.__particleEmmiter3DExtension.EulerGenerator = EulerGenerator;
gdjs.__particleEmmiter3DExtension.ForceOverLife = ForceOverLife;
gdjs.__particleEmmiter3DExtension.FrameOverLife = FrameOverLife;
gdjs.__particleEmmiter3DExtension.GeneratorFromJSON = GeneratorFromJSON;
gdjs.__particleEmmiter3DExtension.Gradient = Gradient;
gdjs.__particleEmmiter3DExtension.GraphNodeType = GraphNodeType;
gdjs.__particleEmmiter3DExtension.GravityForce = GravityForce;
gdjs.__particleEmmiter3DExtension.GridEmitter = GridEmitter;
gdjs.__particleEmmiter3DExtension.Interpreter = Interpreter;
gdjs.__particleEmmiter3DExtension.IntervalValue = IntervalValue;
gdjs.__particleEmmiter3DExtension.MeshSurfaceEmitter = MeshSurfaceEmitter;
gdjs.__particleEmmiter3DExtension.Node = Node;
gdjs.__particleEmmiter3DExtension.NodeGraph = NodeGraph;
gdjs.__particleEmmiter3DExtension.NodeType = NodeType;
gdjs.__particleEmmiter3DExtension.NodeTypes = NodeTypes;
gdjs.__particleEmmiter3DExtension.Noise = Noise;
gdjs.__particleEmmiter3DExtension.OrbitOverLife = OrbitOverLife;
gdjs.__particleEmmiter3DExtension.ParticleEmitter = ParticleEmitter;
gdjs.__particleEmmiter3DExtension.ParticleSystem = ParticleSystem;
gdjs.__particleEmmiter3DExtension.PiecewiseBezier = PiecewiseBezier;
gdjs.__particleEmmiter3DExtension.PiecewiseFunction = PiecewiseFunction;
gdjs.__particleEmmiter3DExtension.Plugins = Plugins;
gdjs.__particleEmmiter3DExtension.PointEmitter = PointEmitter;
gdjs.__particleEmmiter3DExtension.QuarksLoader = QuarksLoader;
gdjs.__particleEmmiter3DExtension.RandomColor = RandomColor;
gdjs.__particleEmmiter3DExtension.RandomColorBetweenGradient = RandomColorBetweenGradient;
gdjs.__particleEmmiter3DExtension.RandomQuatGenerator = RandomQuatGenerator;
gdjs.__particleEmmiter3DExtension.RecordState = RecordState;
gdjs.__particleEmmiter3DExtension.Rotation3DOverLife = Rotation3DOverLife;
gdjs.__particleEmmiter3DExtension.RotationGeneratorFromJSON = RotationGeneratorFromJSON;
gdjs.__particleEmmiter3DExtension.RotationOverLife = RotationOverLife;
gdjs.__particleEmmiter3DExtension.SequencerFromJSON = SequencerFromJSON;
gdjs.__particleEmmiter3DExtension.SizeOverLife = SizeOverLife;
gdjs.__particleEmmiter3DExtension.SpeedOverLife = SpeedOverLife;
gdjs.__particleEmmiter3DExtension.SphereEmitter = SphereEmitter;
gdjs.__particleEmmiter3DExtension.SpriteBatch = SpriteBatch;
gdjs.__particleEmmiter3DExtension.SpriteParticle = SpriteParticle;
gdjs.__particleEmmiter3DExtension.TextureSequencer = TextureSequencer;
gdjs.__particleEmmiter3DExtension.TrailBatch = TrailBatch;
gdjs.__particleEmmiter3DExtension.TrailParticle = TrailParticle;
gdjs.__particleEmmiter3DExtension.TurbulenceField = TurbulenceField;
gdjs.__particleEmmiter3DExtension.VFXBatch = VFXBatch;
gdjs.__particleEmmiter3DExtension.ValueGeneratorFromJSON = ValueGeneratorFromJSON;
gdjs.__particleEmmiter3DExtension.WidthOverLength = WidthOverLength;
gdjs.__particleEmmiter3DExtension.Wire = Wire;
gdjs.__particleEmmiter3DExtension.genDefaultForNodeValueType = genDefaultForNodeValueType;
gdjs.__particleEmmiter3DExtension.getPhysicsResolver = getPhysicsResolver;
gdjs.__particleEmmiter3DExtension.loadPlugin = loadPlugin;
gdjs.__particleEmmiter3DExtension.setPhysicsResolver = setPhysicsResolver;
gdjs.__particleEmmiter3DExtension.unloadPlugin = unloadPlugin;

};
gdjs.evtsExt__ParticleEmitter3D__DefineHelperClasses.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


gdjs.evtsExt__ParticleEmitter3D__DefineHelperClasses.userFunc0x1421058(runtimeScene, typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined);

}


};gdjs.evtsExt__ParticleEmitter3D__DefineHelperClasses.eventsList1 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.variable.getVariableBoolean(runtimeScene.getGame().getVariables().get("_ParticleEmmiter3DExtension_ClassesDefined"), false);
if (isConditionTrue_0) {
{gdjs.evtTools.variable.setVariableBoolean(runtimeScene.getGame().getVariables().get("_ParticleEmmiter3DExtension_ClassesDefined"), true);
}
{ //Subevents
gdjs.evtsExt__ParticleEmitter3D__DefineHelperClasses.eventsList0(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


};

gdjs.evtsExt__ParticleEmitter3D__DefineHelperClasses.func = function(runtimeScene, parentEventsFunctionContext) {
var eventsFunctionContext = {
  _objectsMap: {
},
  _objectArraysMap: {
},
  _behaviorNamesMap: {
},
  getObjects: function(objectName) {
    return eventsFunctionContext._objectArraysMap[objectName] || [];
  },
  getObjectsLists: function(objectName) {
    return eventsFunctionContext._objectsMap[objectName] || null;
  },
  getBehaviorName: function(behaviorName) {
    return eventsFunctionContext._behaviorNamesMap[behaviorName] || behaviorName;
  },
  createObject: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    if (objectsList) {
      const object = parentEventsFunctionContext ?
        parentEventsFunctionContext.createObject(objectsList.firstKey()) :
        runtimeScene.createObject(objectsList.firstKey());
      if (object) {
        objectsList.get(objectsList.firstKey()).push(object);
        eventsFunctionContext._objectArraysMap[objectName].push(object);
      }
      return object;    }
    return null;
  },
  getInstancesCountOnScene: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    let count = 0;
    if (objectsList) {
      for(const objectName in objectsList.items)
        count += parentEventsFunctionContext ?
parentEventsFunctionContext.getInstancesCountOnScene(objectName) :
        runtimeScene.getInstancesCountOnScene(objectName);
    }
    return count;
  },
  getLayer: function(layerName) {
    return runtimeScene.getLayer(layerName);
  },
  getArgument: function(argName) {
    return "";
  },
  getOnceTriggers: function() { return runtimeScene.getOnceTriggers(); }
};


gdjs.evtsExt__ParticleEmitter3D__DefineHelperClasses.eventsList1(runtimeScene, eventsFunctionContext);

return;
}

gdjs.evtsExt__ParticleEmitter3D__DefineHelperClasses.registeredGdjsCallbacks = [];