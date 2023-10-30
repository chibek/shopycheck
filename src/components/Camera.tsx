import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";
import { useBackAction } from "../hooks/useBackAction";
import type { CameraCapturedPicture } from "expo-camera";
import { useCamera } from "../hooks/useCamera";
import Button from "./Button";
import axios from "axios";

type CameraButtonProps = {
  takePicture?: () => void;
};

type PreviewPictureProps = {
  image: CameraCapturedPicture;
  back?: () => void;
};

const OCR = (image) => {
  const formData = {
    apikey: process.env.EXPO_PUBLIC_OCR_API_KEY,
    language: "spa",
    isTable: true,
    OCREngine: 5,
    scale: true,
    Base64Image: `data:image/jpeg;base64,${image}`,
  };

  axios({
    method: "post",
    url: "https://api.ocr.space/parse/image",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).then((response) => {
    console.log(response.data.ParsedResults[0].TextOverlay);
  });
};

const CameraButton = ({ takePicture }: CameraButtonProps) => {
  return (
    <View style={styles.cameraButtonPosition}>
      <View style={styles.camaraButtonAlign}>
        <TouchableOpacity
          onPress={takePicture}
          style={{ ...styles.cameraButtonInner, ...styles.cameraButton }}
        >
          <View style={styles.cameraButtonInner} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const PreviewPicture = ({ image, back }: PreviewPictureProps) => {
  useBackAction({ back });
  const handlerOcer = () => {
    OCR(image.base64);
  };
  return (
    <>
      <Image source={{ uri: image.uri }} style={styles.cameraScreen} />
      <View style={styles.cameraButtonPosition}>
        <Button onPress={back} size={40} icon="arrow-back" />
        <Button onPress={handlerOcer} size={40} icon="checkmark-circle" />
      </View>
    </>
  );
};

const DefaultCamera = () => {
  const [image, setImage] = useState<CameraCapturedPicture | null>(null);

  const { cameraRef, __takePicture } = useCamera();
  const takePicture = async () => {
    const picture = await __takePicture();
    setImage(picture);
  };
  const handleBack = () => {
    console.log("entra");
    setImage(null);
  };

  if (image) {
    return <PreviewPicture back={handleBack} image={image} />;
  }

  return (
    <>
      <Camera ref={cameraRef} style={styles.cameraScreen} />
      <CameraButton takePicture={takePicture} />
    </>
  );
};

export default DefaultCamera;

const styles = StyleSheet.create({
  cameraScreen: { flex: 1, width: "100%", objectFit: "fill" },
  cameraButtonInner: {
    width: 55,
    height: 55,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: "#fff",
  },
  cameraButton: {
    backgroundColor: "#000",
    width: 70,
    height: 70,
    borderColor: "#fff",
    borderWidth: 4,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraButtonPosition: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    flex: 1,
    width: "100%",
    padding: 20,
    justifyContent: "space-between",
  },
  camaraButtonAlign: {
    alignSelf: "center",
    flex: 1,
    alignItems: "center",
  },
});
