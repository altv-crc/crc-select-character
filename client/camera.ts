import * as alt from 'alt-client';
import * as native from 'natives';
import { config } from '../shared/index';

let camera: number;
let interval: number;

function tick() {
    native.setUseHiDof();
}

export function update(target: number | alt.Vector3) {
    if (typeof camera === 'undefined') {
        camera = native.createCamWithParams(
            'DEFAULT_SCRIPTED_CAMERA',
            config.position.camera.x,
            config.position.camera.y,
            config.position.camera.z + 0.2,
            0,
            0,
            0,
            55,
            false,
            1
        );

        native.setCamUseShallowDofMode(camera, true);
        native.setCamFov(camera, 30);
        native.setCamNearDof(camera, 0.2);
        native.setCamFarDof(camera, 3.5);
        native.setCamDofStrength(camera, 1);
        native.setCamActive(camera, true);

        if (typeof target === 'number') {
            native.pointCamAtPedBone(camera, target, 0x322c, 0, 0, 0, false);
        } else {
            native.pointCamAtCoord(camera, target.x, target.y, target.z);
        }

        native.renderScriptCams(true, true, 1000, false, false, 0);

        if (typeof interval === 'undefined') {
            interval = alt.setInterval(tick, 0);
        }
    } else {
        if (typeof target === 'number') {
            native.pointCamAtPedBone(camera, target, 0x322c, 0, 0, 0, false);
        } else {
            native.pointCamAtCoord(camera, target.x, target.y, target.z);
        }

        native.setCamActive(camera, true);
        native.renderScriptCams(true, true, 1000, false, false, 0);
    }

    alt.logDebug(`crc-create-character | Camera Updated`);
}

export function destroy() {
    alt.clearInterval(interval);
    interval = undefined;

    native.destroyAllCams(true);
    native.setCamActive(camera, false);
    native.renderScriptCams(false, false, 0, false, false, 0);

    alt.logDebug(`crc-create-character | Camera Destroyed`);
}

alt.on('disconnect', destroy);
