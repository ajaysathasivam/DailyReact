import React, { useState } from 'react';
import { Share, Facebook, Twitter } from 'lucide-react';
import iconShare from "./../assets/icon-share.svg";


const ResponsiveArticleCard = () => {
    const [isSharePopoverVisible, setIsSharePopoverVisible] = useState(false);

    const toggleSharePopover = () => {
        setIsSharePopoverVisible(!isSharePopoverVisible);
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="relative bg-white rounded-xl overflow-hidden" style={{ boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}>
                {/* Desktop Layout */}
                <div className="hidden md:flex">
                    {/* Image Section */}
                    <div className="w-2/5">
                        <div className="h-full bg-gradient-to-br from-slate-100 to-slate-200 rounded-l-xl flex items-center justify-center">
                            {/* <div className="text-slate-400 text-sm font-medium">Image Placeholder</div> */}
                            <img src="src/assets/drawers.jpg" alt="Description of image" className="object-cover w-full h-full" />
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="w-3/5 p-6 flex text-start flex-col justify-between rounded-r-xl">
                        <div>
                            <h2 className="text-lg font-bold mb-4 leading-tight" style={{ color: '#48556A', fontFamily: 'Manrope, sans-serif' }}>
                                Shift the overall look and feel by adding these wonderful touches to furniture in your home
                            </h2>

                            <p className="text-sm mb-6" style={{ color: '#6E8098', fontFamily: 'Manrope, sans-serif', lineHeight: '1.6', fontWeight: '500' }}>
                                Ever been in a room and felt like something was missing? Perhaps it felt slightly bare and uniniviting. I've got some simple tips to help you make any room feel complete.
                            </p>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                                <img src="src/assets/avatar-michelle.jpg" alt="Michelle Appleton" className="w-full h-full rounded-full" />
                            </div>
                            <div>
                                <div className="text-xs font-bold" style={{ color: '#48556A', fontFamily: 'Manrope, sans-serif' }}>
                                    Michelle Appleton
                                </div>
                                <div className="text-xs" style={{ color: '#9DAEC2', fontFamily: 'Manrope, sans-serif' }}>
                                    28 Jun 2020
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden">
                    {/* Image Section */}
                    <div className="w-full h-48 bg-gradient-to-br from-slate-100 to-slate-200 rounded-t-xl flex items-center justify-center">
                        <img src="src/assets/drawers.jpg" alt="Description of image" className="object-cover w-full h-full" />
                    </div>

                    {/* Content Section */}
                    <div className="p-6 text-start rounded-b-xl">
                        <h2 className="text-lg font-bold mb-4 leading-tight" style={{ color: '#48556A', fontFamily: 'Manrope, sans-serif' }}>
                            Shift the overall look and feel by adding these wonderful touches to furniture in your home
                        </h2>

                        <p className="text-sm mb-6" style={{ color: '#6E8098', fontFamily: 'Manrope, sans-serif', lineHeight: '1.6', fontWeight: '500' }}>
                            Ever been in a room and felt like something was missing? Perhaps it felt slightly bare and uniniviting. I've got some simple tips to help you make any room feel complete.
                        </p>

                        <div className="flex items-center justify-start space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                                <img src="src/assets/avatar-michelle.jpg" alt="Michelle Appleton" className="w-full h-full rounded-full" />

                            </div>
                            <div>
                                <div className="text-xs font-bold" style={{ color: '#48556A', fontFamily: 'Manrope, sans-serif' }}>
                                    Michelle Appleton
                                </div>
                                <div className="text-xs" style={{ color: '#9DAEC2', fontFamily: 'Manrope, sans-serif' }}>
                                    28 Jun 2020
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Share Button - Bottom Right */}
                <div className="absolute bottom-6 right-6">
                    <div
                        onClick={toggleSharePopover}
                        className="w-8 h-8 mr-4 rounded-full transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
                        style={{
                            backgroundColor: "#ECF2F8",
                            cursor: 'pointer',
                        }}
                    >
                        <img src={iconShare} alt="Close" className="w-4 h-4" />

                    </div>

                    {/* Desktop Popover - Above Right */}
                    {isSharePopoverVisible && (
                        <div className="hidden md:block absolute bottom-12 min-w-42 right-0 z-20 ">
                            <div
                                className="px-4 py-3 rounded-lg shadow-xl  flex items-center space-x-2 animate-in fade-in duration-200"
                                style={{ backgroundColor: '#48556A' }}
                            >
                                {/* Arrow pointing down */}
                                <div
                                    className="absolute -bottom-2 right-4 w-0 h-0"
                                    style={{
                                        borderLeft: '8px solid transparent',
                                        borderRight: '8px solid transparent',
                                        borderTop: '8px solid #48556A'
                                    }}
                                ></div>

                                <span
                                    className="font-bold"
                                    style={{
                                        fontSize: '11px',
                                        letterSpacing: '4px',
                                        color: '#ffffff',
                                        fontFamily: 'Manrope, sans-serif'
                                    }}
                                >
                                    SHARE
                                </span>
                                <div className="flex space-x-2 ml-2">
                                    <img src="src/assets/icon-facebook.svg" alt="Facebook" className="w-4 h-4 text-white hover:text-blue-300 cursor-pointer transition-colors" />
                                    <img src="src/assets/icon-twitter.svg" alt="Twitter" className="w-4 h-4 text-white hover:text-blue-300 cursor-pointer transition-colors" />
                                    <img src="src/assets/icon-pinterest.svg" alt="Pinterest" className="w-4 h-4 text-white hover:text-red-500 cursor-pointer transition-colors" />
                                    {/* <Facebook className="w-4 h-4 text-white hover:text-blue-300 cursor-pointer transition-colors" />
                                    <Twitter className="w-4 h-4 text-white hover:text-blue-300 cursor-pointer transition-colors" />
                                    <div className="w-4 h-4 bg-red-500 rounded-sm flex items-center justify-center text-xs font-bold cursor-pointer hover:bg-red-400 text-white transition-colors">
                                        P
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Mobile Share Popover - Bottom */}
                {isSharePopoverVisible && (
                    <div className="md:hidden absolute bottom-0 left-0 right-0 z-20">
                        <div
                            className="px-6 py-4 flex items-center justify-between rounded-b-xl animate-in slide-in-from-bottom duration-200"
                            style={{ backgroundColor: '#48556A' }}
                        >
                            <span
                                className="font-bold"
                                style={{
                                    fontSize: '12px',
                                    letterSpacing: '2px',
                                    color: '#ffffff',
                                    fontFamily: 'Manrope, sans-serif'
                                }}
                            >
                                SHARE
                            </span>
                            <div className="flex space-x-3">
                                <img src="src/assets/icon-facebook.svg" alt="Facebook" className="w-4 h-4 text-white hover:text-blue-300 cursor-pointer transition-colors" />
                                <img src="src/assets/icon-twitter.svg" alt="Twitter" className="w-4 h-4 text-white hover:text-blue-300 cursor-pointer transition-colors" />
                                <img src="src/assets/icon-pinterest.svg" alt="Pinterest" className="w-4 h-4 text-white hover:text-red-500 cursor-pointer transition-colors" />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Click outside to close popover */}
            {isSharePopoverVisible && (
                <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsSharePopoverVisible(false)}
                />
            )}
        </div>
    );
};

export default ResponsiveArticleCard;