import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  FileText,
  Clock,
  Sparkles,
  Plus,
  Check,
} from "lucide-react";
import { useAuth } from "../../components/AuthContext";
import Loading from "../../components/Loading";
import axiosInstance from "../../Hooks/axiosInstance";

function AddEvent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { user, userLoading } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    postedById: "",
    date: "",
    location: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title || formData.title.length < 3) {
      newErrors.title = formData.title
        ? "Title must be at least 3 characters"
        : "Event title is required";
    }

    formData.postedById = user._id;

    if (!formData.dateTime) {
      newErrors.dateTime = "Date & time is required";
    } else {
      const selectedDate = new Date(formData.dateTime);
      const now = new Date();
      if (selectedDate <= now) {
        newErrors.dateTime = "Event date must be in the future";
      }
    }

    if (!formData.location || formData.location.length < 5) {
      newErrors.location = formData.location
        ? "Please provide a detailed location"
        : "Event location is required";
    }

    if (!formData.description || formData.description.length < 20) {
      newErrors.description = formData.description
        ? "Description should be at least 20 characters"
        : "Event description is required";
    } else if (formData.description.length > 500) {
      newErrors.description = "Description should not exceed 500 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const eventData = {
      ...formData,
      date: formData.dateTime,
      postedByName: user.name
    };

    try {

      const res = await axiosInstance.post("/api/events",eventData);

      console.log("✅ Event Created:", res.data);
      setIsSubmitted(true);

      setTimeout(() => {
        setFormData({
          title: "",
          postedBy: "",
          dateTime: "",
          location: "",
          description: "",
        });
        setErrors({});
        setIsSubmitted(false);
      }, 2000);
    } catch (error) {
      console.error(
        "❌ Error creating event:",
        error.response?.data || error.message
      );
      setErrors({
        api: error.response?.data?.message || "Something went wrong!",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl shadow-lg border border-emerald-200 text-center">
          <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-emerald-700 mb-2">
            Event Created Successfully! 🎉
          </h3>
          <p className="text-emerald-600">
            Your event has been added and is ready for attendees.
          </p>
        </div>
      </div>
    );
  }

  if (userLoading) {
    return <Loading />;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl mb-4 shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-3">
            Create Amazing Event
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Bring people together with memorable experiences. Fill out the
            details below to create your event.
          </p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Plus className="w-6 h-6" />
              Event Details
            </h2>
          </div>

          <div className="p-8 space-y-8">
            <div className="group">
              <label className="flex items-center gap-2 font-semibold text-gray-700 mb-3">
                <FileText className="w-5 h-5 text-teal-500" />
                Event Title
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full p-4 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-teal-100 ${
                  errors.title
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-200 focus:border-teal-400 group-hover:border-gray-300"
                }`}
                placeholder="Enter an exciting event title..."
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center text-xs">
                    !
                  </span>
                  {errors.title}
                </p>
              )}
            </div>

            <div className="group">
              <label className="flex items-center gap-2 font-semibold text-gray-700 mb-3">
                <Clock className="w-5 h-5 text-purple-500" />
                Date & Time
              </label>
              <input
                type="datetime-local"
                name="dateTime"
                value={formData.dateTime}
                onChange={handleInputChange}
                className={`w-full p-4 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-100 ${
                  errors.dateTime
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-200 focus:border-purple-400 group-hover:border-gray-300"
                }`}
              />
              {errors.dateTime && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center text-xs">
                    !
                  </span>
                  {errors.dateTime}
                </p>
              )}
            </div>

            <div className="group">
              <label className="flex items-center gap-2 font-semibold text-gray-700 mb-3">
                <MapPin className="w-5 h-5 text-green-500" />
                Event Location
              </label>
              <input
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className={`w-full p-4 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-100 ${
                  errors.location
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-200 focus:border-green-400 group-hover:border-gray-300"
                }`}
                placeholder="Where will this amazing event take place?"
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center text-xs">
                    !
                  </span>
                  {errors.location}
                </p>
              )}
            </div>

            <div className="group">
              <label className="flex items-center gap-2 font-semibold text-gray-700 mb-3">
                <FileText className="w-5 h-5 text-orange-500" />
                Event Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className={`w-full p-4 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-100 resize-none ${
                  errors.description
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-200 focus:border-orange-400 group-hover:border-gray-300"
                }`}
                rows="5"
                placeholder="Describe your event in detail. What makes it special? What should attendees expect?"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center text-xs">
                    !
                  </span>
                  {errors.description}
                </p>
              )}
            </div>

            <div className="pt-6">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white hover:shadow-xl"
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Event...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-3">
                    <Plus className="w-6 h-6" />
                    Create Event
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 text-gray-500">
          <p>
            Ready to bring people together? Create your event and start building
            connections! ✨
          </p>
        </div>
      </div>
    </div>
  );
}

export default AddEvent;