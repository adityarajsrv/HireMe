/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from "react";
import Sidebar from "../components/Sidebar";
import {
  getProfile,
  updateProfile,
  uploadProfileImage,
  deleteProfileImage,
} from "../api/userApi";
import { RiUser3Line } from "@remixicon/react";
import debounce from "lodash.debounce";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [completion, setCompletion] = useState(0);
  const [errors, setErrors] = useState({});
  const [imageError, setImageError] = useState(false);

  // Calculate profile completion percentage
  const calcCompletion = useCallback((u) => {
    const fieldWeights = {
      firstName: 15,
      lastName: 15,
      email: 20,
      phone: 10,
      role: 10,
      country: 10,
      city: 10,
      profileImage: 10,
    };

    let totalWeight = Object.values(fieldWeights).reduce((a, b) => a + b, 0);
    let completedWeight = 0;

    Object.keys(fieldWeights).forEach((field) => {
      if (u?.[field] && u[field].toString().trim() !== "") {
        completedWeight += fieldWeights[field];
      }
    });

    setCompletion(Math.round((completedWeight / totalWeight) * 100));
  }, []);

  // Field validation function
  const validateField = (field, value) => {
    const validations = {
      email: (val) =>
        !val
          ? "Email is required"
          : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
          ? "Invalid email format"
          : "",
      phone: (val) =>
        val && !/^[+]?[1-9][\d]{0,15}$/.test(val.replace(/[\s\-()]/g, ""))
          ? "Invalid phone number"
          : "",
      firstName: (val) =>
        !val
          ? "First name is required"
          : val.trim().length < 2
          ? "First name must be at least 2 characters"
          : "",
      lastName: (val) =>
        !val
          ? "Last name is required"
          : val.trim().length < 2
          ? "Last name must be at least 2 characters"
          : "",
      country: (val) => (!val ? "Country is required" : ""),
      city: (val) => (!val ? "City is required" : ""),
      role: (val) => (!val ? "Role is required" : ""),
    };
    return validations[field] ? validations[field](value) : "";
  };

  // Form validation function
  const validateForm = (formData, fields) => {
    const newErrors = {};
    fields.forEach((field) => {
      const error = validateField(field, formData[field] || "");
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Fetch user profile
  const fetchProfile = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage({ type: "error", text: "Please log in to view your profile" });
      return;
    }

    try {
      const res = await getProfile(token);
      const userData = {
        ...res.data,
        firstName: res.data.firstName || "",
        lastName: res.data.lastName || "",
        phone: res.data.phone || "",
        email: res.data.email || "",
        role: res.data.role || "",
        country: res.data.country || "",
        city: res.data.city || "",
        profileImage: res.data.profileImage || null,
      };
      setUser(userData);
      calcCompletion(userData);
      localStorage.setItem("userData", JSON.stringify(userData));
      window.dispatchEvent(
        new CustomEvent("profileUpdated", {
          detail: { user: userData },
        })
      );
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.msg || "Failed to load profile",
      });
    }
  }, [calcCompletion]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Debounced validation handler
  const debouncedValidate = useCallback(
    debounce((field, value) => {
      const error = validateField(field, value);
      setErrors((prev) => ({
        ...prev,
        [field]: error,
      }));
    }, 100),
    []
  );

  // Immediate input change handler
  const handleInputChange = (field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
    debouncedValidate(field, value);
  };

  const handleEdit = (section) => {
    setIsEditing(section);
    setEditForm({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      role: user?.role || "",
      country: user?.country || "",
      city: user?.city || "",
    });
    setErrors({});
    setMessage({ type: "", text: "" });
  };

  const handleCancelEdit = () => {
    setIsEditing(null);
    setEditForm({});
    setErrors({});
    debouncedValidate.cancel(); // Cancel pending validations
  };

  const handleSaveEdit = async (section) => {
    const fieldMap = {
      personal: ["firstName", "lastName", "email", "phone", "role"],
      address: ["country", "city"],
    };

    const fieldsToValidate = fieldMap[section];

    if (!validateForm(editForm, fieldsToValidate)) {
      setMessage({
        type: "error",
        text: "Please correct the errors in the form before saving.",
      });
      return;
    }

    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const token = localStorage.getItem("token");
      const payload = fieldsToValidate.reduce((obj, field) => {
        obj[field] = editForm[field] || "";
        return obj;
      }, {});

      const res = await updateProfile(token, payload);
      const userData = {
        ...user,
        ...res.data,
        firstName: res.data.firstName || editForm.firstName || user.firstName || "",
        lastName: res.data.lastName || editForm.lastName || user.lastName || "",
        phone: res.data.phone || editForm.phone || user.phone || "",
        email: res.data.email || editForm.email || user.email || "",
        role: res.data.role || editForm.role || user.role || "",
        country: res.data.country || editForm.country || user.country || "",
        city: res.data.city || editForm.city || user.city || "",
      };

      setUser(userData);
      calcCompletion(userData);
      localStorage.setItem("userData", JSON.stringify(userData));
      setMessage({
        type: "success",
        text: `${
          section.charAt(0).toUpperCase() + section.slice(1)
        } information updated successfully!`,
      });
      setIsEditing(null);
      setEditForm({});
      setErrors({});

      window.dispatchEvent(
        new CustomEvent("profileUpdated", {
          detail: { user: userData },
        })
      );
    } catch (err) {
      setMessage({
        type: "error",
        text:
          err.response?.data?.msg ||
          `Failed to update ${section} information. Please try again.`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      setMessage({
        type: "error",
        text: "Please select a valid image file (JPEG, PNG, GIF, WebP)",
      });
      return;
    }

    if (file.size > maxSize) {
      setMessage({ type: "error", text: "Image size must be less than 5MB" });
      return;
    }

    setImageUploading(true);
    setMessage({ type: "", text: "" });
    window.dispatchEvent(new CustomEvent("profileImageUploadStart"));

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("profileImage", file);

      const res = await uploadProfileImage(token, formData);
      const updatedUser = {
        ...user,
        ...res.data,
        firstName: res.data.firstName || user.firstName || "",
        lastName: res.data.lastName || user.lastName || "",
        phone: res.data.phone || user.phone || "",
      };
      setUser(updatedUser);
      setImageError(false);
      calcCompletion(updatedUser);
      localStorage.setItem("userData", JSON.stringify(updatedUser));
      setMessage({
        type: "success",
        text: "Profile image updated successfully!",
      });

      window.dispatchEvent(
        new CustomEvent("profileImageUploadComplete", {
          detail: { user: updatedUser },
        })
      );
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.msg || "Image upload failed",
      });
      window.dispatchEvent(new CustomEvent("profileImageUploadError"));
    } finally {
      setImageUploading(false);
      e.target.value = "";
    }
  };

  const handleDeleteImage = async () => {
    if (!window.confirm("Are you sure you want to remove your profile image?")) {
      return;
    }

    setImageUploading(true);
    window.dispatchEvent(new CustomEvent("profileImageUploadStart"));

    try {
      const token = localStorage.getItem("token");
      const res = await deleteProfileImage(token);
      const updatedUser = {
        ...user,
        ...res.data.user,
        firstName: res.data.user.firstName || user.firstName || "",
        lastName: res.data.user.lastName || user.lastName || "",
        phone: res.data.user.phone || user.phone || "",
        profileImage: null,
      };
      setUser(updatedUser);
      setImageError(false);
      calcCompletion(updatedUser);
      localStorage.setItem("userData", JSON.stringify(updatedUser));
      setMessage({
        type: "success",
        text: "Profile image removed successfully!",
      });

      window.dispatchEvent(
        new CustomEvent("profileImageUploadComplete", {
          detail: { user: updatedUser },
        })
      );
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.msg || "Failed to remove profile image",
      });
      window.dispatchEvent(new CustomEvent("profileImageUploadError"));
    } finally {
      setImageUploading(false);
    }
  };

  const handleProfileImageError = () => {
    setImageError(true);
  };

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message.text]);

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/20">
      <Sidebar />
      <div className="flex-1 p-6 lg:p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {message.text && (
            <div
              className={`p-4 rounded-xl border ${
                message.type === "success"
                  ? "bg-green-50 border-green-200 text-green-800"
                  : "bg-red-50 border-red-200 text-red-800"
              } animate-fade-in`}
            >
              <div className="flex items-center justify-between">
                <span>{message.text}</span>
                <button
                  onClick={() => setMessage({ type: "", text: "" })}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent">
              Account Settings
            </h1>
            <p className="text-gray-500">Manage your profile and preferences</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-700">
                Profile Completion: {completion}%
              </p>
              {completion < 100 && (
                <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
                  Complete your profile for better experience
                </span>
              )}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 relative">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${
                  completion === 100 ? "bg-green-500" : "bg-blue-500"
                }`}
                style={{ width: `${completion}%` }}
              ></div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border p-6 text-center sticky top-6">
                <div className="relative mb-4 inline-block">
                  <div className="relative">
                    {user.profileImage && !imageError ? (
                      <img
                        src={user.profileImage}
                        alt="Profile"
                        className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-md mx-auto"
                        onError={handleProfileImageError}
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-2xl border-4 border-white shadow-md mx-auto bg-gray-100 flex items-center justify-center">
                        <RiUser3Line size={40} className="text-gray-400" />
                      </div>
                    )}
                    {imageUploading && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      </div>
                    )}
                  </div>
                  <label
                    htmlFor="imageUpload"
                    className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors"
                    title="Upload new photo"
                  >
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </label>
                  {user.profileImage && !imageError && (
                    <button
                      onClick={handleDeleteImage}
                      className="absolute -bottom-1 -left-1 w-8 h-8 bg-red-500 rounded-full border-2 border-white flex items-center justify-center cursor-pointer hover:bg-red-600 transition-colors"
                      title="Remove photo"
                      disabled={imageUploading}
                    >
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  )}
                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={imageUploading}
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {user.firstName || user.lastName
                    ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
                    : "User"}
                </h3>
                <p className="text-gray-600 mb-4">{user.role || "Not provided"}</p>
                <p className="text-sm text-gray-500 mb-4">
                  Member since {new Date(user.createdAt).toLocaleDateString()}
                </p>
                <button
                  onClick={() => handleEdit("personal")}
                  disabled={isEditing}
                  className="w-full bg-blue-500 text-white px-4 py-2.5 rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md"
                >
                  Edit Profile
                </button>
              </div>
            </div>
            <div className="lg:col-span-2 space-y-6">
              <SectionCard
                title="Personal Information"
                fields={["firstName", "lastName", "email", "phone"]}
                role
                user={user}
                isEditing={isEditing === "personal"}
                editForm={editForm}
                errors={errors}
                handleInputChange={handleInputChange}
                onEdit={() => handleEdit("personal")}
                onCancel={handleCancelEdit}
                onSave={() => handleSaveEdit("personal")}
                isLoading={isLoading}
                validateField={validateField}
              />
              <SectionCard
                title="Address Information"
                fields={["country", "city"]}
                user={user}
                isEditing={isEditing === "address"}
                editForm={editForm}
                errors={errors}
                handleInputChange={handleInputChange}
                onEdit={() => handleEdit("address")}
                onCancel={handleCancelEdit}
                onSave={() => handleSaveEdit("address")}
                isLoading={isLoading}
                validateField={validateField}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SectionCard = ({
  title,
  fields,
  role,
  user,
  isEditing,
  editForm,
  errors,
  handleInputChange,
  onEdit,
  onCancel,
  onSave,
  isLoading,
  validateField,
}) => {
  const isFormValid = () => {
    return fields.every(
      (field) => !validateField(field, editForm[field] || "")
    );
  };

  const getPlaceholderText = (field) => {
    if (field === "city") return "Enter your city";
    const words = field.replace(/([A-Z])/g, " $1");
    const formattedField = words.charAt(0).toUpperCase() + words.slice(1);
    return `Enter your ${formattedField.toLowerCase()}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        {isEditing ? (
          <div className="flex space-x-2">
            <button
              onClick={onSave}
              disabled={isLoading || !isFormValid()}
              className="bg-green-500 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </span>
              ) : (
                "Save Changes"
              )}
            </button>
            <button
              onClick={onCancel}
              disabled={isLoading}
              className="bg-gray-300 cursor-pointer text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 disabled:opacity-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={onEdit}
            className="text-blue-600 cursor-pointer hover:text-blue-800 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors font-medium"
          >
            Edit
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map((field) => (
          <div key={field} className="space-y-2">
            <label className="text-gray-700 text-sm font-medium capitalize block">
              {field.replace(/([A-Z])/g, " $1").trim()}
              {["firstName", "lastName", "email", "country", "city"].includes(field) && (
                <span className="text-red-500"> *</span>
              )}
            </label>
            {isEditing ? (
              <div>
                <input
                  type={field === "email" ? "email" : "text"}
                  value={editForm[field] || ""}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors[field] ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder={getPlaceholderText(field)}
                />
                {errors[field] && (
                  <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
                )}
              </div>
            ) : (
              <p className="text-gray-900 font-semibold p-3 bg-gray-50 rounded-lg">
                {user[field] || (
                  <span className="text-gray-400 italic">Not provided</span>
                )}
              </p>
            )}
          </div>
        ))}
        {role && (
          <div className="md:col-span-2 space-y-2">
            <label className="text-gray-700 text-sm font-medium block">
              Role <span className="text-red-500">*</span>
            </label>
            {isEditing ? (
              <select
                value={editForm.role || ""}
                onChange={(e) => handleInputChange("role", e.target.value)}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.role ? "border-red-300" : "border-gray-300"
                }`}
              >
                <option value="">Select your role</option>
                <option value="Job Seeker">Job Seeker</option>
                <option value="Recruiter">Recruiter</option>
              </select>
            ) : (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {user.role || "Not provided"}
              </span>
            )}
            {errors.role && (
              <p className="text-red-500 text-xs mt-1">{errors.role}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;