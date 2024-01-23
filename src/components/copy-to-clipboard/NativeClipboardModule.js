/**
 * @license
 * Copyright Acquaint softtech. All Rights Reserved.
 * Licensed under the ISC License. See License.txt in the project root for license information.
 */

import { NativeEventEmitter, TurboModuleRegistry } from 'react-native';

const ClipboardTurboModule =
  TurboModuleRegistry.getEnforcing('RNCClipboard');

export default ClipboardTurboModule;

const EVENT_NAME = 'RNCClipboard_TEXT_CHANGED';
const eventEmitter = new NativeEventEmitter(ClipboardTurboModule);

let listenerCount = eventEmitter.listenerCount;

// listenerCount is only available from RN 0.64
// Older versions only have `listeners`
if (!listenerCount) {
  listenerCount = (eventType) => {
    return eventEmitter.listeners(eventType).length;
  };
} else {
  listenerCount = eventEmitter.listenerCount.bind(eventEmitter);
}

const addListener = (listener) => {
  if (listenerCount(EVENT_NAME) === 0) {
    ClipboardTurboModule.setListener();
  }

  let res = eventEmitter.addListener(EVENT_NAME, listener);

  // Path the remove call to also remove the native listener
  // if we no longer have listeners
  res._remove = res.remove;
  res.remove = function () {
    this._remove();
    if (listenerCount(EVENT_NAME) === 0) {
      ClipboardTurboModule.removeListener();
    }
  };

  return res;
};

const removeAllListeners = () => {
  eventEmitter.removeAllListeners(EVENT_NAME);
  ClipboardTurboModule.removeListener();
};

export { addListener, removeAllListeners };
