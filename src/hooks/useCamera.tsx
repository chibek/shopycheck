import { useRef } from "react";
import { Camera } from "expo-camera";

export const useCamera = () => {
  const cameraRef = useRef<Camera>(null);

  const __takePicture = async () => {
    if (cameraRef && cameraRef.current) {
      try {
        const picture = await cameraRef.current.takePictureAsync({
          quality: 0.5,
          base64: true,
        });
        return picture;
      } catch (error) {
        console.error(error);
      }
    }
    return null;
  };

  return {
    cameraRef,
    __takePicture,
  };
};
