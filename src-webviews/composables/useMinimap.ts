import { ref } from 'vue';
import WebViewEvents from '@ViewUtility/webViewEvents.js';
import { Events } from '@AthenaShared/events/index.js';

type Minimap = {
    x: number;
    y: number;
    top: number;
    left: number;
    bottom: number;
    right: number;
    width: number;
    height: number;
    aspectRatio: number;
    safeZone: number;
    screenWidth: number;
    screenHeight: number;
};

const minimap = ref<Minimap>();

let isInit = false;

export function useMinimap() {
    function init() {
        if (isInit) {
            return;
        }

        isInit = true;
        WebViewEvents.on(Events.view.updateMinimap, (data: Minimap) => (minimap.value = data));
    }

    return {
        minimap,
        init,
    };
}
