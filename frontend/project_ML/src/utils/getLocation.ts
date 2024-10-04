const getLocation = (): Promise<{ latitude: number; longitude: number }> => {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          console.error("Erro ao obter a localização:", error);
          reject(error);
        }
      );
    } else {
      console.log("Geolocalização não é suportada neste navegador.");
      reject(new Error("Geolocalização não suportada"));
    }
  });
};

export { getLocation };
