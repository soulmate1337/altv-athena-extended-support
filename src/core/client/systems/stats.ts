import * as alt from 'alt-client';
import * as native from 'natives';
import * as AthenaClient from '@AthenaClient/api/index.js';
import { Events } from '@AthenaShared/events/index.js';
import { getDirection, getPreviousWeatherType, getStreetInfo } from '@AthenaClient/utility/world.js';

// const view = useWebview();
// const view = await AthenaClient.webview.get();

function update() {
    AthenaClient.webview.emit(Events.localPlayer.stats.health, alt.Player.local.health);
    AthenaClient.webview.emit(Events.localPlayer.stats.armour, alt.Player.local.armour);
    AthenaClient.webview.emit(Events.localPlayer.stats.weapon, alt.Player.local.currentWeapon);
    AthenaClient.webview.emit(Events.localPlayer.stats.ammo, alt.Player.local.currentAmmo);
    AthenaClient.webview.emit(Events.localPlayer.stats.stamina, alt.Player.local.stamina);
    AthenaClient.webview.emit(Events.localPlayer.stats.inWater, native.isPedSwimming(alt.Player.local));

    AthenaClient.webview.emit(Events.localPlayer.stats.inVehicle, alt.Player.local.vehicle ? true : false);
    AthenaClient.webview.emit(
        Events.localPlayer.stats.gear,
        alt.Player.local.vehicle ? alt.Player.local.vehicle.gear : 0,
    );
    AthenaClient.webview.emit(
        Events.localPlayer.stats.maxGear,
        alt.Player.local.vehicle ? alt.Player.local.vehicle.maxGear : 0,
    );
    AthenaClient.webview.emit(
        Events.localPlayer.stats.engineOn,
        alt.Player.local.vehicle ? alt.Player.local.vehicle.engineOn : false,
    );
    AthenaClient.webview.emit(
        Events.localPlayer.stats.locked,
        alt.Player.local.vehicle ? alt.Player.local.vehicle.lockState === 2 : false,
    );
    AthenaClient.webview.emit(Events.localPlayer.stats.seat, alt.Player.local.vehicle ? alt.Player.local.seat : 0);
    AthenaClient.webview.emit(
        Events.localPlayer.stats.indicatorLights,
        alt.Player.local.vehicle ? alt.Player.local.vehicle.indicatorLights : 0,
    );
    AthenaClient.webview.emit(
        Events.localPlayer.stats.vehicleHealth,
        alt.Player.local.vehicle ? native.getVehicleEngineHealth(alt.Player.local.vehicle) : 0,
    );
    AthenaClient.webview.emit(
        Events.localPlayer.stats.speed,
        alt.Player.local.vehicle ? alt.Player.local.vehicle.speed : alt.Player.local.moveSpeed,
    );

    if (alt.Player.local.vehicle) {
        const [_voidLight, lights, highbeams] = native.getVehicleLightsState(alt.Player.local.vehicle);
        AthenaClient.webview.emit(Events.localPlayer.stats.lights, [lights, highbeams]);
    } else {
        AthenaClient.webview.emit(Events.localPlayer.stats.lights, [false, false]);
    }

    AthenaClient.webview.emit(Events.localPlayer.stats.isTalking, alt.isKeyDown(alt.Voice.activationKey));
    AthenaClient.webview.emit(Events.localPlayer.stats.fps, alt.getFps());
    AthenaClient.webview.emit(Events.localPlayer.stats.ping, alt.getPing());
    AthenaClient.webview.emit(Events.localPlayer.stats.time, native.getUtcTime());
    AthenaClient.webview.emit(Events.localPlayer.stats.weather, getPreviousWeatherType());
    AthenaClient.webview.emit(Events.localPlayer.stats.street, getStreetInfo(alt.Player.local));
    AthenaClient.webview.emit(Events.localPlayer.stats.direction, getDirection(alt.Player.local));
}

alt.setInterval(update, 500); // Invoke stats to webview two times a second -> can be reduced
