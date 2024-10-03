import { useSession } from 'api/auth/use-session';
import { useSignInMutation } from 'api/auth/use-sign-in-mutation';
import { useSignOutMutation } from 'api/auth/use-sign-out-mutation';
import { useState } from 'react';
import { Button, SafeAreaView, Text, TextInput, View } from 'react-native';

export default function Screen() {
  const [email, setEmail] = useState('');
  const { data, status } = useSession();
  const signInMutation = useSignInMutation();
  const signOutMutation = useSignOutMutation();

  const signIn = () => signInMutation.mutate(email);
  const signOut = () => signOutMutation.mutate();

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ paddingHorizontal: 16, alignItems: 'center' }}>
        <Text>{JSON.stringify({ data, status })}</Text>
        {status === 'loading' && <Text>Fetching session details...</Text>}
        {status === 'unauthenticated' && (
          <>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="email"
              autoCorrect={false}
              autoCapitalize="none"
              autoComplete="off"
              style={{
                width: '80%',
                height: 40,
                borderWidth: 1,
                borderColor: 'black',
                paddingHorizontal: 16,
                marginVertical: 16
              }}
            />
            <Button
              title={signInMutation.isPending ? 'processing...' : 'sign in'}
              disabled={!email || signInMutation.isPending}
              onPress={signIn}
            />
          </>
        )}
        {status === 'authenticated' && (
          <Button
            title={signOutMutation.isPending ? 'processing...' : 'sign out'}
            disabled={signOutMutation.isPending}
            onPress={signOut}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
