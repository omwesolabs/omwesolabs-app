"use client"
import React, {useState} from 'react';
import {ArrowRight, Phone, Shield, Ticket} from 'lucide-react';
import AuthLayout from "@/components/AuthLayout";
import {AuthWrapper} from "@/components/AuthWrapper";
import {useAuth} from "@/app/context/AuthContext";
import {useRouter} from "next/navigation";
import {supabase} from "@/lib/supabase";
import {v4 as uuidv4} from "uuid";

export default function Subscription() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [voucherNumber, setVoucherNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    // to handle either payment through mobile money or voucher
    const [isMobilePayment, setIsMobilePayment] = useState(false);
    const {user} = useAuth()
    const router = useRouter()

    const [voucherCode, setVoucherCode] = useState('')
    const handleApplyVoucher = async (e) => {
        let {data, error} = await supabase
            .rpc('validate_voucher', {
                plan: null,
                user_id: user.id,
                voucher_code: voucherCode,
            })

        if (error) {
            console.log(error)
        } else if (data.valid) {
            console.log(data)
        } else {
            console.log(data)
        }
    }

    const handlePayment = async (e) => {
        e.preventDefault()
        setIsLoading(true);
        if (voucherCode) {

            let { data, error } = await supabase
                .rpc('validate_voucher', {
                    plan: null,
                    user_id: user.id,
                    voucher_code: voucherCode,
                })
            if (error) {
                setIsLoading(false);
                console.log(error)
            } else {
                if (data[0].valid) {
                    console.log(user.id,voucherCode)
                    const {data,error} = await supabase.rpc('apply_voucher', {
                        p_plan_id: null,
                        p_user_id: user.id,
                        voucher_code: voucherCode,
                    })
                    if (error) {
                        setIsLoading(false);
                        console.log(error)
                    }
                    console.log(data)
                }
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // const transactionId = `TXN_${Date.now()}`;
            const transactionId = uuidv4();
            const response = await fetch('/api/momo/initiate-payment', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({phoneNumber, amount: 10000, transactionId})
            })
            const result = await response.json()
            if (result.success) {
                router.push("/subscription/receipt?transactionId=" + transactionId);
            } else {
                //     TODO: Show notification
            }
        } catch (err) {
            console.log(err)
            //     TODO: Show notification
        } finally {
            setIsLoading(false);
        }
    };

    const formatPhoneNumber = (value) => {
        // Remove non-numeric characters
        const numeric = value.replace(/\D/g, '');
        // Ensure it starts with 256 (Uganda)
        const formatted = numeric.startsWith('256')
            ? numeric
            : `256${numeric.startsWith('0') ? numeric.slice(1) : numeric}`;
        return formatted.slice(0, 12); // Limit to 12 digits
    };

    const handlePhoneChange = (e) => {
        const formatted = formatPhoneNumber(e.target.value);
        setPhoneNumber(formatted);
    };

    return (
        <AuthWrapper>
            <AuthLayout isLoggedIn={user}>
                <section className="py-16 px-4">
                    <div className="container mx-auto max-w-2xl">
                        <div className="bg-white rounded-2xl shadow-xl p-8 relative z-10">
                            <h2 className="text-2xl font-bold text-center mb-8">Complete Your Payment</h2>
                            <p className="text-center mb-8 text-gray-600">{`Enter your ${isMobilePayment ? 'mobile money' : 'voucher'} number to proceed${ isMobilePayment ? 'with payment' : ''}`}</p>

                            {isMobilePayment && (<form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    <div className="relative">
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                            Mobile Money Number
                                        </label>
                                        <div className="relative">
                                            <Phone
                                                className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"/>
                                            <input
                                                type="tel"
                                                id="phone"
                                                value={phoneNumber}
                                                onChange={handlePhoneChange}
                                                placeholder="256770123456"
                                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-600 transition-all"
                                                required
                                            />
                                        </div>
                                        <p className="mt-2 text-sm text-gray-500">Format: 256XXXXXXXXX</p>
                                    </div>

                                    <div className="bg-blue-50 p-4 rounded-xl">
                                        <div className="flex items-center mb-2">
                                            <Shield className="h-5 w-5 text-blue-600 mr-2"/>
                                            <span className="font-semibold text-blue-800">Payment Summary</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                                            <span>Basic Plan</span>
                                            <span>10,000 UGX</span>
                                        </div>
                                        <div className="border-t border-blue-100 my-2"/>
                                        <div className="flex justify-between font-semibold">
                                            <span>Total</span>
                                            <span>10,000 UGX</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading || phoneNumber.length < 12}
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-[1.02] focus:ring-4 focus:ring-blue-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <span>Processing...</span>
                                    ) : (
                                        <>
                                            <span>Pay Now</span>
                                            <ArrowRight className="h-5 w-5"/>
                                        </>
                                    )}
                                </button>
                                <div className="mt-6 text-center text-sm text-gray-500">
                                    <p>You will receive a prompt on your phone to complete the payment</p>
                                </div>

                                <div className="mt-6 text-center">
                                    <h3 className="text-1xl">OR</h3>
                                </div>
                                <button
                                    onClick={() => setIsMobilePayment(!isMobilePayment)}
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-[1.02] focus:ring-4 focus:ring-blue-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Redeem Voucher
                                </button>
                            </form>)}

                            {/*Voucher Redemption */}
                            {
                                !isMobilePayment && (<form className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="relative">
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                                Voucher
                                            </label>
                                            <div className="relative">
                                                <Ticket
                                                    className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"/>
                                                <input
                                                    type="text"
                                                    id="voucher"
                                                    value={voucherCode}
                                                    onChange={(e) => setVoucherCode(e.target.value)}
                                                    onBlur={() => handleApplyVoucher(voucherCode)}
                                                    placeholder="OMW-23X5Y"
                                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-600 transition-all"
                                                    required
                                                />
                                            </div>
                                            <p className="mt-2 text-sm text-gray-500">Format: ABC-123Y4</p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handlePayment}
                                        disabled={isLoading || voucherCode.length < 8}
                                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-[1.02] focus:ring-4 focus:ring-blue-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? (
                                            <span>Processing...</span>
                                        ) : (
                                            <>
                                                <span>Redeem Now</span>
                                                <ArrowRight className="h-5 w-5"/>
                                            </>
                                        )}
                                    </button>
                                    <div className="mt-6 text-center">
                                        <h3 className="text-1xl">OR</h3>
                                    </div>
                                    <button
                                        onClick={() => setIsMobilePayment(!isMobilePayment)}
                                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-[1.02] focus:ring-4 focus:ring-blue-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Use Mobile Money
                                    </button>
                                </form>)
                            }
                        </div>
                    </div>
                </section>
            </AuthLayout>
        </AuthWrapper>
    );
};