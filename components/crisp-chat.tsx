"use client";

import { useEffect } from "react";

import {Crisp} from "crisp-sdk-web";

export const CrispChat = () =>{
    useEffect(() => {
        Crisp.configure("37188343-0a5f-4f6f-95c3-40281d1542e2");
    },[])

    return null;
}