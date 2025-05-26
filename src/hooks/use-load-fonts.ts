import { useFonts } from 'expo-font';

const useLoadFonts = () => {
  const [fontsLoaded] = useFonts({
    'HelveticaRegular': require('../assets/fonts/HelveticaRegular.ttf')
  });
  return fontsLoaded;
};

export default useLoadFonts;
