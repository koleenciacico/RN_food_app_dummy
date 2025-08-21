import CustomButton from '@/components/CustomButton'
import CustomInput from '@/components/CustomInput'
import { createUser } from '@/lib/appwrite'
import { Link, router } from 'expo-router'
import { useState } from 'react'
import { Alert, Text, View } from 'react-native'

const SignUp = () => {

// this is a  function to connect form to form
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({name:'', email:'' , password: ''});

  const submit = async () => {

    const {name, email, password} = form; // once declaring  here you can now remove the all form declared ex. form.email and such

    if (!name || !email || !password) return Alert.alert('Error', 'Please enter valid Email & Password');


    /* claude suggestion 
    if (!name.trim()) return Alert.alert('Error', 'Please enter your full name');
    if (!email.trim()) return Alert.alert('Error', 'Please enter a valid email');
    if (password.length < 8) return Alert.alert('Error', 'Password must be at least 8 characters'); */
    
    setIsSubmitting(true)

          try{
           
            await createUser ({ email,  password,  name,})  // Call Appwrite Sign Up Function

          // for testing :  Alert.alert('Success', 'User signed up successfully');
            router.replace('/');
          } catch(error:unknown  /*unknown - claude suggesntion*/){
            /*const errorMessages = error instanceof Error ? error.message : 'An unexpected error occured';
            Alert.alert ('Error', errorMessages);  - claude suggestion*/
           // Alert.alert('Error', error.message);
           const errorMessages = error instanceof Error ? error.message : 'An unexpected error occured';
            Alert.alert ('Error', errorMessages);
          }finally{
            setIsSubmitting(false);
        }
      } // if this disappear here and move to the bottom part why it will run the code but the attrbuttes will list? 
  //css and tsx for sign in 
      return (
        <View className='gap-10 bg-white rounded-lg p-5 mt-5'>

                  <CustomInput
                    placeholder='Enter your Full Name'
                    value={form.name}
                    onChangeText={(text)=> {setForm((prev) => ({...prev, name:text}))}} 
                    label='Full name'
                />

                  <CustomInput
                    placeholder='Enter your Email'
                    value={form.email}
                    onChangeText={(text)=> {setForm((prev) => ({...prev, email:text}))}} 
                    label='Email'
                    keyboardType='email-address'
                />

                <CustomInput
                    placeholder='Enter your Password'
                    value={form.password}
                    onChangeText={(text)=> {setForm((prev) => ({...prev, password:text}))}} 
                    label='Password'
                    secureTextEntry= {true}
                />
                <CustomButton 
                    title = "Sign-Up"
                    isLoading={isSubmitting}
                    onPress={submit}
                    />

                <View className='flex justify-center mt-4 flex-row gap-2'>
                  <Text className='base-regular text-gray-100'> 
                      Already have an Account?
                  </Text>
                  <Link href='/(auth)/sign-in' className='base-bold text-primary'>
                      Sign In
                  </Link>

                </View>

        </View>
      )
}
export default SignUp