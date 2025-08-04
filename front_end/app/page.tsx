"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { toast } from "sonner";

interface FormData {
  age: string;
  sex: string;
  cp: string;
  trestbps: string;
  chol: string;
  fbs: string;
  restecg: string;
  thalach: string;
  exang: string;
  oldpeak: string;
  slope: string;
  ca: string;
  thal: string;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    age: "",
    sex: "",
    cp: "",
    trestbps: "",
    chol: "",
    fbs: "",
    restecg: "",
    thalach: "",
    exang: "",
    oldpeak: "",
    slope: "",
    ca: "",
    thal: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [output, setOutput] = useState<number | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    for (const key in formData) {
      const val = Number(formData[key as keyof FormData]);
      if (!isNaN(val) && val < 0) {
        alert(`Field "${key}" cannot be negative`);
        return;
      }
    }

    try {
      setIsLoading(true);
      const res = await fetch("heart-disease-predictor-production.up.railway.app/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      setOutput(result.prediction);
      toast.success(`Prediction Done ✅`);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
      setFormData({
        age: "",
        sex: "",
        cp: "",
        trestbps: "",
        chol: "",
        fbs: "",
        restecg: "",
        thalach: "",
        exang: "",
        oldpeak: "",
        slope: "",
        ca: "",
        thal: "",
      });
    }
  };

  return (
    <div className=" w-screen border-x border-neutral-200 dark:border-neutral-900 mx-auto max-w-3xl py-10">
      <h1
        className=" max-w-3xl text-4xl font-bold text-center font-mono tracking-tight bg-blend-normal leading-tight
   bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-neutral-200 "
      >
        Heart Disease Predictor
      </h1>
      <p className=" text-center text-md mb-6 text-neutral-400 font-mono ">
        Please fill your data to check heart disease
      </p>
      <div className=" w-full flex px-10 py-10 items-center ">
        <form
          onSubmit={handleSubmit}
          method="POST"
          className=" w-full space-y-6 text-neutral-800 dark:text-neutral-200 "
        >
          <div className="w-full flex gap-3 items-center justify-center">
            <label
              htmlFor="age"
              className="text-xl w-1/8 font-semibold mr-auto"
            >
              1. Age:
            </label>
            <input
              type="number"
              name="age"
              min="0"
              max="300"
              value={formData.age}
              onChange={handleChange}
              required
              disabled={isLoading}
              placeholder="Enter your age"
              className="flex-1 focus:outline-none focus:ring border border-neutral-400 rounded-md text-lg py-1 px-2"
            />
          </div>
          <div className="w-full flex gap-14">
            <label htmlFor="sex" className="text-xl font-semibold">
              2. Sex:
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sex"
                  value="1"
                  disabled={isLoading}
                  checked={formData.sex === "1"}
                  onChange={handleChange}
                  required
                  className="accent-blue-500 cursor-pointer"
                />
                <span className="text-lg">Male</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sex"
                  value="0"
                  disabled={isLoading}
                  checked={formData.sex === "0"}
                  onChange={handleChange}
                  className="accent-pink-500 cursor-pointer"
                />
                <span className="text-lg">Female</span>
              </label>
            </div>
          </div>
          <div className="w-full ">
            <label htmlFor="cp" className="block text-xl font-semibold mb-2">
              3. Chest Pain Type (cp):
            </label>
            <select
              id="cp"
              name="cp"
              value={formData.cp}
              disabled={isLoading}
              onChange={handleChange}
              className="w-full border outline-none focus:ring border-neutral-400 rounded-md text-lg py-2 px-3"
            >
              <option value="0">0 - Typical Angina</option>
              <option value="1">1 - Atypical Angina</option>
              <option value="2">2 - Non-anginal Pain</option>
              <option value="3">3 - Asymptomatic</option>
            </select>
          </div>
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="trestbps" className="text-lg font-semibold">
              4. Resting Blood Pressure (trestbps) (80-200) :
            </label>
            <input
              type="number"
              id="trestbps"
              name="trestbps"
              min="80"
              max="200"
              disabled={isLoading}
              value={formData.trestbps}
              onChange={handleChange}
              placeholder="Enter resting blood pressure in mm Hg"
              className="focus:outline-none focus:ring border border-neutral-400 rounded-md px-3 py-2 text-base "
              required
            />
          </div>
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="chol" className="text-lg font-semibold">
              5. Serum Cholesterol (chol) (100-600):
            </label>
            <input
              type="number"
              id="chol"
              name="chol"
              min="100"
              max="600"
              disabled={isLoading}
              value={formData.chol}
              onChange={handleChange}
              placeholder="Enter serum cholesterol in mg/dl"
              className="focus:outline-none focus:ring border border-neutral-400 rounded-md px-3 py-2 text-base"
              required
            />
          </div>
          <div className="w-full flex gap-14 items-center">
            <label htmlFor="fbs" className="text-xl font-semibold">
              6. Fasting Blood Sugar &#x276F; 120 mg/dl (fbs):
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="fbs"
                  value="1"
                  required
                  disabled={isLoading}
                  checked={formData.fbs === "1"}
                  onChange={handleChange}
                  className="accent-blue-500 cursor-pointer"
                />
                <span className="text-lg">Yes</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="fbs"
                  value="0"
                  disabled={isLoading}
                  checked={formData.fbs === "0"}
                  onChange={handleChange}
                  className="accent-red-500 cursor-pointer"
                />
                <span className="text-lg">No</span>
              </label>
            </div>
          </div>
          <div className="mb-2">
            <label
              htmlFor="restecg"
              className="block text-xl font-semibold mb-2"
            >
              7. Resting Electrocardiographic Results (restecg):
            </label>
            <select
              id="restecg"
              name="restecg"
              value={formData.restecg}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="w-full border outline-none focus:ring border-neutral-400 rounded-md text-lg py-2 px-3"
            >
              <option value="0">0 - Normal</option>
              <option value="1">1 - Having ST-T wave abnormality</option>
              <option value="2">
                2 - Showing probable or definite left ventricular hypertrophy
              </option>
            </select>
          </div>
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="thalach" className="text-lg font-semibold">
              8. Maximum Heart Rate Achieved (thalach) (60-250):
            </label>
            <input
              type="number"
              id="thalach"
              name="thalach"
              min="60"
              max="250"
              disabled={isLoading}
              value={formData.thalach}
              onChange={handleChange}
              placeholder="Enter max heart rate achieved"
              className="focus:outline-none focus:ring border border-neutral-400 rounded-md px-3 py-2 text-base"
              required
            />
          </div>
          <div className="w-full flex gap-14 items-center">
            <label htmlFor="exang" className="text-xl font-semibold">
              9. Exercise Induced Angina (exang):
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="exang"
                  value="1"
                  required
                  disabled={isLoading}
                  checked={formData.exang === "1"}
                  onChange={handleChange}
                  className="accent-blue-500 cursor-pointer"
                />
                <span className="text-lg">Yes</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="exang"
                  value="0"
                  disabled={isLoading}
                  checked={formData.exang === "0"}
                  onChange={handleChange}
                  className="accent-red-500 cursor-pointer"
                />
                <span className="text-lg">No</span>
              </label>
            </div>
          </div>
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="oldpeak" className="text-lg font-semibold">
              10. ST Depression Induced by Exercise (oldpeak):
            </label>
            <input
              type="number"
              step="0.1"
              id="oldpeak"
              name="oldpeak"
              value={formData.oldpeak}
              onChange={handleChange}
              placeholder="e.g. 1.4"
              className="focus:outline-none focus:ring border border-neutral-400 rounded-md px-3 py-2 text-base"
              required
              disabled={isLoading}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="slope" className="block text-xl font-semibold mb-2">
              11. Slope of the Peak Exercise ST Segment (slope):
            </label>
            <select
              id="slope"
              name="slope"
              value={formData.slope}
              required
              disabled={isLoading}
              onChange={handleChange}
              className="w-full border outline-none focus:ring border-neutral-400 rounded-md text-lg py-2 px-3"
            >
              <option value="0">0 - Upsloping</option>
              <option value="1">1 - Flat</option>
              <option value="2">2 - Downsloping</option>
            </select>
          </div>
          <div className="mb-2">
            <label htmlFor="ca" className="block text-xl font-semibold mb-2">
              12. Major Vessels Colored by Fluoroscopy (ca):
            </label>
            <select
              id="ca"
              name="ca"
              value={formData.ca}
              required
              disabled={isLoading}
              onChange={handleChange}
              className="w-full border outline-none focus:ring border-neutral-400 rounded-md text-lg py-2 px-3"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div className="mb-2">
            <label htmlFor="thal" className="block text-xl font-semibold mb-2">
              13. Thalassemia (thal):
            </label>
            <select
              id="thal"
              name="thal"
              required
              disabled={isLoading}
              value={formData.thal}
              onChange={handleChange}
              className="w-full border outline-none focus:ring border-neutral-400 rounded-md text-lg py-2 px-3"
            >
              <option value="0">0 - Unknown</option>
              <option value="1">1 - Fixed Defect</option>
              <option value="2">2 - Normal</option>
              <option value="3">3 - Reversible Defect</option>
            </select>
          </div>
          <div className="w-full flex justify-center items-center mt-5">
            <button
              type="submit"
              className=" p-2 transition-colors ease-in-out
              dark:hover:bg-neutral-400
              dark:bg-neutral-300
              bg-neutral-800
              hover:bg-neutral-700
               cursor-pointer
                text-xl font-semibold w-1/3 border border-neutral-400 rounded-md "
            >
              {isLoading ? (
                <div className=" w-full flex justify-center items-center gap-6 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className=" text-neutral-200 dark:text-neutral-900 animate-pulse "
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
                    <path d="M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
                  </svg>
                </div>
              ) : (
                <span className="text-transparent bg-gradient-to-b from-neutral-200 to-neutral-300 dark:from-neutral-500 dark:to-neutral-900 bg-clip-text  ">
                  Check
                </span>
              )}
            </button>
          </div>
          <div className=" w-full flex justify-center items-center mt-3 ">
            {output !== null &&
              (output === 0 ? (
                <p className="text-green-600 font-semibold">
                  ✅ Congratulation You Donot Have Heart Disease
                </p>
              ) : (
                <p className="text-red-600 font-semibold">
                  ⚠️ Warning: Possible Heart Disease
                </p>
              ))}{" "}
          </div>
        </form>
      </div>
    </div>
  );
}
