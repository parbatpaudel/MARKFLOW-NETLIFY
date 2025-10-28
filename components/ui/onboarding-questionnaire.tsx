'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Declare Calendly global object for TypeScript
declare global {
  interface Window {
    Calendly: any;
  }
}

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircle2, AlertCircle, ChevronLeft, ChevronRight, Phone, Building, DollarSign, Users, TrendingUp, Mail, Sparkles, Globe, Briefcase, Target, Calendar, MessageSquare, User, MapPin, CreditCard } from 'lucide-react'
import CalendlyModal from '@/components/ui/calendly-modal'

interface FormData {
  country: string
  otherCountry?: string
  countryCode: string
  industry: string
  businessSize: string
  annualRevenue: string
  ebitda: string
  currency: string
  howHeard: string
  otherHowHeard?: string
  email: string
  phone: string
  businessDescription: string
  scheduleMeeting: string
}

interface StepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  nextStep: () => void
  prevStep: () => void
}

interface OnboardingQuestionnaireProps {
  onConsultingPageRedirect?: () => void
  onRestartOnboarding?: () => void
  continueFromCalendly?: boolean
  onClose?: () => void // Add onClose prop for modal
}

// Comprehensive country codes with flags
const countryCodes = [
  { code: '+1', country: 'United States', flag: '🇺🇸' },
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+977', country: 'Nepal', flag: '🇳🇵' },
  { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+1', country: 'Canada', flag: '🇨🇦' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+81', country: 'Japan', flag: '🇯🇵' },
  { code: '+86', country: 'China', flag: '🇨🇳' },
  { code: '+39', country: 'Italy', flag: '🇮🇹' },
  { code: '+34', country: 'Spain', flag: '🇪🇸' },
  { code: '+55', country: 'Brazil', flag: '🇧🇷' },
  { code: '+7', country: 'Russia', flag: '🇷🇺' },
  { code: '+82', country: 'South Korea', flag: '🇰🇷' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
  { code: '+60', country: 'Malaysia', flag: '🇲🇾' },
  { code: '+66', country: 'Thailand', flag: '🇹🇭' },
  { code: '+63', country: 'Philippines', flag: '🇵🇭' },
  { code: '+92', country: 'Pakistan', flag: '🇵🇰' },
  { code: '+880', country: 'Bangladesh', flag: '🇧🇩' },
  { code: '+20', country: 'Egypt', flag: '🇪🇬' },
  { code: '+27', country: 'South Africa', flag: '🇿🇦' },
  { code: '+31', country: 'Netherlands', flag: '🇳🇱' },
  { code: '+46', country: 'Sweden', flag: '🇸🇪' },
  { code: '+47', country: 'Norway', flag: '🇳🇴' },
  { code: '+41', country: 'Switzerland', flag: '🇨🇭' },
  { code: '+43', country: 'Austria', flag: '🇦🇹' },
  { code: '+32', country: 'Belgium', flag: '🇧🇪' },
  { code: '+48', country: 'Poland', flag: '🇵🇱' },
  { code: '+351', country: 'Portugal', flag: '🇵🇹' },
  { code: '+353', country: 'Ireland', flag: '🇮🇪' },
  { code: '+90', country: 'Turkey', flag: '🇹🇷' },
  { code: '+971', country: 'United Arab Emirates', flag: '🇦🇪' },
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+52', country: 'Mexico', flag: '🇲🇽' },
  { code: '+54', country: 'Argentina', flag: '🇦🇷' },
  { code: '+56', country: 'Chile', flag: '🇨🇱' },
  { code: '+51', country: 'Peru', flag: '🇵🇪' },
  { code: '+57', country: 'Colombia', flag: '🇨🇴' },
  { code: '+58', country: 'Venezuela', flag: '🇻🇪' },
  { code: '+355', country: 'Albania', flag: '🇦🇱' },
  { code: '+374', country: 'Armenia', flag: '🇦🇲' },
  { code: '+994', country: 'Azerbaijan', flag: '🇦🇿' },
  { code: '+375', country: 'Belarus', flag: '🇧🇾' },
  { code: '+385', country: 'Croatia', flag: '🇭🇷' },
  { code: '+357', country: 'Cyprus', flag: '🇨🇾' },
  { code: '+420', country: 'Czech Republic', flag: '🇨🇿' },
  { code: '+45', country: 'Denmark', flag: '🇩🇰' },
  { code: '+372', country: 'Estonia', flag: '🇪🇪' },
  { code: '+358', country: 'Finland', flag: '🇫🇮' },
  { code: '+995', country: 'Georgia', flag: '🇬🇪' },
  { code: '+30', country: 'Greece', flag: '🇬🇷' },
  { code: '+36', country: 'Hungary', flag: '🇭🇺' },
  { code: '+354', country: 'Iceland', flag: '🇮🇸' },
  { code: '+352', country: 'Luxembourg', flag: '🇱🇺' },
  { code: '+356', country: 'Malta', flag: '🇲🇹' },
  { code: '+373', country: 'Moldova', flag: '🇲🇩' },
  { code: '+377', country: 'Monaco', flag: '🇲🇨' },
  { code: '+382', country: 'Montenegro', flag: '🇲🇪' },
  { code: '+977', country: 'Nepal', flag: '🇳🇵' },
  { code: '+389', country: 'North Macedonia', flag: '🇲🇰' },
  { code: '+48', country: 'Poland', flag: '🇵🇱' },
  { code: '+351', country: 'Portugal', flag: '🇵🇹' },
  { code: '+40', country: 'Romania', flag: '🇷🇴' },
  { code: '+378', country: 'San Marino', flag: '🇸🇲' },
  { code: '+381', country: 'Serbia', flag: '🇷🇸' },
  { code: '+421', country: 'Slovakia', flag: '🇸🇰' },
  { code: '+386', country: 'Slovenia', flag: '🇸🇮' },
  { code: '+370', country: 'Lithuania', flag: '🇱🇹' },
  { code: '+371', country: 'Latvia', flag: '🇱🇻' },
  { code: '+380', country: 'Ukraine', flag: '🇺🇦' },
  { code: '+962', country: 'Jordan', flag: '🇯🇴' },
  { code: '+965', country: 'Kuwait', flag: '🇰🇼' },
  { code: '+968', country: 'Oman', flag: '🇴🇲' },
  { code: '+974', country: 'Qatar', flag: '🇶🇦' },
  { code: '+963', country: 'Syria', flag: '🇸🇾' },
  { code: '+964', country: 'Iraq', flag: '🇮🇶' },
  { code: '+961', country: 'Lebanon', flag: '🇱🇧' },
  { code: '+212', country: 'Morocco', flag: '🇲🇦' },
  { code: '+213', country: 'Algeria', flag: '🇩🇿' },
  { code: '+216', country: 'Tunisia', flag: '🇹🇳' },
  { code: '+218', country: 'Libya', flag: '🇱🇾' },
  { code: '+234', country: 'Nigeria', flag: '🇳🇬' },
  { code: '+233', country: 'Ghana', flag: '🇬🇭' },
  { code: '+237', country: 'Cameroon', flag: '🇨🇲' },
  { code: '+228', country: 'Togo', flag: '🇹🇬' },
  { code: '+229', country: 'Benin', flag: '🇧🇯' },
  { code: '+225', country: 'Côte d\'Ivoire', flag: '🇨🇮' },
  { code: '+226', country: 'Burkina Faso', flag: '🇧🇫' },
  { code: '+221', country: 'Senegal', flag: '🇸🇳' },
  { code: '+224', country: 'Guinea', flag: '🇬🇳' },
  { code: '+223', country: 'Mali', flag: '🇲🇱' },
  { code: '+220', country: 'Gambia', flag: '🇬🇲' },
  { code: '+222', country: 'Mauritania', flag: '🇲🇷' },
  { code: '+230', country: 'Mauritius', flag: '🇲🇺' },
  { code: '+263', country: 'Zimbabwe', flag: '🇿🇼' },
  { code: '+260', country: 'Zambia', flag: '🇿🇲' },
  { code: '+254', country: 'Kenya', flag: '🇰🇪' },
  { code: '+255', country: 'Tanzania', flag: '🇹🇿' },
  { code: '+256', country: 'Uganda', flag: '🇺🇬' },
  { code: '+250', country: 'Rwanda', flag: '🇷🇼' },
  { code: '+257', country: 'Burundi', flag: '🇧🇮' },
  { code: '+243', country: 'DR Congo', flag: '🇨🇩' },
  { code: '+242', country: 'Congo', flag: '🇨🇬' },
  { code: '+236', country: 'Central African Republic', flag: '🇨🇫' },
  { code: '+235', country: 'Chad', flag: '🇹🇩' },
  { code: '+239', country: 'São Tomé and Príncipe', flag: '🇸🇹' },
  { code: '+240', country: 'Equatorial Guinea', flag: '🇬🇶' },
  { code: '+241', country: 'Gabon', flag: '🇬🇦' },
  { code: '+244', country: 'Angola', flag: '🇦🇴' },
  { code: '+245', country: 'Guinea-Bissau', flag: '🇬🇼' },
  { code: '+246', country: 'British Indian Ocean Territory', flag: '🇮🇴' },
  { code: '+247', country: 'Ascension Island', flag: '🇦🇨' },
  { code: '+248', country: 'Seychelles', flag: '🇸🇨' },
  { code: '+249', country: 'Sudan', flag: '🇸🇩' },
  { code: '+251', country: 'Ethiopia', flag: '🇪🇹' },
  { code: '+252', country: 'Somalia', flag: '🇸🇴' },
  { code: '+253', country: 'Djibouti', flag: '🇩🇯' },
  { code: '+258', country: 'Mozambique', flag: '🇲🇿' },
  { code: '+261', country: 'Madagascar', flag: '🇲🇬' },
  { code: '+262', country: 'Réunion', flag: '🇷🇪' },
  { code: '+264', country: 'Namibia', flag: '🇳🇦' },
  { code: '+265', country: 'Malawi', flag: '🇲🇼' },
  { code: '+266', country: 'Lesotho', flag: '🇱🇸' },
  { code: '+267', country: 'Botswana', flag: '🇧🇼' },
  { code: '+268', country: 'Eswatini', flag: '🇸🇿' },
  { code: '+269', country: 'Comoros', flag: '🇰🇲' },
  { code: '+290', country: 'Saint Helena', flag: '🇸🇭' },
  { code: '+291', country: 'Eritrea', flag: '🇪🇷' },
  { code: '+297', country: 'Aruba', flag: '🇦🇼' },
  { code: '+298', country: 'Faroe Islands', flag: '🇫🇴' },
  { code: '+299', country: 'Greenland', flag: '🇬🇱' },
  { code: '+350', country: 'Gibraltar', flag: '🇬🇮' },
  { code: '+358', country: 'Åland Islands', flag: '🇦🇽' },
  { code: '+359', country: 'Bulgaria', flag: '🇧🇬' },
  { code: '+376', country: 'Andorra', flag: '🇦🇩' },
  { code: '+387', country: 'Bosnia and Herzegovina', flag: '🇧🇦' },
  { code: '+423', country: 'Liechtenstein', flag: '🇱🇮' },
  { code: '+500', country: 'Falkland Islands', flag: '🇫🇰' },
  { code: '+501', country: 'Belize', flag: '🇧🇿' },
  { code: '+502', country: 'Guatemala', flag: '🇬🇹' },
  { code: '+503', country: 'El Salvador', flag: '🇸🇻' },
  { code: '+504', country: 'Honduras', flag: '🇭🇳' },
  { code: '+505', country: 'Nicaragua', flag: '🇳🇮' },
  { code: '+506', country: 'Costa Rica', flag: '🇨🇷' },
  { code: '+507', country: 'Panama', flag: '🇵🇦' },
  { code: '+508', country: 'Saint Pierre and Miquelon', flag: '🇵🇲' },
  { code: '+509', country: 'Haiti', flag: '🇭🇹' },
  { code: '+590', country: 'Guadeloupe', flag: '🇬🇵' },
  { code: '+591', country: 'Bolivia', flag: '🇧🇴' },
  { code: '+592', country: 'Guyana', flag: '🇬🇾' },
  { code: '+593', country: 'Ecuador', flag: '🇪🇨' },
  { code: '+594', country: 'French Guiana', flag: '🇬🇫' },
  { code: '+595', country: 'Paraguay', flag: '🇵🇾' },
  { code: '+596', country: 'Martinique', flag: '🇲🇶' },
  { code: '+597', country: 'Suriname', flag: '🇸🇷' },
  { code: '+598', country: 'Uruguay', flag: '🇺🇾' },
  { code: '+599', country: 'Curaçao', flag: '🇨🇼' },
  { code: '+670', country: 'East Timor', flag: '🇹🇱' },
  { code: '+672', country: 'Norfolk Island', flag: '🇳🇫' },
  { code: '+673', country: 'Brunei', flag: '🇧🇳' },
  { code: '+674', country: 'Nauru', flag: '🇳🇷' },
  { code: '+675', country: 'Papua New Guinea', flag: '🇵🇬' },
  { code: '+676', country: 'Tonga', flag: '🇹🇴' },
  { code: '+677', country: 'Solomon Islands', flag: '🇸🇧' },
  { code: '+678', country: 'Vanuatu', flag: '🇻🇺' },
  { code: '+679', country: 'Fiji', flag: '🇫🇯' },
  { code: '+680', country: 'Palau', flag: '🇵🇼' },
  { code: '+681', country: 'Wallis and Futuna', flag: '🇼🇫' },
  { code: '+682', country: 'Cook Islands', flag: '🇨🇰' },
  { code: '+683', country: 'Niue', flag: '🇳🇺' },
  { code: '+685', country: 'Samoa', flag: '🇼🇸' },
  { code: '+686', country: 'Kiribati', flag: '🇰🇮' },
  { code: '+687', country: 'New Caledonia', flag: '🇳🇨' },
  { code: '+688', country: 'Tuvalu', flag: '🇹🇻' },
  { code: '+689', country: 'French Polynesia', flag: '🇵🇫' },
  { code: '+690', country: 'Tokelau', flag: '🇹🇰' },
  { code: '+691', country: 'Micronesia', flag: '🇫🇲' },
  { code: '+692', country: 'Marshall Islands', flag: '🇲🇭' },
  { code: '+850', country: 'North Korea', flag: '🇰🇵' },
  { code: '+852', country: 'Hong Kong', flag: '🇭🇰' },
  { code: '+853', country: 'Macau', flag: '🇲🇴' },
  { code: '+855', country: 'Cambodia', flag: '🇰🇭' },
  { code: '+856', country: 'Laos', flag: '🇱🇦' },
  { code: '+886', country: 'Taiwan', flag: '🇹🇼' },
  { code: '+960', country: 'Maldives', flag: '🇲🇻' },
  { code: '+967', country: 'Yemen', flag: '🇾🇪' },
  { code: '+970', country: 'Palestine', flag: '🇵🇸' },
  { code: '+972', country: 'Israel', flag: '🇮🇱' },
  { code: '+975', country: 'Bhutan', flag: '🇧🇹' },
  { code: '+976', country: 'Mongolia', flag: '🇲🇳' },
  { code: '+992', country: 'Tajikistan', flag: '🇹🇯' },
  { code: '+993', country: 'Turkmenistan', flag: '🇹🇲' },
  { code: '+996', country: 'Kyrgyzstan', flag: '🇰🇬' },
  { code: '+998', country: 'Uzbekistan', flag: '🇺🇿' },
]

// Currency options
const currencyOptions = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar' },
  { code: 'MXN', symbol: '$', name: 'Mexican Peso' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won' },
  { code: 'TRY', symbol: '₺', name: 'Turkish Lira' },
  { code: 'RUB', symbol: '₽', name: 'Russian Ruble' },
  { code: 'SEK', symbol: 'kr', name: 'Swedish Krona' },
  { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone' },
  { code: 'DKK', symbol: 'kr', name: 'Danish Krone' },
  { code: 'PLN', symbol: 'zł', name: 'Polish Zloty' },
  { code: 'CZK', symbol: 'Kč', name: 'Czech Koruna' },
  { code: 'HUF', symbol: 'Ft', name: 'Hungarian Forint' },
  { code: 'ILS', symbol: '₪', name: 'Israeli Shekel' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal' },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
  { code: 'THB', symbol: '฿', name: 'Thai Baht' },
  { code: 'PHP', symbol: '₱', name: 'Philippine Peso' },
  { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah' },
  { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
  { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee' },
  { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka' },
  { code: 'VND', symbol: '₫', name: 'Vietnamese Dong' },
  { code: 'EGP', symbol: 'E£', name: 'Egyptian Pound' },
  { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling' },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
  { code: 'ARS', symbol: '$', name: 'Argentine Peso' },
  { code: 'CLP', symbol: '$', name: 'Chilean Peso' },
  { code: 'PEN', symbol: 'S/.', name: 'Peruvian Sol' },
  { code: 'COP', symbol: '$', name: 'Colombian Peso' },
  { code: 'UYU', symbol: '$U', name: 'Uruguayan Peso' },
  { code: 'CRC', symbol: '₡', name: 'Costa Rican Colón' },
  { code: 'GTQ', symbol: 'Q', name: 'Guatemalan Quetzal' },
  { code: 'HNL', symbol: 'L', name: 'Honduran Lempira' },
  { code: 'NIO', symbol: 'C$', name: 'Nicaraguan Córdoba' },
  { code: 'PYG', symbol: '₲', name: 'Paraguayan Guarani' },
  { code: 'BOB', symbol: 'Bs.', name: 'Bolivian Boliviano' },
]

const industries = [
  'Technology',
  'E-commerce',
  'Healthcare',
  'Finance',
  'Education',
  'Retail',
  'Manufacturing',
  'Real Estate',
  'Food & Beverage',
  'Consulting',
  'Other'
]
const businessSizes = [
  '1-10 employees',
  '11-50 employees',
  '51-200 employees',
  '201-400 employees'
]
const howHeardOptions = [
  'We pitched to you',
  'Social Media',
  'Google Search',
  'Referral',
  'Email Marketing',
  'Event/Conference',
  'Other'
]

// Step 1: Business Information
const BusinessInfoStep = ({ formData, updateFormData, nextStep, prevStep }: StepProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.country) newErrors.country = 'Country is required'
    if (formData.country === 'Other' && !formData.otherCountry) newErrors.otherCountry = 'Please specify your country'
    if (!formData.industry) newErrors.industry = 'Industry is required'
    if (!formData.businessSize) newErrors.businessSize = 'Business size is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleNext = () => {
    if (validate()) {
      nextStep()
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-4"
    >
      <div className="text-center mb-4">
        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 mb-2">
          <Building className="w-4 h-4 text-purple-600" />
        </div>
        <h3 className="text-base font-bold text-gray-900">Business Info</h3>
        <p className="text-gray-600 text-xs mt-1">Tell us about your business</p>
      </div>
      
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Country *</label>
          <select
            value={formData.country}
            onChange={(e) => updateFormData({ country: e.target.value })}
            className={`w-full px-2 py-1.5 border rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-transparent text-xs ${
              errors.country ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select your country</option>
            {countryCodes.map((country, index) => (
              <option key={index} value={country.country}>
                {country.flag} {country.country}
              </option>
            ))}
          </select>
          {errors.country && <p className="mt-1 text-xs text-red-600">{errors.country}</p>}
        </div>
        
        {formData.country === 'Other' && (
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Specify Country *</label>
            <Input
              value={formData.otherCountry || ''}
              onChange={(e) => updateFormData({ otherCountry: e.target.value })}
              placeholder="Enter your country"
              className={`text-xs ${errors.otherCountry ? 'border-red-500' : ''}`}
            />
            {errors.otherCountry && <p className="mt-1 text-xs text-red-600">{errors.otherCountry}</p>}
          </div>
        )}
        
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Industry *</label>
          <select
            value={formData.industry}
            onChange={(e) => updateFormData({ industry: e.target.value })}
            className={`w-full px-2 py-1.5 border rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-transparent text-xs ${
              errors.industry ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select your industry</option>
            {industries.map((industry, index) => (
              <option key={index} value={industry}>{industry}</option>
            ))}
          </select>
          {errors.industry && <p className="mt-1 text-xs text-red-600">{errors.industry}</p>}
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Business Size *</label>
          <div className="grid grid-cols-1 gap-1.5">
            {businessSizes.map((size, index) => (
              <button
                key={index}
                type="button"
                onClick={() => updateFormData({ businessSize: size })}
                className={`px-2 py-1.5 text-xs rounded-lg border transition-all ${
                  formData.businessSize === size
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-300 hover:border-purple-300 hover:bg-purple-50/50'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          {errors.businessSize && <p className="mt-1 text-xs text-red-600">{errors.businessSize}</p>}
        </div>
      </div>
      
      <div className="flex justify-between pt-3">
        <div></div>
        <Button onClick={handleNext} className="bg-purple-600 hover:bg-purple-700 text-xs py-1.5 px-3">
          Continue
          <ChevronRight className="ml-1 w-3 h-3" />
        </Button>
      </div>
    </motion.div>
  )
}

// Step 2: Financial Information
const FinancialInfoStep = ({ formData, updateFormData, nextStep, prevStep }: StepProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.annualRevenue) newErrors.annualRevenue = 'Annual revenue is required'
    if (!formData.ebitda) newErrors.ebitda = 'EBITDA is required'
    if (!formData.currency) newErrors.currency = 'Currency is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleNext = () => {
    if (validate()) {
      nextStep()
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-4"
    >
      <div className="text-center mb-4">
        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 mb-2">
          <DollarSign className="w-4 h-4 text-green-600" />
        </div>
        <h3 className="text-base font-bold text-gray-900">Financial Info</h3>
        <p className="text-gray-600 text-xs mt-1">Help us understand your business</p>
      </div>
      
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Currency *</label>
          <select
            value={formData.currency}
            onChange={(e) => updateFormData({ currency: e.target.value })}
            className={`w-full px-2 py-1.5 border rounded-lg focus:ring-1 focus:ring-green-500 focus:border-transparent text-xs ${
              errors.currency ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select currency</option>
            {currencyOptions.map((currency, index) => (
              <option key={index} value={currency.code}>
                {currency.symbol} {currency.code} - {currency.name}
              </option>
            ))}
          </select>
          {errors.currency && <p className="mt-1 text-xs text-red-600">{errors.currency}</p>}
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Annual Revenue *</label>
          <Input
            type="text"
            value={formData.annualRevenue}
            onChange={(e) => updateFormData({ annualRevenue: e.target.value })}
            placeholder="e.g., 500,000"
            className={`text-xs ${errors.annualRevenue ? 'border-red-500' : ''}`}
          />
          {errors.annualRevenue && <p className="mt-1 text-xs text-red-600">{errors.annualRevenue}</p>}
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">EBITDA *</label>
          <Input
            type="text"
            value={formData.ebitda}
            onChange={(e) => updateFormData({ ebitda: e.target.value })}
            placeholder="e.g., 100,000"
            className={`text-xs ${errors.ebitda ? 'border-red-500' : ''}`}
          />
          {errors.ebitda && <p className="mt-1 text-xs text-red-600">{errors.ebitda}</p>}
        </div>
      </div>
      
      <div className="flex justify-between pt-3">
        <Button variant="outline" onClick={prevStep} className="text-xs py-1.5 px-3">
          <ChevronLeft className="mr-1 w-3 h-3" />
          Back
        </Button>
        <Button onClick={handleNext} className="bg-green-600 hover:bg-green-700 text-xs py-1.5 px-3">
          Continue
          <ChevronRight className="ml-1 w-3 h-3" />
        </Button>
      </div>
    </motion.div>
  )
}

// Step 4: Contact Information
const ContactInfoStep = ({ formData, updateFormData, nextStep, prevStep }: StepProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    if (!formData.phone) newErrors.phone = 'Phone number is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleNext = () => {
    if (validate()) {
      nextStep()
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-4"
    >
      <div className="text-center mb-4">
        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 mb-2">
          <Mail className="w-4 h-4 text-indigo-600" />
        </div>
        <h3 className="text-base font-bold text-gray-900">Contact Info</h3>
        <p className="text-gray-600 text-xs mt-1">How can we reach you?</p>
      </div>
      
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Email *</label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            placeholder="you@company.com"
            className={`text-xs ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number *</label>
          <div className="flex gap-2">
            <select
              value={formData.countryCode || '+1'}
              onChange={(e) => updateFormData({ countryCode: e.target.value })}
              className="w-24 px-2 py-1.5 border rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-transparent text-xs border-gray-300"
            >
              {countryCodes.map((country, index) => (
                <option key={index} value={country.code}>
                  {country.flag} {country.code}
                </option>
              ))}
            </select>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => updateFormData({ phone: e.target.value })}
              placeholder="123-456-7890"
              className={`flex-1 text-xs ${errors.phone ? 'border-red-500' : ''}`}
            />
          </div>
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
        </div>
      </div>
      
      <div className="flex justify-between pt-3">
        <Button variant="outline" onClick={prevStep} className="text-xs py-1.5 px-3">
          <ChevronLeft className="mr-1 w-3 h-3" />
          Back
        </Button>
        <Button onClick={handleNext} className="bg-indigo-600 hover:bg-indigo-700 text-xs py-1.5 px-3">
          Continue
          <ChevronRight className="ml-1 w-3 h-3" />
        </Button>
      </div>
    </motion.div>
  )
}

// Step 3: How Did You Hear About Us
const HowHeardStep = ({ formData, updateFormData, nextStep, prevStep }: StepProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.howHeard) newErrors.howHeard = 'Please let us know how you heard about us'
    if (formData.howHeard === 'Other' && !formData.otherHowHeard) newErrors.otherHowHeard = 'Please specify'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleNext = () => {
    if (validate()) {
      nextStep()
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-4"
    >
      <div className="text-center mb-4">
        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 mb-2">
          <MessageSquare className="w-4 h-4 text-blue-600" />
        </div>
        <h3 className="text-base font-bold text-gray-900">How Did You Hear?</h3>
        <p className="text-gray-600 text-xs mt-1">We'd love to know how you found us</p>
      </div>
      
      <div className="space-y-1.5">
        {howHeardOptions.map((option, index) => (
          <button
            key={index}
            type="button"
            onClick={() => updateFormData({ howHeard: option })}
            className={`w-full px-2.5 py-1.5 text-left rounded-lg border transition-all text-xs ${
              formData.howHeard === option
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50/50'
            }`}
          >
            {option}
          </button>
        ))}
        
        {formData.howHeard === 'Other' && (
          <div className="pt-1.5">
            <Input
              value={formData.otherHowHeard || ''}
              onChange={(e) => updateFormData({ otherHowHeard: e.target.value })}
              placeholder="Please specify..."
              className={`text-xs ${errors.otherHowHeard ? 'border-red-500' : ''}`}
            />
            {errors.otherHowHeard && <p className="mt-1 text-xs text-red-600">{errors.otherHowHeard}</p>}
          </div>
        )}
        
        {errors.howHeard && <p className="mt-1 text-xs text-red-600">{errors.howHeard}</p>}
      </div>
      
      <div className="flex justify-between pt-3">
        <Button variant="outline" onClick={prevStep} className="text-xs py-1.5 px-3">
          <ChevronLeft className="mr-1 w-3 h-3" />
          Back
        </Button>
        <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 text-xs py-1.5 px-3">
          Continue
          <ChevronRight className="ml-1 w-3 h-3" />
        </Button>
      </div>
    </motion.div>
  )
}

// Step 5: Business Description
const BusinessDescriptionStep = ({ formData, updateFormData, nextStep, prevStep }: StepProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.businessDescription) newErrors.businessDescription = 'Business description is required'
    if (formData.businessDescription && formData.businessDescription.length < 20) {
      newErrors.businessDescription = 'Please provide more details (at least 20 characters)'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleNext = () => {
    if (validate()) {
      nextStep()
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-4"
    >
      <div className="text-center mb-4">
        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 mb-2">
          <Briefcase className="w-4 h-4 text-orange-600" />
        </div>
        <h3 className="text-base font-bold text-gray-900">Business Description</h3>
        <p className="text-gray-600 text-xs mt-1">Tell us more about your business</p>
      </div>
      
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Describe Your Business *</label>
        <Textarea
          value={formData.businessDescription}
          onChange={(e) => updateFormData({ businessDescription: e.target.value })}
          placeholder="Tell us about your products/services, target customers, and business goals..."
          rows={3}
          className={`text-xs ${errors.businessDescription ? 'border-red-500' : ''}`}
        />
        <p className="text-xs text-gray-500 mt-1">Minimum 20 characters</p>
        {errors.businessDescription && <p className="mt-1 text-xs text-red-600">{errors.businessDescription}</p>}
      </div>
      
      <div className="flex justify-between pt-3">
        <Button variant="outline" onClick={prevStep} className="text-xs py-1.5 px-3">
          <ChevronLeft className="mr-1 w-3 h-3" />
          Back
        </Button>
        <Button onClick={handleNext} className="bg-orange-600 hover:bg-orange-700 text-xs py-1.5 px-3">
          Continue
          <ChevronRight className="ml-1 w-3 h-3" />
        </Button>
      </div>
    </motion.div>
  )
}

// Step 6: Schedule Meeting
const ScheduleMeetingStep = ({ formData, updateFormData, nextStep, prevStep }: StepProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.scheduleMeeting) newErrors.scheduleMeeting = 'Please select an option'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleNext = () => {
    if (validate()) {
      nextStep()
    }
  }

  // Function to remove scheduled meeting
  const removeScheduledMeeting = () => {
    updateFormData({ 
      scheduleMeeting: '' 
    })
    // Clear any meeting scheduled status
    if (typeof window !== 'undefined') {
      localStorage.removeItem('calendlyMeetingScheduled')
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-3"
    >
      <div className="text-center mb-3">
        <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-teal-100 mb-1.5">
          <Calendar className="w-3.5 h-3.5 text-teal-600" />
        </div>
        <h3 className="text-sm font-bold text-gray-900">Schedule a Meeting</h3>
        <p className="text-gray-600 text-[11px] mt-0.5">Would you like to schedule a consultation?</p>
      </div>
      
      <div className="space-y-1.5">
        <button
          type="button"
          onClick={() => updateFormData({ scheduleMeeting: 'Yes' })}
          className={`w-full px-2 py-1.5 text-left rounded-lg border transition-all ${
            formData.scheduleMeeting === 'Yes'
              ? 'border-teal-500 bg-teal-50 text-teal-700'
              : 'border-gray-200 hover:border-teal-300 hover:bg-teal-50/50'
          }`}
        >
          <div className="flex items-center">
            <div className="flex-shrink-0 w-2.5 h-2.5 rounded-full border border-gray-300 flex items-center justify-center mr-1.5">
              {formData.scheduleMeeting === 'Yes' && <div className="w-1 h-1 rounded-full bg-teal-500"></div>}
            </div>
            <div>
              <div className="font-medium text-[11px]">Yes, I'd like to schedule a meeting</div>
              <div className="text-[10px] text-gray-600">Get personalized advice from our experts</div>
            </div>
          </div>
        </button>
        
        <button
          type="button"
          onClick={() => updateFormData({ scheduleMeeting: 'No' })}
          className={`w-full px-2 py-1.5 text-left rounded-lg border transition-all ${
            formData.scheduleMeeting === 'No'
              ? 'border-gray-500 bg-gray-50 text-gray-700'
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'
          }`}
        >
          <div className="flex items-center">
            <div className="flex-shrink-0 w-2.5 h-2.5 rounded-full border border-gray-300 flex items-center justify-center mr-1.5">
              {formData.scheduleMeeting === 'No' && <div className="w-1 h-1 rounded-full bg-gray-500"></div>}
            </div>
            <div>
              <div className="font-medium text-[11px]">Not right now</div>
              <div className="text-[10px] text-gray-600">I'll reach out when I'm ready</div>
            </div>
          </div>
        </button>
        
        {errors.scheduleMeeting && <p className="mt-1 text-[10px] text-red-600">{errors.scheduleMeeting}</p>}
      </div>
      
      {/* Show scheduling status and remove option if meeting is scheduled */}
      {formData.scheduleMeeting === 'Yes' && typeof window !== 'undefined' && localStorage.getItem('calendlyMeetingScheduled') === 'true' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-2 mt-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <CheckCircle2 className="w-3 h-3 text-green-600 mr-1.5 flex-shrink-0" />
              <div>
                <p className="text-[11px] font-medium text-green-800">Meeting Scheduled!</p>
                <p className="text-[10px] text-green-700">Your consultation has been booked.</p>
              </div>
            </div>
            <button
              onClick={removeScheduledMeeting}
              className="text-[10px] text-red-600 hover:text-red-800 font-medium whitespace-nowrap"
            >
              Remove
            </button>
          </div>
        </div>
      )}
      
      <div className={`bg-blue-50 border border-blue-200 rounded-lg p-2 mt-2 ${formData.scheduleMeeting === 'Yes' && typeof window !== 'undefined' && localStorage.getItem('calendlyMeetingScheduled') === 'true' ? 'opacity-70' : ''}`}>
        <p className="text-[11px] text-blue-700">
          {formData.scheduleMeeting === 'Yes' 
            ? "You'll be able to select a time that works for you in the next step." 
            : "You can always schedule a meeting later from your dashboard."}
        </p>
      </div>
      
      <div className="flex justify-between pt-2">
        <Button variant="outline" onClick={prevStep} className="text-[11px] py-1 px-2.5">
          <ChevronLeft className="mr-1 w-2.5 h-2.5" />
          Back
        </Button>
        <Button 
          onClick={handleNext} 
          className={`text-[11px] py-1 px-2.5 ${
            formData.scheduleMeeting === 'Yes' 
              ? 'bg-teal-600 hover:bg-teal-700' 
              : 'bg-gray-600 hover:bg-gray-700'
          }`}
        >
          {formData.scheduleMeeting === 'Yes' ? 'Schedule Meeting' : 'Submit'}
          <ChevronRight className="ml-1 w-2.5 h-2.5" />
        </Button>
      </div>
    </motion.div>
  )
}

// Final Step: Summary
const SummaryStep = ({ formData, updateFormData, nextStep, prevStep }: StepProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      // Submit form data
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          name: formData.email.split('@')[0], // Use email username as name if not provided
          businessName: formData.businessDescription.substring(0, 50) + '...', // Extract business name from description
          message: formData.businessDescription,
          subject: 'Onboarding Questionnaire Submission',
          timestamp: new Date().toISOString(),
          source: 'onboarding_questionnaire'
        }),
      })
      
      if (response.ok) {
        setSubmitStatus('success')
        // Wait a moment before redirecting
        setTimeout(() => {
          nextStep()
        }, 1000)
      } else {
        throw new Error('Failed to submit')
      }
    } catch (error) {
      setSubmitStatus('error')
      console.error('Submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-4"
    >
      <div className="text-center mb-4">
        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 mb-2">
          <Sparkles className="w-4 h-4 text-purple-600" />
        </div>
        <h3 className="text-base font-bold text-gray-900">Review Your Info</h3>
        <p className="text-gray-600 text-xs mt-1">Please review before submitting</p>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-2.5 space-y-3">
        <div className="grid grid-cols-1 gap-2.5">
          <div>
            <p className="text-[10px] text-gray-500 uppercase">Country</p>
            <p className="font-medium text-xs">{formData.country === 'Other' ? formData.otherCountry : formData.country}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-500 uppercase">Industry</p>
            <p className="font-medium text-xs">{formData.industry}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-500 uppercase">Business Size</p>
            <p className="font-medium text-xs">{formData.businessSize}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-500 uppercase">Annual Revenue</p>
            <p className="font-medium text-xs">{formData.annualRevenue}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-500 uppercase">EBITDA</p>
            <p className="font-medium text-xs">{formData.ebitda}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-500 uppercase">How You Heard</p>
            <p className="font-medium text-xs">{formData.howHeard === 'Other' ? formData.otherHowHeard : formData.howHeard}</p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-2.5">
          <p className="text-[10px] text-gray-500 uppercase">Contact</p>
          <p className="font-medium text-xs">{formData.email}</p>
          <p className="font-medium text-xs">{formData.phone}</p>
        </div>
        
        <div className="border-t border-gray-200 pt-2.5">
          <p className="text-[10px] text-gray-500 uppercase">Business Description</p>
          <p className="font-medium text-xs line-clamp-2">{formData.businessDescription}</p>
        </div>
        
        <div className="border-t border-gray-200 pt-2.5">
          <p className="text-[10px] text-gray-500 uppercase">Schedule Meeting</p>
          <p className="font-medium text-xs">{formData.scheduleMeeting}</p>
        </div>
      </div>
      
      {submitStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-2.5">
          <div className="flex items-center">
            <AlertCircle className="w-3 h-3 text-red-500 mr-1.5" />
            <p className="text-xs text-red-700">Error submitting. Please try again.</p>
          </div>
        </div>
      )}
      
      {submitStatus === 'success' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-2.5">
          <div className="flex items-center">
            <CheckCircle2 className="w-3 h-3 text-green-500 mr-1.5" />
            <p className="text-xs text-green-700">Submitted successfully!</p>
          </div>
        </div>
      )}
      
      <div className="flex justify-between pt-3">
        <Button variant="outline" onClick={prevStep} className="text-xs py-1.5 px-3">
          <ChevronLeft className="mr-1 w-3 h-3" />
          Back
        </Button>
        <Button 
          onClick={handleSubmit} 
          disabled={isSubmitting}
          className="bg-purple-600 hover:bg-purple-700 text-xs py-1.5 px-3"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-1 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </>
          ) : (
            <>
              Submit
              <CheckCircle2 className="ml-1 w-3 h-3" />
            </>
          )}
        </Button>
      </div>
    </motion.div>
  )
}

export default function OnboardingQuestionnaire({ 
  onConsultingPageRedirect, 
  onRestartOnboarding,
  continueFromCalendly = false,
  onClose
}: OnboardingQuestionnaireProps) {
  const [currentStep, setCurrentStep] = useState(continueFromCalendly ? 6 : 0)
  const [formData, setFormData] = useState<FormData>({
    country: '',
    otherCountry: '',
    countryCode: '+1',
    industry: '',
    businessSize: '',
    annualRevenue: '',
    ebitda: '',
    currency: '',
    howHeard: '',
    otherHowHeard: '',
    email: '',
    phone: '',
    businessDescription: '',
    scheduleMeeting: ''
  })
  const [status, setStatus] = useState<{type: 'success' | 'error', message: string} | null>(null)
  const [showCalendly, setShowCalendly] = useState(false)
  const [meetingScheduled, setMeetingScheduled] = useState(false)

  // Update form data
  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }))
  }

  // Handle Calendly event scheduled
  const handleCalendlyEventScheduled = () => {
    console.log('Calendly event scheduled in onboarding')
    // Mark that meeting was scheduled
    setMeetingScheduled(true)
    // Close the Calendly modal
    setShowCalendly(false)
    // Show a success message
    setStatus({
      type: 'success',
      message: 'Meeting scheduled successfully! Continuing with onboarding...'
    })
    // Move to the next step (final step) after a short delay
    setTimeout(() => {
      setCurrentStep(6)
      // Clear the status message after moving to the next step
      setTimeout(() => {
        setStatus(null)
      }, 2000)
    }, 1500)
  }

  // Set up Calendly event listener
  useEffect(() => {
    const handleCalendlyEvent = (e: MessageEvent) => {
      if (e.data && e.data.event === 'calendly.event_scheduled') {
        console.log('Calendly event scheduled - general listener')
        handleCalendlyEventScheduled()
      }
    }
    
    // Add general event listener
    window.addEventListener('message', handleCalendlyEvent)
    
    return () => {
      window.removeEventListener('message', handleCalendlyEvent)
    }
  }, [])

  // Set up specific iframe event listener when Calendly modal is open
  useEffect(() => {
    if (showCalendly) {
      const handleIframeMessage = (e: MessageEvent) => {
        if (e.origin === 'https://calendly.com') {
          if (e.data && e.data.event === 'calendly.event_scheduled') {
            console.log('Calendly event scheduled - iframe listener')
            handleCalendlyEventScheduled()
          }
        }
      }
      
      window.addEventListener('message', handleIframeMessage)
      
      return () => {
        window.removeEventListener('message', handleIframeMessage)
      }
    }
  }, [showCalendly])

  // Check for existing scheduled meeting on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isScheduled = localStorage.getItem('calendlyMeetingScheduled') === 'true'
      setMeetingScheduled(isScheduled)
    }
  }, [])

  // Handle next step
  const nextStep = () => {
    // If we're on the schedule meeting step and user selected "Yes", show Calendly modal
    if (currentStep === 5 && formData.scheduleMeeting === 'Yes' && !meetingScheduled) {
      setShowCalendly(true)
      return
    }
    
    // If we're on the final step, close the modal
    if (currentStep === 6) {
      if (onClose) {
        onClose()
      }
      return
    }
    
    setCurrentStep(prev => Math.min(6, prev + 1))
  }

  // Handle previous step
  const prevStep = () => {
    setCurrentStep(prev => Math.max(0, prev - 1))
  }

  // Render current step
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <BusinessInfoStep 
          formData={formData} 
          updateFormData={updateFormData} 
          nextStep={nextStep} 
          prevStep={prevStep} 
        />
      case 1:
        return <FinancialInfoStep 
          formData={formData} 
          updateFormData={updateFormData} 
          nextStep={nextStep} 
          prevStep={prevStep} 
        />
      case 2:
        return <HowHeardStep 
          formData={formData} 
          updateFormData={updateFormData} 
          nextStep={nextStep} 
          prevStep={prevStep} 
        />
      case 3:
        return <ContactInfoStep 
          formData={formData} 
          updateFormData={updateFormData} 
          nextStep={nextStep} 
          prevStep={prevStep} 
        />
      case 4:
        return <BusinessDescriptionStep 
          formData={formData} 
          updateFormData={updateFormData} 
          nextStep={nextStep} 
          prevStep={prevStep} 
        />
      case 5:
        return <ScheduleMeetingStep 
          formData={formData} 
          updateFormData={updateFormData} 
          nextStep={nextStep} 
          prevStep={prevStep} 
        />
      case 6:
        return <SummaryStep 
          formData={formData} 
          updateFormData={updateFormData} 
          nextStep={nextStep} 
          prevStep={prevStep} 
        />
      default:
        return <BusinessInfoStep 
          formData={formData} 
          updateFormData={updateFormData} 
          nextStep={nextStep} 
          prevStep={prevStep} 
        />
    }
  }

  // Step titles for progress indicator
  const stepTitles = [
    'Business',
    'Financial',
    'Heard',
    'Contact',
    'Business',
    'Schedule',
    'Review'
  ]

  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className="mb-3 md:mb-4">
        <div className="flex justify-between text-[10px] text-gray-500 mb-1">
          <span>Step {currentStep + 1} of 7</span>
          <span>{Math.round(((currentStep + 1) / 7) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / 7) * 100}%` }}
            transition={{ duration: 0.3 }}
          ></motion.div>
        </div>
        <div className="flex justify-between text-[9px] text-gray-500 mt-1">
          {stepTitles.map((title, index) => (
            <span 
              key={index} 
              className={`${index <= currentStep ? 'text-purple-600 font-medium' : ''} truncate max-w-[16px]`}
            >
              {title}
            </span>
          ))}
        </div>
      </div>
      
      {/* Status message */}
      <AnimatePresence>
        {status && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`mb-2 p-2 rounded-lg flex items-start gap-1.5 ${
              status.type === 'success'
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}
          >
            {status.type === 'success' ? (
              <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
            )}
            <p className="text-[11px] font-medium">{status.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Step content */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-3 md:p-4">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>
      
      {/* Calendly Modal */}
      <CalendlyModal 
        isOpen={showCalendly} 
        onClose={() => {
          setShowCalendly(false)
          // Only show status if meeting was actually scheduled
          if (typeof window !== 'undefined' && localStorage.getItem('calendlyMeetingScheduled') !== 'true') {
            setStatus({
              type: 'success',
              message: 'You can schedule a meeting anytime from your dashboard.'
            })
            setTimeout(() => {
              setStatus(null)
            }, 3000)
          }
        }} 
      />
    </div>
  )
}