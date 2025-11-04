import { squarePath } from '@/constant/square-path';
import { useCallback, useEffect, useRef } from 'react';

interface IframeMessageOptions {
  targetOrigin?: string;
  onMessage?: (event: MessageEvent) => void;
}

export const useIframeMessage = (options: IframeMessageOptions = {}) => {
  const { targetOrigin = squarePath.base, onMessage } = options;
  const iframeRef = useRef<HTMLIFrameElement>(null);


  const sendMessage = useCallback(
    (message: any) => {
      if (!iframeRef.current) return console.warn('Please correctly configure the iframeRef');
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          message,
          targetOrigin
        );
      } else {
        console.warn('iframe is not loaded or not available');
      }
    },
    [iframeRef, targetOrigin]
  );

  useEffect(() => {
    if (!onMessage) return;

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== squarePath.base) return;
      onMessage(event.data);
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [onMessage]);

  return {
    iframeRef,
    sendMessage,
  };
};