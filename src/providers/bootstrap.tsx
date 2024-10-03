import { useQueryClient } from '@tanstack/react-query';
import { loadAsync } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { useEffect, type PropsWithChildren, useState, useCallback } from 'react';
import { View } from 'react-native';

import { options as sessionQueryOptions } from 'api/auth/use-session';
import { fonts } from 'constants/fonts';
import { logger } from 'utils/logger';

void SplashScreen.preventAutoHideAsync();

export function Bootstrap({ children }: PropsWithChildren) {
  const [appIsReady, setAppIsReady] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    async function prepare() {
      try {
        logger.system.debug('bootstrap');
        await Promise.all([loadAsync(fonts), queryClient.fetchQuery(sessionQueryOptions)]);
      } catch (err) {
        const reason = err instanceof Error ? err.message : null;
        logger.system.error('bootstrap failed', { reason });
      } finally {
        setAppIsReady(true);
      }
    }

    void prepare();
  }, [queryClient]);

  const onLayoutRootView = useCallback(() => {
    if (!appIsReady) return;
    void SplashScreen.hideAsync();
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      {children}
    </View>
  );
}
