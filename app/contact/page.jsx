"use client";

import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Phone, Send, Instagram, CheckCircle2, Loader2, Sparkles } from 'lucide-react';

export default function ContactPage() {
    const form = useRef();
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(""); // "SUCCESS" or "ERROR"

    const sendEmail = (e) => {
        e.preventDefault();
        setLoading(true);

        // Verified IDs from your working setup
        const SERVICE_ID = "service_n3xqi7s"; 
        const TEMPLATE_ID = "template_v3c1e4p";
        const PUBLIC_KEY = "GiOSGheSjNQVdW-Zu";

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
            .then((result) => {
                console.log("SUCCESS!", result.status, result.text);
                setStatus("SUCCESS");
                setLoading(false);
                form.current.reset();
            })
            .catch((error) => {
                console.error("FAILED...", error);
                setStatus("ERROR");
                setLoading(false);
            });
    };

    return (
        <div className="bg-white font-['Inter']">
            {/* Hero Header */}
            <div className="bg-gray-50 py-20 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="flex justify-center mb-4 text-lilshop-brown">
                        <Sparkles size={24} className="animate-pulse" />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.4em] text-gray-400 font-bold mb-4 block">Get in Touch</span>
                    <h1 className="text-5xl md:text-6xl font-['Poppins'] font-black text-lilshop-charcoal tracking-tighter">
                        Let’s Create Together
                    </h1>
                    <p className="mt-6 text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed tracking-wide">
                        Whether you have a question about our hand-crocheted collection, a custom painting request, or just want to say hello, our studio doors are always open.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                    
                    {/* Left: Studio Info */}
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-2xl font-['Poppins'] font-bold text-lilshop-charcoal mb-8">Studio Information</h2>
                            <div className="space-y-8">
                                <div className="flex items-start gap-6 group">
                                    <div className="w-12 h-12 rounded-2xl bg-lilshop-warm/50 flex items-center justify-center text-lilshop-darkbrown group-hover:bg-lilshop-warm transition-colors">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-black text-gray-500 tracking-widest mb-1">Email Us</p>
                                        <p className="text-lilshop-charcoal font-bold">shakiraarts15@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6 group">
                                    <div className="w-12 h-12 rounded-2xl bg-lilshop-warm/50 flex items-center justify-center text-lilshop-charcoal group-hover:bg-lilshop-charcoal group-hover:text-white transition-all">
                                        <Instagram size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-black text-gray-500 tracking-widest mb-1">Follow the Craft</p>
                                        <p className="text-lilshop-charcoal font-bold">@lilshop.pk</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6 group">
                                    <div className="w-12 h-12 rounded-2xl bg-lilshop-warm/50 flex items-center justify-center text-lilshop-darkbrown group-hover:bg-lilshop-darkbrown group-hover:text-white transition-all">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-black text-gray-500 tracking-widest mb-1">WhatsApp Support</p>
                                        <p className="text-lilshop-charcoal font-bold">+92 320 9384504</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Artisan Note */}
                        <div className="p-8 rounded-[2rem] bg-lilshop-charcoal text-white relative overflow-hidden">
                            <p className="italic text-sm leading-relaxed relative z-10">
                                "Each item at LilShop is handcrafted with patience and care. Please allow 24-48 hours for us to respond to your inquiries as we are often busy at the loom or the canvas."
                            </p>
                            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
                        </div>
                    </div>

                    {/* Right: Modern Contact Form */}
                    <div className="bg-white border border-gray-100 p-10 rounded-[2.5rem] shadow-xl shadow-gray-100/50">
                        {status === "SUCCESS" ? (
                            <div className="py-20 text-center space-y-6 animate-in zoom-in duration-500">
                                <CheckCircle2 size={80} className="mx-auto text-lilshop-darkbrown" />
                                <h2 className="text-3xl font-black text-lilshop-charcoal font-['Poppins']">Message Sent!</h2>
                                <p className="text-gray-500">Our studio has received your inquiry. We will get back to you shortly.</p>
                                <button onClick={() => setStatus("")} className="px-8 py-3 bg-lilshop-charcoal text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-lilshop-darkbrown transition-colors">
                                    Send Another
                                </button>
                            </div>
                        ) : (
                            <form ref={form} onSubmit={sendEmail} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Your Name</label>
                                        <input 
                                            name="from_name" 
                                            required 
                                            type="text" 
                                            className="bg-gray-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-lilshop-warm outline-none transition-all" 
                                            placeholder="Enter name"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Email Address</label>
                                        <input 
                                            name="from_email" 
                                            required 
                                            type="email" 
                                            className="bg-gray-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-lilshop-warm outline-none transition-all" 
                                            placeholder="example@mail.com"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Subject</label>
                                    <input 
                                        name="subject" 
                                        required 
                                        type="text" 
                                        className="bg-gray-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-lilshop-warm outline-none transition-all text-sm" 
                                        placeholder="What is this about?"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Message</label>
                                    <textarea 
                                        name="message" 
                                        required 
                                        rows="5" 
                                        className="bg-gray-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-lilshop-warm outline-none transition-all resize-none"
                                        placeholder="Write your message here..."
                                    ></textarea>
                                </div>

                                <button 
                                    disabled={loading}
                                    type="submit" 
                                    className="w-full py-4 bg-lilshop-darkbrown text-white font-black uppercase tracking-[0.3em] rounded-xl hover:bg-lilshop-charcoal transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-lilshop-darkbrown/20 disabled:opacity-50"
                                >
                                    {loading ? (
                                        <Loader2 className="animate-spin" size={20} />
                                    ) : (
                                        <>Send Message <Send size={16} /></>
                                    )}
                                </button>
                                
                                {status === "ERROR" && (
                                    <p className="text-center text-xs font-bold text-red-500 uppercase tracking-widest">
                                        Failed to send. Please check your connection.
                                    </p>
                                )}
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}