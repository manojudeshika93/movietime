import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';

import { images } from '@/assets';
import { Button, PwTextInput, TextInput } from '@/src/components';
import { tw } from '@/src/config';
import { LoginFormValues } from '@/src/models';
import { ToastService } from '@/src/services';
import { loginValidationSchema } from '@/src/utils';

export default function LoginScreen() {
  const {
    control,
    setFocus,
    handleSubmit,
    formState: { isSubmitted },
  } = useForm<LoginFormValues>({
    mode: 'onChange',
    resolver: yupResolver(loginValidationSchema),
  });

  const onFormValid: SubmitHandler<LoginFormValues> = async formInput => {
    console.log('forInput', formInput);
  };

  const onFormInvalid: SubmitErrorHandler<LoginFormValues> = errors => {
    ToastService.error({ message: errors as string });
  };

  return (
    <KeyboardAvoidingView style={tw`flex-1 mt-10`} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={tw`items-center gap-10`}>
          <Text style={tw`text-h2-extrabold`}>Login</Text>
          <Image source={images.logo} style={tw`w-40 h-40`} resizeMode="contain" />
        </View>
        <View style={tw`m-5 gap-5`}>
          <Controller
            control={control}
            name="username"
            render={({ field: { value, onChange, ...field }, fieldState: { error } }) => (
              <TextInput
                {...field}
                label="Username"
                placeholder="Enter username"
                value={value}
                onChangeText={onChange}
                error={isSubmitted && error !== undefined}
                helperText={error?.message}
                onSubmitEditing={() => setFocus('password')}
                returnKeyType="next"
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange, ...field }, fieldState: { error } }) => (
              <PwTextInput
                {...field}
                label="Password"
                placeholder="Enter password"
                value={value}
                onChangeText={onChange}
                error={isSubmitted && error !== undefined}
                helperText={error?.message}
                returnKeyType="done"
              />
            )}
          />
        </View>
      </ScrollView>
      <View style={tw`m-5`}>
        <Button title="Login" onPress={handleSubmit(onFormValid, onFormInvalid)} />
      </View>
    </KeyboardAvoidingView>
  );
}
