import React, { useState, useRef } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  View,
  PanResponder,
} from "react-native";

const Messenger = () => {
  const [chats, _] = useState([
    {
      image:
        "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F20%2F2020%2F11%2F13%2Fdwayne-johnson.jpg",
      animation: new Animated.ValueXY(),
    },
    {
      image:
        "https://i.insider.com/5dc098e0d8d84605b9674ef9?width=1000&format=jpeg&auto=webp",
      animation: new Animated.ValueXY(),
    },
    {
      image:
        "https://www.man-shop.eu/media/image/19/07/c7/HerrenBz6datKT7kMmG.png",
      animation: new Animated.ValueXY(),
    },
    {
      image:
        "https://classic1073.org/wp-content/uploads/2021/08/edward-watts.jpg",
      animation: new Animated.ValueXY(),
    },
  ]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        chats.map(({ animation }) => {
          animation.extractOffset();
          // setValue Animated bug fix
          animation.setValue({ x: 0, y: 0 });
        });
      },
      onPanResponderMove: (e, { dx, dy }) => {
        chats[0].animation.setValue({
          x: dx,
          y: dy,
        });

        chats.slice(1).map(({ animation }, index) => {
          return Animated.sequence([
            Animated.delay(index * 10),
            Animated.spring(animation, {
              toValue: { x: dx, y: dy },
              useNativeDriver: false,
            }),
          ]).start();
        });
      },
    })
  ).current;
  return (
    <View style={styles.container}>
      {chats
        .slice(0)
        .reverse()
        .map((item, index, items) => {
          const pan =
            index === items.length - 1 ? panResponder.panHandlers : {};

          return (
            <Animated.Image
              {...pan}
              key={index}
              source={{ uri: item.image }}
              style={[
                styles.chat,
                { transform: item.animation.getTranslateTransform() },
              ]}
            ></Animated.Image>
          );
        })}
    </View>
  );
};

export default Messenger;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  chat: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});
