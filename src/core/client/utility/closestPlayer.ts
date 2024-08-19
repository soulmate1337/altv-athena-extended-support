import * as alt from 'alt-client';
import * as AthenaClient from '@AthenaClient/api/index.js';
import { PLAYER_SYNCED_META } from '@AthenaShared/enums/playerSynced.js';

export function getClosestPlayers(maxDistance: number) {
    const playerList = [...alt.Player.all];
    const validPlayers: Array<{ name: string; id: number }> = [];

    for (let i = 0; i < playerList.length; i++) {
        if (!playerList[i].valid) {
            continue;
        }

        if (playerList[i].id === alt.Player.local.id) {
            continue;
        }

        const id: number = playerList[i].getSyncedMeta(PLAYER_SYNCED_META.IDENTIFICATION_ID) as number;
        const name: string = playerList[i].getSyncedMeta(PLAYER_SYNCED_META.NAME) as string;

        if (typeof id === 'undefined' || typeof name === 'undefined') {
            continue;
        }

        const dist = AthenaClient.utility.vector.distance(alt.Player.local.pos, playerList[i].pos);
        if (dist > maxDistance) {
            continue;
        }

        validPlayers.push({ name, id });
    }

    return validPlayers;
}
