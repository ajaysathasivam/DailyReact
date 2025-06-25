import React, { useEffect } from "react";
import iconShare from "../assets/icon-share.svg";

import { useState } from "react";

export const ProfileCard = ({ onShare, profileImg, children,setShowShare }) => {


    return (
        <>
            <div className="flex items-center gap-4  w-full">
                <img
                    src={profileImg || "https://randomuser.me/api/portraits/women/44.jpg"}
                    alt="Michelle Appleton"
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex flex-col">{children}</div>

                {/* Share Button */}
                <div
                    onClick={() => setShowShare((prev) => !prev)}
                    className="ml-auto flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 cursor-pointer hover:bg-gray-300 transition-colors md:relative"
                    aria-label="Share"
                    type="button"
                >
                    <img src={iconShare} alt="Share" className="w-5 h-5" />
                </div>

            </div>
            {/* Conditional Rendering based on screen size */}
           
        </>
    );
}

const ArticalPreview = ({ imageSrc, altText, children }) => {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-start">
            <div className="md:flex-1 md:mr-6">
                <img
                    src={imageSrc}
                    alt={altText}
                    className="w-full h-auto rounded-lg"
                />
            </div>
            <div className="md:flex-1">
                {children}
            </div>
        </div>
    );
};

export default ArticalPreview;
