import { useState } from "react";
import Sidebar from "../components/Sidebar";

const ProfilePage = () => {
  const [user, setUser] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@email.com",
    phone: "+1-555-0123",
    role: "Job Seeker",
    country: "India",
    cityState: "Kolkata, West Bengal",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format",
    profileCompletion: 85,
    lastUpdated: "2 days ago",
    memberSince: "Jan 2024",
    emailVerified: true
  });

  const [isEditing, setIsEditing] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleEdit = (section) => {
    setIsEditing(section);
    setEditForm(user);
    setMessage({ type: '', text: '' });
  };

  const handleCancelEdit = () => {
    setIsEditing(null);
    setEditForm({});
    setMessage({ type: '', text: '' });
  };

  const handleSaveEdit = async (section) => {
    setIsLoading(true);
    setMessage({ type: '', text: '' });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser(prev => ({
        ...prev,
        ...editForm,
        lastUpdated: "Just now",
        profileCompletion: calculateProfileCompletion({ ...prev, ...editForm })
      }));
      
      setMessage({ type: 'success', text: `${section} updated successfully!` });
      setIsEditing(null);
      setEditForm({});
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch {
      setMessage({ type: 'error', text: 'Failed to update. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUser(prev => ({ ...prev, profileImage: e.target.result }));
        setMessage({ type: 'success', text: 'Profile image updated!' });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateProfileCompletion = (userData) => {
    let completion = 0;
    const fields = ['firstName', 'lastName', 'email', 'phone', 'country', 'cityState'];
    
    fields.forEach(field => {
      if (userData[field] && userData[field].trim() !== '') completion += 100/fields.length;
    });
    
    if (userData.profileImage && !userData.profileImage.includes('placeholder')) completion += 10;
    
    return Math.min(Math.round(completion), 100);
  };

  const handleResendVerification = () => {
    setIsLoading(true);
    setTimeout(() => {
      setMessage({ type: 'success', text: 'Verification email sent!' });
      setIsLoading(false);
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/20">
      <Sidebar />
      <div className="flex-1 p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          {message.text && (
            <div className={`mb-6 p-4 rounded-xl border ${
              message.type === 'success' 
                ? 'bg-green-50 border-green-200 text-green-800' 
                : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              {message.text}
            </div>
          )}
          <div className="mb-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent">
              Account Settings
            </h1>
            <p className="text-gray-500 mt-1">Manage your profile and preferences</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <img
                      src={user.profileImage}
                      alt="Profile"
                      className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg"
                    />
                    <label htmlFor="imageUpload" className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </label>
                    <input
                      id="imageUpload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    {user.emailVerified && (
                      <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{user.firstName} {user.lastName}</h3>
                  <p className="text-gray-600 mb-4">{user.role}</p>
                  <button
                    onClick={() => handleEdit("profile")}
                    className="cursor-pointer w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2.5 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span>Edit Profile</span>
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-xs font-medium">Profile Completion</p>
                      <p className="text-xl font-bold mt-1">{user.profileCompletion}%</p>
                    </div>
                    <div className="w-10 h-10 bg-blue-400/20 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="w-full bg-blue-400/30 rounded-full h-2 mt-3">
                    <div 
                      className="bg-white h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${user.profileCompletion}%` }}
                    ></div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Last Updated</p>
                      <p className="text-gray-900 font-semibold text-sm">{user.lastUpdated}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Member Since</p>
                      <p className="text-gray-900 font-semibold text-sm">{user.memberSince}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Personal Information</span>
                  </h2>
                  {isEditing === 'personal' ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSaveEdit('personal')}
                        disabled={isLoading}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 flex items-center space-x-2"
                      >
                        {isLoading ? (
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                        <span>Save</span>
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="cursor-pointer bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEdit("personal")}
                      className="cursor-pointer text-gray-400 hover:text-blue-500 transition-colors duration-200 p-2 rounded-lg hover:bg-blue-50"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['firstName', 'lastName', 'email', 'phone'].map((field) => (
                    <div key={field} className="space-y-1">
                      <label className="text-gray-500 text-sm font-medium capitalize">
                        {field.replace(/([A-Z])/g, ' $1')}
                      </label>
                      {isEditing === 'personal' ? (
                        <input
                          type={field === 'email' ? 'email' : 'text'}
                          value={editForm[field] || ''}
                          onChange={(e) => handleInputChange(field, e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 font-semibold">
                          {user[field]}
                          {field === 'email' && user.emailVerified && (
                            <span className="text-green-500 text-xs bg-green-50 px-2 py-1 rounded-full ml-2">Verified</span>
                          )}
                        </p>
                      )}
                    </div>
                  ))}             
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-gray-500 text-sm font-medium mr-2">Role</label>
                    {isEditing === 'personal' ? (
                      <select
                        value={editForm.role || ''}
                        onChange={(e) => handleInputChange('role', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Job Seeker">Job Seeker</option>
                        <option value="Employer">Employer</option>
                        <option value="Recruiter">Recruiter</option>
                      </select>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 ml-2cursor-pointer  rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {user.role}
                      </span>
                    )}
                  </div>
                  {!user.emailVerified && (
                    <div className="md:col-span-2">
                      <button
                        onClick={handleResendVerification}
                        disabled={isLoading}
                        className="cursor-pointer text-blue-500 hover:text-blue-700 text-sm flex items-center space-x-1"
                      >
                        <span>Resend verification email</span>
                        {isLoading && (
                          <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                          </svg>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Address</span>
                  </h2>
                  {isEditing === 'address' ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSaveEdit('address')}
                        disabled={isLoading}
                        className="cursor-pointer bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 flex items-center space-x-2"
                      >
                        {isLoading ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="cursor-pointer bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEdit("address")}
                      className="cursor-pointer text-gray-400 hover:text-blue-500 transition-colors duration-200 p-2 rounded-lg hover:bg-blue-50"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['country', 'cityState'].map((field) => (
                    <div key={field} className="space-y-1">
                      <label className="text-gray-500 text-sm font-medium capitalize">
                        {field === 'cityState' ? 'City/State' : field}
                      </label>
                      {isEditing === 'address' ? (
                        <input
                          type="text"
                          value={editForm[field] || ''}
                          onChange={(e) => handleInputChange(field, e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 font-semibold">{user[field]}</p>
                      )}
                    </div>
                  ))}
                </div>        
                <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <p className="text-sm">Complete your address details to improve job matching accuracy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;