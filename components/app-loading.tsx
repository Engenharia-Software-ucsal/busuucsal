import LottieView from "lottie-react-native";

export interface AppLoadingProps {
  onAnimationFinish?: () => void;
}

export function AppLoading({ onAnimationFinish }: AppLoadingProps) {
  return (
    <LottieView
      onAnimationFinish={onAnimationFinish}
      source={require("../assets/buss-animation.json")}
      style={{ width: "100%", height: "100%" }}
      autoPlay
      loop={false}
    />
  );
}
