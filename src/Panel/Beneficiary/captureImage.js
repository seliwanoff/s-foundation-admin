import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const CaptureImagePage = () => {
  const [image, setImage] = useState(null);
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [isCameraStarted, setIsCameraStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFrontCamera, setIsFrontCamera] = useState(false); // Default to back camera
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state; // Get form data from the state

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: isFrontCamera ? "user" : "environment", // Toggle between user and environment
          },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
        alert(
          "Could not access the camera. Please grant permission to use it."
        );
      }
    };

    if (isCameraStarted) {
      startCamera();
    }
  }, [isCameraStarted, isFrontCamera]); // Restart camera when toggling or starting

  const captureImage = () => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        // Convert canvas to Blob (binary data) instead of base64
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "captured-image.jpg", {
              type: "image/jpeg",
            });
            setImage(file);
          }
        }, "image/jpeg");

        setIsCameraVisible(false); // Hide the camera after capture
      }
    }
  };

  const handleRetake = () => {
    setImage(null);
    setIsCameraVisible(true);
  };

  const handleSubmit = async () => {
    if (image && formData) {
      setIsLoading(true);
      try {
        const formDataWithImage = new FormData();
        formDataWithImage.append("image", image, image.name);
        Object.keys(formData).forEach((key) => {
          formDataWithImage.append(key, formData[key]);
        });

        const response = await axios({
          url: "https://zakariyahfoundation.com.ng/api/api/admin/create-user", // Replace with your actual endpoint
          method: "POST",
          data: formDataWithImage,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        alert("Beneficiary submitted successfully!");
        navigate("/panel/beneficiaries");
      } catch (error) {
        console.error("Error submitting image:", error);
        alert("An error occurred while submitting the image.");
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("No image captured. Please capture an image before submitting.");
    }
  };

  return (
    <div className="p-8 flex flex-col items-center bg-white m-4 rounded-md">
      <h2 className="text-xl font-semibold mb-4">Capture Image</h2>

      <div className="mb-4">
        {!isCameraStarted && (
          <button
            onClick={() => setIsCameraStarted(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-md font-bold font-Inter ml-6 mb-5"
          >
            Start Camera
          </button>
        )}

        <video
          ref={videoRef}
          width="100%"
          height="auto"
          autoPlay
          muted
          className="border-2 border-gray-300 h-[200px] w-[200px] rounded-full"
        />
      </div>

      <div className="mb-4">
        <canvas ref={canvasRef} width="640" height="480" className="hidden" />
      </div>

      <div>
        {!image ? (
          <div className="flex gap-4 xl:flex-wrap flex-nowrap justify-center items-center">
            <button
              onClick={captureImage}
              className="bg-blue-500 text-white px-4 py-2 rounded-md font-bold font-Inter mr-4"
            >
              Capture Image
            </button>
            <button
              onClick={() => setIsFrontCamera(!isFrontCamera)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md font-bold font-Inter"
            >
              Switch to {isFrontCamera ? "Back" : "Front"} Camera
            </button>
          </div>
        ) : (
          <div className="mt-4">
            <button
              onClick={handleRetake}
              className="bg-gray-500 text-white px-4 py-2 rounded-md font-bold font-Inter"
            >
              Retake
            </button>
          </div>
        )}
      </div>

      {image && (
        <div className="mt-4">
          <img
            src={URL.createObjectURL(image)}
            alt="Captured"
            className="w-48 h-48 object-cover"
          />
        </div>
      )}

      <div className="mt-4">
        <button
          onClick={handleSubmit}
          className="bg-[#0d0c22] text-white px-4 py-2 rounded-md font-bold font-Inter"
        >
          {isLoading ? "Submitting" : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default CaptureImagePage;
