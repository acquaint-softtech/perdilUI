/**
 * @license
 * Copyright Acquaint softtech. All Rights Reserved.
 * Licensed under the ISC License. See License.txt in the project root for license information.
 */

import { useEffect, useState } from 'react';
import { Clipboard } from './Clipboard';

const listeners = new Set();

function setString(content) {
  Clipboard.setString(content);
  listeners.forEach(listener => listener(content));
}

export const useClipboard = () => {
  const [data, updateClipboardData] = useState('');

  useEffect(() => {
    Clipboard.getString().then(updateClipboardData);
  }, []);

  useEffect(() => {
    listeners.add(updateClipboardData);

    return () => {
      listeners.delete(updateClipboardData);
    };
  }, []);

  return [data, setString];
};
