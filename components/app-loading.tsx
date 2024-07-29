import LottieView from "lottie-react-native";

export function AppLoading() {
  return (
    <LottieView
      source={require("../assets/buss-animation.json")}
      style={{ width: "100%", height: "100%" }}
      autoPlay
      loop
    />
  );
}
