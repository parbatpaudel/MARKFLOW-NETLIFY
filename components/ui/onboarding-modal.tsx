"use client"

import { useMemo, useState } from "react"
import { Button } from "./button"
import { Input } from "./input"

interface OnboardingModalProps {
  isOpen: boolean
  onClose: () => void
}

const steps = [
  { key: "businessName", title: "What's your business name?", helper: "Help us personalize your experience" },
  { key: "industry", title: "Which industry are you in?", helper: "This helps us tailor recommendations" },
  { key: "discovery", title: "Where did you hear about us?", helper: "We use this to improve our outreach" },
  { key: "experience", title: "Years of business experience", helper: "So we can match the guidance level" },
]

const OnboardingModal = ({ isOpen, onClose }: OnboardingModalProps) => {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    businessName: "",
    industry: "",
    discovery: "",
    otherSource: "",
    experience: "",
  });
  const [showOtherInput, setShowOtherInput] = useState(false);

  const progress = useMemo(() => ((step + 1) / steps.length) * 100, [step])

  if (!isOpen) return null

  const current = steps[step]

  const handleFinish = async () => {
    const sid = typeof window !== 'undefined' ? (localStorage.getItem('chatSessionId') || 'onboarding_' + Date.now()) : 'onboarding_' + Date.now()
    const payload = {
      sessionId: sid,
      businessName: form.businessName,
      industry: form.industry,
      discovery: form.discovery,
      otherSource: form.otherSource,
      experience: form.experience,
    }
    try {
      await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    } catch {}
    try {
      const { otherSource, ...formData } = form;
      localStorage.setItem("marketflow_onboarding", JSON.stringify({ 
        done: true, 
        ...formData,
        ...(form.discovery.startsWith("Other") && { 
          discovery: form.discovery,
          otherSource: form.otherSource 
        })
      }));
    } catch {}
    onClose();
  };

  const handleOptionSelect = (value: string) => {
    if (current.key === 'experience') {
      setForm(prev => ({ ...prev, experience: value }));
      // Add a small delay before finishing to show the selection
      setTimeout(handleFinish, 300);
    } else {
      setForm(prev => ({ ...prev, [current.key]: value }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[95vh] sm:max-h-[90vh] overflow-y-auto border border-blue-100 mx-2 sm:mx-4 my-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100">
          <div className="w-full">
            <h2 className="text-lg font-semibold text-gray-900">
              Welcome to marketflow
            </h2>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#003459] via-[#007ea7] to-[#00a8e8] h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <span className="text-gray-500">✕</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {current.title}
          </h3>
          <p className="text-gray-600 mb-6">
            {current.helper}
          </p>

          {current.key === "businessName" && (
            <Input
              placeholder="Enter your business name"
              className="w-full"
              value={form.businessName}
              onChange={(e: any) => setForm({ ...form, businessName: e.target.value })}
            />
          )}

          {current.key === "industry" && (
            <Input
              placeholder="e.g., Retail, SaaS, Healthcare"
              className="w-full"
              value={form.industry}
              onChange={(e: any) => setForm({ ...form, industry: e.target.value })}
            />
          )}

          {current.key === "discovery" && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 gap-2 sm:gap-3">
                {["Google", "YouTube", "LinkedIn", "Referral"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setForm(prev => ({
                        ...prev,
                        discovery: opt,
                        otherSource: ""
                      }));
                      setShowOtherInput(false);
                    }}
                    className={`px-3 sm:px-4 py-2 sm:py-3 rounded-xl border transition-all text-left text-sm sm:text-base ${
                      form.discovery === opt && !showOtherInput
                        ? "border-[#007ea7] bg-[#00a8e8]/5 text-[#003459]"
                        : "border-gray-200 hover:border-[#00a8e8]/50 hover:bg-slate-50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
                
                {/* Separate handling for Other option */}
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setForm(prev => ({
                        ...prev,
                        discovery: prev.otherSource || "Other"
                      }));
                      setShowOtherInput(true);
                    }}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border transition-all text-left text-sm sm:text-base ${
                      showOtherInput || form.discovery.startsWith("Other") || 
                      (form.discovery && !["Google", "YouTube", "LinkedIn", "Referral"].includes(form.discovery))
                        ? "border-[#007ea7] bg-[#00a8e8]/5 text-[#003459]"
                        : "border-gray-200 hover:border-[#00a8e8]/50 hover:bg-slate-50"
                    }`}
                  >
                    Other
                  </button>
                  
                  {showOtherInput && (
                    <div className="pl-0 sm:pl-2 mt-2">
                      <Input
                        type="text"
                        placeholder="Please specify where you heard about us..."
                        className="w-full text-base"
                        value={form.otherSource}
                        autoFocus
                        onFocus={(e) => e.stopPropagation()}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => {
                          const value = e.target.value;
                          setForm(prev => ({
                            ...prev,
                            otherSource: value,
                            discovery: value || "Other"
                          }));
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {current.key === "experience" && (
            <div className="grid grid-cols-2 gap-3">
              {["0-1", "2-3", "4-6", "7+"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleOptionSelect(opt)}
                  className={`px-3 sm:px-4 py-2 sm:py-3 rounded-xl border transition-all text-sm sm:text-base ${
                    form.experience === opt
                      ? "border-[#007ea7] bg-[#00a8e8]/5 text-[#003459]"
                      : "border-gray-200 hover:border-[#00a8e8]/50 hover:bg-slate-50"
                  }`}
                >
                  {opt} years
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-6 border-t border-gray-100 bg-gray-50">
          <Button
            variant="ghost"
            onClick={onClose}
            className="w-full sm:w-auto text-center"
          >
            Maybe Later
          </Button>
          <div className="flex flex-col sm:flex-row w-full sm:w-auto items-stretch sm:items-center gap-3">
            {step > 0 && (
              <Button
                variant="outline"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
              >
                Back
              </Button>
            )}
            {step < steps.length - 1 ? (
              <Button
                onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleFinish}
                className="bg-gradient-to-r from-[#003459] to-[#007ea7] text-white hover:from-[#00171f] hover:to-[#003459] w-full sm:w-auto"
              >
                Finish
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardingModal
