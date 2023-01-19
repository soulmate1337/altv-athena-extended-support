import * as alt from 'alt-server';
import { ATHENA_EVENTS_PLAYER } from '@AthenaShared/enums/athenaEvents';
import { getWeatherFromString, WEATHER_KEY } from '@AthenaShared/utility/weather';
import { PluginSystem } from '../plugins';
import { Athena } from '@AthenaServer/api/athena';

const TIME_BETWEEN_UPDATES = 60000 * 5; // 5 Minutes
const weathers: Array<WEATHER_KEY> = [
    'ExtraSunny',
    'ExtraSunny',
    'Clear',
    'Clouds',
    'Overcast',
    'Rain',
    'Thunder',
    'Rain',
    'Foggy',
    'Overcast',
    'Clearing',
];

let enabled = true;
let interval: number;

const Internal = {
    /**
     * Updates the player weather to match current weather system.
     *
     * @param {alt.Player} player
     */
    updatePlayer(player: alt.Player) {
        if (!enabled) {
            return;
        }

        Athena.player.emit.message(player, `Weather is now ${weathers[0]}.`);
        player.setWeather(getWeatherFromString(weathers[0]));
    },

    /**
     * Simple global weather system. Rotates through an array periodically.
     * Synchronizes it with all players.
     */
    handleWeatherUpdate() {
        if (!enabled) {
            return;
        }

        const loggedInPlayers = [...alt.Player.all].filter((x) => x && x.valid && x.hasFullySpawned);
        if (loggedInPlayers.length <= 0) {
            return;
        }

        // Remove first weather item.
        // Push to the back of the array.
        weathers.push(weathers.shift());

        for (let player of loggedInPlayers) {
            Internal.updatePlayer(player);
        }
    },
    init() {
        if (!enabled) {
            return;
        }

        Athena.events.player.on(ATHENA_EVENTS_PLAYER.SELECTED_CHARACTER, Internal.updatePlayer);
        alt.setInterval(Internal.handleWeatherUpdate, TIME_BETWEEN_UPDATES);
        alt.log(`~b~Loaded Default System: Weather`);
    },
};

export const DefaultWeatherSystem = {
    disable: () => {
        enabled = false;

        if (typeof interval !== 'undefined') {
            alt.clearInterval(interval);
            interval = undefined;
        }

        alt.log(`Default Weather System Turned Off`);
    },
    getCurrentWeather(asString = false): number | string {
        return asString ? weathers[0] : getWeatherFromString(weathers[0]);
    },
    updatePlayer: Internal.updatePlayer,
};

PluginSystem.callback.add(Internal.init);
