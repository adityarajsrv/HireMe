/* eslint-disable no-unused-vars */
const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const getProfile = async (token) => {
  const response = await fetch(`${baseUrl}/api/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch (err) {
    throw new Error(`Invalid server response: Not valid JSON - ${text}`);
  }

  if (!response.ok) {
    throw new Error(data.msg || `HTTP error! Status: ${response.status}`);
  }

  return { data };
};

export const updateProfile = async (token, payload) => {
  const response = await fetch(`${baseUrl}/api/auth/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch (err) {
    throw new Error(`Invalid server response: Not valid JSON - ${text}`);
  }

  if (!response.ok) {
    throw new Error(data.msg || `HTTP error! Status: ${response.status}`);
  }

  return { data };
};

export const uploadProfileImage = async (token, formData) => {
  try {
    console.log("Uploading image to:", `${baseUrl}/api/auth/profile/image`);
    console.log("Token:", token ? "Present" : "Missing");
    console.log("FormData contains file:", formData.has("profileImage"));

    const response = await fetch(`${baseUrl}/api/auth/profile/image`, {
      method: "PUT", // Changed to PUT to match backend
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const text = await response.text();
    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch (err) {
      throw new Error(`Invalid server response: Not valid JSON - ${text}`);
    }

    if (!response.ok) {
      console.error("Upload response:", { status: response.status, data });
      throw new Error(data.msg || `HTTP error! Status: ${response.status}`);
    }

    console.log("Upload successful:", data);
    return { data };
  } catch (err) {
    console.error("UploadProfileImage error:", {
      message: err.message,
      stack: err.stack,
    });
    throw err;
  }
};

export const deleteProfileImage = async (token) => {
  const response = await fetch(`${baseUrl}/api/auth/profile/image`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch (err) {
    throw new Error(`Invalid server response: Not valid JSON - ${text}`);
  }

  if (!response.ok) {
    throw new Error(data.msg || `HTTP error! Status: ${response.status}`);
  }

  return { data };
};