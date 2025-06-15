export function getDeviceId() {
  if (typeof window === "undefined") return null;

  let deviceId = localStorage.getItem("deviceId");
  if (!deviceId) {
    deviceId = crypto.randomUUID();
    localStorage.setItem("deviceId", deviceId);

    document.cookie = `deviceId=${deviceId}; path=/; max-age=${60 * 60 * 24 * 365}`;
  }

  return deviceId;
}
