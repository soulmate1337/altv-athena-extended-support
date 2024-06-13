import { ref, computed } from 'vue';
import { Events } from '@AthenaShared/events/index.js';
import WebViewEvents from '@ViewUtility/webViewEvents.js';
import { VehicleIndicatorLights } from 'alt-client';

type StreetData = {
    crossingRoad: string;
    streetName: string;
};

type Stats = {
    ammo: number;
    armour: number;
    direction: string;
    engineOn: boolean;
    fps: number;
    gear: number;
    health: number;
    indicatorLights: number;
    inVehicle: boolean;
    inWater: boolean;
    isTalking: boolean;
    lights: [boolean, boolean];
    locked: boolean;
    maxGear: number;
    ping: number;
    seat: number;
    speed: number;
    stamina: number;
    street: StreetData;
    time: [void, number, number, number, number, number, number];
    vehicleHealth: number;
    weapon: number;
    weather: string;
};

const data = ref<Stats>({
    health: 200,
    armour: 0,
    speed: 0,
    weapon: 0xa2719263, // Fist
    ammo: 0,
    stamina: 0,
    inVehicle: false,
    inWater: false,
    gear: 0,
    maxGear: 0,
    engineOn: false,
    locked: false,
    seat: 0,
    vehicleHealth: 0,
    fps: 0,
    ping: 0,
    isTalking: false,
    time: [null, 0, 0, 0, 0, 0, 0],
    street: { streetName: '', crossingRoad: '' },
    direction: '',
    weather: '',
    indicatorLights: 0,
    lights: [false, false],
});

let isInit = false;

export function usePlayerStats() {
    if (!isInit) {
        // Player
        WebViewEvents.on(Events.localPlayer.stats.armour, (armour: number) => (data.value.armour = armour));
        WebViewEvents.on(Events.localPlayer.stats.health, (health: number) => (data.value.health = health));
        WebViewEvents.on(Events.localPlayer.stats.speed, (speed: number) => (data.value.speed = speed));
        WebViewEvents.on(Events.localPlayer.stats.weapon, (weapon: number) => (data.value.weapon = weapon));
        WebViewEvents.on(Events.localPlayer.stats.stamina, (stamina: number) => (data.value.stamina = stamina));
        WebViewEvents.on(Events.localPlayer.stats.inWater, (inWater: boolean) => (data.value.inWater = inWater));
        WebViewEvents.on(Events.localPlayer.stats.ammo, (ammo: number) => (data.value.ammo = ammo));

        // // General
        WebViewEvents.on(Events.localPlayer.stats.ping, (ping: number) => (data.value.ping = ping));
        WebViewEvents.on(Events.localPlayer.stats.fps, (fps: number) => (data.value.fps = fps));
        WebViewEvents.on(
            Events.localPlayer.stats.isTalking,
            (isTalking: boolean) => (data.value.isTalking = isTalking),
        );

        // Vehicle
        WebViewEvents.on(
            Events.localPlayer.stats.inVehicle,
            (inVehicle: boolean) => (data.value.inVehicle = inVehicle),
        );
        WebViewEvents.on(Events.localPlayer.stats.gear, (gear: number) => (data.value.gear = gear));
        WebViewEvents.on(Events.localPlayer.stats.maxGear, (maxGear: number) => (data.value.maxGear = maxGear));
        WebViewEvents.on(Events.localPlayer.stats.engineOn, (engineOn: boolean) => (data.value.engineOn = engineOn));
        WebViewEvents.on(Events.localPlayer.stats.locked, (locked: boolean) => (data.value.locked = locked));
        WebViewEvents.on(Events.localPlayer.stats.seat, (seat: number) => (data.value.seat = seat));
        WebViewEvents.on(Events.localPlayer.stats.lights, (lights: [boolean, boolean]) => (data.value.lights = lights));
        WebViewEvents.on(
            Events.localPlayer.stats.indicatorLights,
            (indicatorLights: VehicleIndicatorLights) => (data.value.indicatorLights = indicatorLights),
        );
        WebViewEvents.on(
            Events.localPlayer.stats.vehicleHealth,
            (vehicleHealth: number) => (data.value.vehicleHealth = vehicleHealth),
        );

        // World
        WebViewEvents.on(
            Events.localPlayer.stats.time,
            (time: [void, number, number, number, number, number, number]) => (data.value.time = time),
        );

        WebViewEvents.on(Events.localPlayer.stats.street, (street: StreetData) => (data.value.street = street));

        WebViewEvents.on(Events.localPlayer.stats.direction, (direction: string) => (data.value.direction = direction));

        WebViewEvents.on(Events.localPlayer.stats.weather, (weather: string) => (data.value.weather = weather));

        isInit = true;
    }

    return {
        health: computed(() => {
            return data.value.health;
        }),
        armour: computed(() => {
            return data.value.armour;
        }),
        speed: computed(() => {
            return data.value.speed;
        }),
        weapon: computed(() => {
            return data.value.weapon;
        }),
        stamina: computed(() => {
            return data.value.stamina;
        }),
        inVehicle: computed(() => {
            return data.value.inVehicle;
        }),
        inWater: computed(() => {
            return data.value.inWater;
        }),
        gear: computed(() => {
            return data.value.gear;
        }),
        maxGear: computed(() => {
            return data.value.maxGear;
        }),
        engineOn: computed(() => {
            return data.value.engineOn;
        }),
        locked: computed(() => {
            return data.value.locked;
        }),
        seat: computed(() => {
            return data.value.seat;
        }),
        vehicleHealth: computed(() => {
            return data.value.vehicleHealth;
        }),
        ping: computed(() => {
            return data.value.ping;
        }),
        fps: computed(() => {
            return data.value.fps;
        }),
        isTalking: computed(() => {
            return data.value.isTalking;
        }),
        time: computed(() => {
            return data.value.time;
        }),
        street: computed(() => {
            return data.value.street.streetName;
        }),
        crossingRoad: computed(() => {
            return data.value.street.crossingRoad;
        }),
        direction: computed(() => {
            return data.value.direction;
        }),
        weather: computed(() => {
            return data.value.weather;
        }),
        indicatorLights: computed(() => {
            return data.value.indicatorLights;
        }),
        headlights: computed(() => {
            return data.value.lights[0];
        }),
        highbeams: computed(() => {
            return data.value.lights[1];
        }),
    };
}
