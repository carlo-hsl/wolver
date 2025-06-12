"use client";

import { useState } from "react";

interface PasswordRequirement {
  label: string;
  test: (password: string) => boolean;
}

const passwordRequirements: PasswordRequirement[] = [
  {
    label: "8-20 characters long",
    test: (password) => password.length >= 8 && password.length <= 20,
  },
  {
    label: "Contains at least one uppercase letter",
    test: (password) => /[A-Z]/.test(password),
  },
  {
    label: "Contains at least one lowercase letter",
    test: (password) => /[a-z]/.test(password),
  },
  {
    label: "Contains at least one number",
    test: (password) => /[0-9]/.test(password),
  },
  {
    label: "Contains at least one special character",
    test: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
  },
];

interface Props {
  onComplete: (password: string) => void;
}

export default function PasswordCreation({ onComplete }: Props) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState<"create" | "confirm">("create");
  const [error, setError] = useState("");

  const meetsAllRequirements = passwordRequirements.every((req) =>
    req.test(password)
  );

  const handleCreatePassword = () => {
    if (!meetsAllRequirements) {
      setError("Please meet all password requirements");
      return;
    }
    setStep("confirm");
    setError("");
  };

  const handleConfirmPassword = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    onComplete(password);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">
        {step === "create" ? "Create Password" : "Confirm Password"}
      </h2>

      {step === "create" ? (
        <>
          <div>
            <label className="block mb-2">Password</label>
            <input
              type="password"
              className="w-full p-3 rounded-lg bg-[#2b2b2b] border border-gray-700 focus:border-[#FC7E10] focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-400">Password Requirements:</p>
            {passwordRequirements.map((req, index) => (
              <div
                key={index}
                className={`flex items-center text-sm ${
                  req.test(password) ? "text-green-500" : "text-gray-400"
                }`}
              >
                <span className="mr-2">
                  {req.test(password) ? "✓" : "○"}
                </span>
                {req.label}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>
          <label className="block mb-2">Confirm Password</label>
          <input
            type="password"
            className="w-full p-3 rounded-lg bg-[#2b2b2b] border border-gray-700 focus:border-[#FC7E10] focus:outline-none"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      )}

      {error && (
        <div className="p-3 rounded bg-red-500/10 text-red-500 text-sm">
          {error}
        </div>
      )}

      <button
        className="w-full py-3 px-4 bg-[#FC7E10] hover:bg-[#e67200] rounded-lg font-medium transition-colors"
        onClick={step === "create" ? handleCreatePassword : handleConfirmPassword}
      >
        {step === "create" ? "Next" : "Create Account"}
      </button>
    </div>
  );
} 